import RawMaterial from "../models/RawMaterial.model.js";
import User from "../models/User.model.js";

const addRawMaterial = async (req, res) => {
  try {
    const {
      name,
      quantity,
      unit,
      location,
      harvestDate,
      expiryDate,
      pricePerUnit,
      qualityGrade,
    } = req.body;

    if (!name || !quantity || !unit || !pricePerUnit) {
      return res.status(400).json({
        message:
          "All required fields (name, quantity, unit, price, image) must be provided.",
      });
    }

    const farmerId = req.user?._id;
    const farmer = await User.findById(farmerId);

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found." });
    }

    if (farmer.role !== "farmer") {
      return res
        .status(403)
        .json({ message: "Only farmers can add raw materials." });
    }

    const newMaterial = new RawMaterial({
      name,
      quantity,
      unit,
      location,
      harvestDate,
      expiryDate,
      pricePerUnit,
      qualityGrade: qualityGrade || "A",
      //   farmer: farmerId,
    });

    await newMaterial.save();

    res.status(201).json({
      success: true,
      message: "✅ Raw material added successfully!",
      rawMaterial: newMaterial,
    });
  } catch (error) {
    console.error("❌ Error adding raw material:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding raw material",
      error: error.message,
    });
  }
};

const getRawMaterialsByFarmer = async (req, res) => {
  try {
    const farmerId = req.user?._id;

    const materials = await RawMaterial.find({ farmer: farmerId }).sort({
      createdAt: -1,
    });

    if (materials.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No raw materials added yet.",
        materials: [],
      });
    }

    res.status(200).json({
      success: true,
      count: materials.length,
      materials,
    });
  } catch (error) {
    console.error("❌ Error fetching farmer materials:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching farmer materials",
      error: error.message,
    });
  }
};

const getAllRawMaterials = async (req, res) => {
  try {
    const materials = await RawMaterial.find()
      .populate("farmer", "name email phone") // get farmer details
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      count: materials.length,
      materials,
    });
  } catch (error) {
    console.error("❌ Error fetching raw materials:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching raw materials",
      error: error.message,
    });
  }
};

const getSingleRawMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json({ message: "Invalid raw material ID format" });
    }

    const material = await RawMaterial.findById(id).populate(
      "farmer",
      "name email phone role"
    );

    if (!material) {
      return res.status(404).json({ message: "Raw material not found" });
    }

    if (
      req.user.role === "farmer" &&
      material.farmer._id.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to view this material" });
    }

    res.status(200).json({
      success: true,
      rawMaterial: material,
    });
  } catch (error) {
    console.error("❌ Error fetching single raw material:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching raw material details",
      error: error.message,
    });
  }
};


const updateRawMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid raw material ID format" });
    }

    const material = await RawMaterial.findById(id);
    if (!material) {
      return res.status(404).json({ message: "Raw material not found" });
    }

    const isOwnerFarmer =
      req.user?.role === "farmer" &&
      material.farmer.toString() === req.user._id.toString();
    const isAdmin = req.user?.role === "admin";

    if (!isOwnerFarmer && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to update this material" });
    }

    const allowed = [
      "name",
      "quantity",
      "unit", // "kg" | "litre" | "ton" | "pcs"
      "location",
      "harvestDate",
      "expiryDate",
      "imageUrl",
      "qualityGrade", // "A" | "B" | "C" | "Rejected"
      "pricePerUnit",
      "status", // "available" | "consumed" | "expired"
    ];

    const blocked = ["_id", "id", "batchCode", "farmer", "createdAt"];

    for (const key of blocked) {
      if (key in req.body) delete req.body[key];
    }

    const update = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined && req.body[key] !== null) {
        update[key] = req.body[key];
      }
    }

    const unitEnum = ["kg", "litre", "ton", "pcs"];
    const gradeEnum = ["A", "B", "C", "Rejected"];
    const statusEnum = ["available", "consumed", "expired"];

    if (update.unit && !unitEnum.includes(update.unit)) {
      return res.status(400).json({ message: "Invalid unit value" });
    }
    if (update.qualityGrade && !gradeEnum.includes(update.qualityGrade)) {
      return res.status(400).json({ message: "Invalid qualityGrade value" });
    }
    if (update.status && !statusEnum.includes(update.status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    if (!isAdmin && update.qualityGrade === "Rejected") {
      return res
        .status(403)
        .json({ message: "Only admin can mark as Rejected" });
    }

    Object.assign(material, update);
    material.lastUpdated = new Date();

    const saved = await material.save();

    res.status(200).json({
      success: true,
      message: "✅ Raw material updated successfully",
      rawMaterial: saved,
    });
  } catch (error) {
    console.error("❌ Error updating raw material:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating raw material",
      error: error.message,
    });
  }
};

const deleteRawMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Validate ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid raw material ID format" });
    }

    // 2️⃣ Find material
    const material = await RawMaterial.findById(id);
    if (!material) {
      return res.status(404).json({ message: "Raw material not found" });
    }

    // 3️⃣ Authorization check
    const isOwnerFarmer =
      req.user?.role === "farmer" &&
      material.farmer.toString() === req.user._id.toString();
    const isAdmin = req.user?.role === "admin";

    if (!isOwnerFarmer && !isAdmin) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this material." });
    }

    // 4️⃣ Delete material
    await RawMaterial.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "✅ Raw material deleted successfully.",
      deletedId: id,
    });
  } catch (error) {
    console.error("❌ Error deleting raw material:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting raw material.",
      error: error.message,
    });
  }
};

const markAsConsumed = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid raw material ID format" });
    }

    const material = await RawMaterial.findById(id);
    if (!material) {
      return res.status(404).json({ message: "Raw material not found" });
    }

    if (material.status === "consumed") {
      return res.status(400).json({ message: "This material is already marked as consumed." });
    }

    if (material.status === "expired") {
      return res.status(400).json({ message: "Cannot consume expired material." });
    }

    const allowedRoles = ["manufacturer", "admin"];
    if (!allowedRoles.includes(req.user?.role)) {
      return res.status(403).json({ message: "Only manufacturers or admins can mark materials as consumed." });
    }

    material.status = "consumed";
    material.lastUpdated = new Date();

    await material.save();

    res.status(200).json({
      success: true,
      message: `✅ Raw material "${material.name}" marked as consumed.`,
      rawMaterial: material,
    });
  } catch (error) {
    console.error("❌ Error marking material as consumed:", error);
    res.status(500).json({
      success: false,
      message: "Server error while marking material as consumed",
      error: error.message,
    });
  }
};


export {
  addRawMaterial,
  getRawMaterialsByFarmer,
  getAllRawMaterials,
  getSingleRawMaterial,
  updateRawMaterial,
  deleteRawMaterial,
  markAsConsumed,
};
