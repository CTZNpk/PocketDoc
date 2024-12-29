const documentModel = require("../models/documentModel");
const userModel = require("../models/userModel");

exports.uploadDocumentController = async (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;
  const file = req.file;
  try {
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const user = await userModel.findById({ _id: userId });
    if (user) {
      const doc = new documentModel({
        file: file.path,
        title: title,
        userId: userId,
      });
      const saveDoc = await doc.save();
      res
        .status(200)
        .json({ message: "Document uploaded successfully", data: saveDoc });
    } else {
      res.status(404).json({ error: "USER NOT FOUND" });
    }


  } catch (error) {
    res.status(500).json({ error: `Error in upload-doc-Controller ${error.message}` });
  }
};
exports.getAllDocuments = async (req, res) => {
  const uploadedByUserId = req.user.id;
  console.log(req.user);
  try {
    const user = await userModel.findById(uploadedByUserId);
    if (user) {
      const docs = await documentModel.find({ uploadedByUserId: uploadedByUserId }).populate('uploadedByUserId');
      res.status(200).json({ data: docs });
      if (docs.length == 0) {
        res.status(404).json({ error: "No Documents found for this user" })
      }
    }
    else {
      res.status(404).json({ error: "User Not Found" })
    }
  } catch (error) {

    res.status(500).json({ error: `Error in Get-ALL-Docs-Controller ${error}` })
  }
}


