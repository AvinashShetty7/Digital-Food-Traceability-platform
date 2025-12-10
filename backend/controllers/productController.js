import Product from "../models/Product.model.js";
import RawMaterial from "../models/RawMaterial.model.js";
import mongoose from "mongoose";
import User from "../models/User.model.js";
import dotenv from "dotenv";
dotenv.config();


import QRCode from "qrcode";

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      batchNumber,
      manufacturingLocation,
      rawMaterials,
      quantity,
      unit,
      expiryDate,
      productionDate,
    } = req.body;

    

    // 1Basic validation
    if (!name || !rawMaterials || !quantity || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Name, raw materials, quantity, and image are required.",
      });
    }

    // Parse raw materials
    const parsedMaterials =
      typeof rawMaterials === "string"
        ? JSON.parse(rawMaterials)
        : rawMaterials;
    console.log(parsedMaterials, "xxxxxxxxxxxx");

    if (!Array.isArray(parsedMaterials) || parsedMaterials.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one raw material is required.",
      });
    }

    //  Validate manufacturer (from token)
    const manufacturer = await User.findById(req.user._id).select(
      "name email phone role"
    );

    if (!manufacturer) {
      return res.status(400).json({
        success: false,
        message: "Invalid Manufacturer",
      });
    }

    // Fetch & validate raw materials
    const validMaterials = await RawMaterial.find({
      _id: { $in: parsedMaterials },
      manufacturer:req.user._id, // must belong to manufacturer
      status: "sold", // manufacturer reserved these raws
      expiryDate: { $gte: new Date() }, // not expired
    }).populate("farmer", "name phone");

    console.log(validMaterials);

    if (validMaterials.length !== parsedMaterials.length) {
      return res.status(400).json({
        success: false,
        message:
          "Some raw materials are invalid, expired, or not reserved for this manufacturer.",
      });
    }

    // Build consumedRawDetails snapshot
    const consumedRawDetails = validMaterials.map((rm) => ({
      rawMaterialId: rm._id,
      batchCode: rm.batchCode,
      name: rm.name,
      quantityUsed: rm.quantity, // manufacturer used full raw quantity
      unit: rm.unit,
      harvestDate: rm.harvestDate,
      farmer: {
        farmerId: rm.farmer._id,
        name: rm.farmer.name,
        phone: rm.farmer.phone,
      },
    }));
    
    
    
    // 5Create product
    const newProduct = new Product({
      name,
      description,
      category,
      batchNumber,
      manufacturingLocation,
      manufacturer: req.user._id,
      rawMaterials: parsedMaterials,
      consumedRawDetails,
      quantity,
      unit,
      imageUrl: req.file.path,
      productionDate,
      expiryDate,
      status: "created",
    });
    
    console.log(newProduct);
    
    await newProduct.save();

    // Create QR payload
    const qrPayload = {
      traceUrl: `${process.env.FRONTEND_URL}/traceproduct/${newProduct._id}`,
    };

    // Generate QR Image (Base64)
  
    const qrImage = await QRCode.toDataURL(qrPayload.traceUrl);



    newProduct.qrCode = qrImage;
    newProduct.qrTracePayload = qrPayload;

    await newProduct.save();

    //  Mark raw materials as consumed
    await RawMaterial.updateMany(
      { _id: { $in: parsedMaterials } },
      { $set: { status: "consumed" } }
    );

    res.status(201).json({
      success: true,
      message: "Product created successfully with QR Code",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating product",
      error: error.message,
    });
  }
};


const getMyProducts = async (req, res) => {
  try {
    const id = req.user._id;

    const products = await Product.find({ manufacturer: id });

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching manufacturer products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const getAllProducts = async (req, res) => {
  
  try {
    let products;

    // 1️⃣ If Admin → fetch all products
    if (req.user.role === "admin") {
      products = await Product.find()
        .populate("manufacturer", "name email role") // who made it
        .populate("rawMaterials", "name batchCode qualityGrade status") // used materials
        .sort({ createdAt: -1 });
    }
    // 2️⃣ If Manufacturer → fetch only their products
    else if (req.user.role === "manufacturer") {
      products = await Product.find({ manufacturer: req.user._id })
        .populate("rawMaterials", "name batchCode qualityGrade status")
        .sort({ createdAt: -1 });
    }

    // 3️⃣ If no products
    if (!products || products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No products found.",
        products: [],
      });
    }

    // 4️⃣ Respond
    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("❌ Error fetching all products:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products.",
      error: error.message,
    });
  }
};


const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id)
      .populate("manufacturer", "name email phone")
      .populate({
        path: "rawMaterials",
        populate: {
          path: "farmer",
          select: "name phone email",
        },
      });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching single product:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching product",
    });
  }
};

const updateProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;

    // Validate product ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    // Validate new status
    const validStatuses = [
      "created",
      "in_production",
      "packaged",
      "shipped",
      "delivered",
    ];
    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    // ind product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Ensure the manufacturer owns this product
    if (product.manufacturer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this product.",
      });
    }

    // Prevent invalid backward transitions (optional)
    const statusOrder = {
      created: 1,
      in_production: 2,
      packaged: 3,
      shipped: 4,
      delivered: 5,
    };

    if (statusOrder[newStatus] < statusOrder[product.status]) {
      return res.status(400).json({
        message: `You cannot move product backward (from ${product.status} to ${newStatus}).`,
      });
    }

    // date status and add trace history
    product.status = newStatus;
    product.traceHistory.push({
      status: newStatus,
      updatedBy: req.user._id,
      timestamp: new Date(),
    });

    await product.save();

    //  Return success
    res.status(200).json({
      success: true,
      message: `✅ Product status updated to "${newStatus}".`,
      product,
    });
  } catch (error) {
    console.error("❌ Error updating product status:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating product status.",
      error: error.message,
    });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate product ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    //Find product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // heck authorization
    if (
      req.user.role === "manufacturer" &&
      product.manufacturer.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this product." });
    }

    // ptional cleanup — set related raw materials back to "available"
    if (product.rawMaterials && product.rawMaterials.length > 0) {
      await RawMaterial.updateMany(
        { _id: { $in: product.rawMaterials } },
        { $set: { status: "available" } }
      );
    }

    // Delete the product
    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `✅ Product "${product.name}" deleted successfully.`,
    });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting product.",
      error: error.message,
    });
  }
};



export {
  createProduct,
  getMyProducts,
  getAllProducts,
  getSingleProduct,
  updateProductStatus,
  deleteProduct,
  // getProductTrace,
};
