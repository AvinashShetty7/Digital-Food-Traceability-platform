import User from "../models/User.model.js";

export const uploadKYC = async (req, res) => {
  try {
    // const userId = req.userId; // must come from auth middleware
    const  userId = "6918a41f15564d1941c098b5";

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    const docsToAdd = [];

    if (req.files.aadhar) {
      docsToAdd.push({
        documentType: "Aadhar Card",
        documentUrl: req.files.aadhar[0].path,
      });
    }

    if (req.files.kisanCard) {
      docsToAdd.push({
        documentType: "Kisan Card",
        documentUrl: req.files.kisanCard[0].path,
      });
    }

    if (req.files.landRecord) {
      docsToAdd.push({
        documentType: "Land Record",
        documentUrl: req.files.landRecord[0].path,
      });
    }

    if (req.files.selfie) {
      docsToAdd.push({
        documentType: "Selfie",
        documentUrl: req.files.selfie[0].path,
      });
    }

    // Add all documents to the user's document array
    user.documents.push(...docsToAdd);

    await user.save();

    res.json({
      success: true,
      message: "KYC documents uploaded successfully!",
      uploadedDocuments: docsToAdd,
      allDocuments: user.documents,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
