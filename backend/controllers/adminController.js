import User from "../models/User.model.js";
import RawMaterial from "../models/RawMaterial.model.js";


const getDashboardData = async (req, res) => {
  try {
    // 1️⃣ Aggregate user stats
    const totalUsers = await User.countDocuments();
    const totalFarmers = await User.countDocuments({ role: "farmer" });
    const totalManufacturers = await User.countDocuments({ role: "manufacturer" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    const verifiedUsers = await User.countDocuments({ verified: true });
    const pendingUsers = await User.countDocuments({ verified: false });

    // 2️⃣ Aggregate raw material stats
    const totalRawMaterials = await RawMaterial.countDocuments();
    const availableMaterials = await RawMaterial.countDocuments({ status: "available" });
    const consumedMaterials = await RawMaterial.countDocuments({ status: "consumed" });
    const expiredMaterials = await RawMaterial.countDocuments({ status: "expired" });

    // 3️⃣ Optional: latest raw materials (for dashboard preview)
    const latestMaterials = await RawMaterial.find()
      .populate("farmer", "name email")
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name batchCode qualityGrade status pricePerUnit");

    // 4️⃣ Return dashboard summary
    res.status(200).json({
      success: true,
      message: "✅ Admin dashboard data fetched successfully",
      stats: {
        users: {
          total: totalUsers,
          verified: verifiedUsers,
          pending: pendingUsers,
          farmers: totalFarmers,
          manufacturers: totalManufacturers,
          admins: totalAdmins,
        },
        materials: {
          total: totalRawMaterials,
          available: availableMaterials,
          consumed: consumedMaterials,
          expired: expiredMaterials,
        },
        latestMaterials,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching admin dashboard data:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching admin dashboard data",
      error: error.message,
    });
  }
};


const getAnalytics = async (req, res) => {
  try {
    // 1️⃣ Users Growth by Month (last 6 months)
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalUsers: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    // 2️⃣ Raw Materials Added by Month
    const materialGrowth = await RawMaterial.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalMaterials: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    // 3️⃣ Quality Grade Distribution
    const qualityDistribution = await RawMaterial.aggregate([
      {
        $group: {
          _id: "$qualityGrade",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // 4️⃣ Material Status Distribution
    const statusDistribution = await RawMaterial.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // 5️⃣ Role Distribution
    const roleDistribution = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Format months (1 → Jan, 2 → Feb, etc.)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedUserGrowth = userGrowth.map((u) => ({
      month: monthNames[u._id - 1],
      totalUsers: u.totalUsers,
    }));

    const formattedMaterialGrowth = materialGrowth.map((m) => ({
      month: monthNames[m._id - 1],
      totalMaterials: m.totalMaterials,
    }));

    // ✅ Response
    res.status(200).json({
      success: true,
      message: "✅ Admin analytics data fetched successfully",
      analytics: {
        userGrowth: formattedUserGrowth,
        materialGrowth: formattedMaterialGrowth,
        qualityDistribution,
        statusDistribution,
        roleDistribution,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching admin analytics:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching analytics data",
      error: error.message,
    });
  }
};


const verifyProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { verifiedStatus, remarks } = req.body;

    // 1️⃣ Validate product ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    // 2️⃣ Find product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // 3️⃣ Check if already verified
    if (product.verificationStatus === "approved" && verifiedStatus === "approved") {
      return res.status(400).json({ message: "Product is already verified and approved." });
    }

    // 4️⃣ Update verification details
    product.verificationStatus = verifiedStatus; // 'approved' or 'rejected'
    product.verifiedBy = req.user._id;
    product.verifiedAt = new Date();
    if (remarks) product.verificationRemarks = remarks;

    await product.save();

    // 5️⃣ Respond success
    res.status(200).json({
      success: true,
      message:
        verifiedStatus === "approved"
          ? `✅ Product "${product.name}" has been approved by admin.`
          : `❌ Product "${product.name}" has been rejected.`,
      product,
    });
  } catch (error) {
    console.error("❌ Error verifying product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while verifying product.",
      error: error.message,
    });
  }
};


export {getDashboardData, getAnalytics ,verifyProduct }