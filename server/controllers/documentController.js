const documentModel = require("../models/documentModel");
const userModel = require("../models/userModel");
const fs = require("fs");
const path = require("path");

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
    res
      .status(500)
      .json({ error: `Error in upload-doc-Controller ${error.message}` });
  }
};

exports.getDocumentsByUserId = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await userModel.findById(userId);
    if (user) {
      const docs = await documentModel.find({ userId: userId });
      res.status(200).json({ docs });
    } else {
      res.status(404).json({ error: "User Not Found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error in Get-ALL-Docs-Controller ${error}` });
  }
};

exports.getDocument = async (req, res) => {
  const { documentId } = req.params;

  try {
    const document = await documentModel.findById(documentId);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    const filePath = document.file;

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found on server" });
    }

    res.sendFile(path.resolve(filePath));
  } catch (error) {
    res.status(500).json({
      error: `Error in Get-File-By-DocumentId-Controller: ${error.message}`,
    });
  }
};
