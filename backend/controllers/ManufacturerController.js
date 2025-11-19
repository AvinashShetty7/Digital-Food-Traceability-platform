import User from "../models/User.model.js";
// import RawMaterialModel from "../models/RawMaterial.model.js";

export const uploadManufacturerKYC = async (req, res) => {
  try {
    // const userId = req.userId; // must come from auth middleware
    const userId = "691a0664cee641dce9ba2a2e";

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    const docsToAdd = [];

    if (req.files.aadhar) {
      docsToAdd.push({
        documentType: "Aadhar Card",
        documentUrl: req.files.aadhar[0].path,
      });
    }

    if (req.files.GSTCertificateCard) {
      docsToAdd.push({
        documentType: "GST CertificateCard",
        documentUrl: req.files.GSTCertificateCard[0].path,
      });
    }

    if (req.files.FactoryAddressProofRecord) {
      docsToAdd.push({
        documentType: "FactoryAddressProof Record",
        documentUrl: req.files.FactoryAddressProofRecord[0].path,
      });
    }

    if (req.files.FactoryPhoto) {
      docsToAdd.push({
        documentType: "Factory Photo",
        documentUrl: req.files.FactoryPhoto[0].path,
      });
    }

    if (req.files.FSSAILicense) {
      docsToAdd.push({
        documentType: "FSSAI License",
        documentUrl: req.files.FSSAILicense[0].path,
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