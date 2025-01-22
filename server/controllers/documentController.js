const { default: axios } = require("axios");
const documentModel = require("../models/documentModel");
const chapterModel = require("../models/chapterModel")
const userModel = require("../models/userModel");
const fs = require("fs")
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
    res.status(500).json({ error: `Error in upload-doc-Controller ${error.message}` });
  }
};

exports.getDocumentsByUserId = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await userModel.findById(userId);
    if (user) {
      const docs = await documentModel.find({ userId: userId });
      res.status(200).json({ docs });
    }
    else {
      res.status(404).json({ error: "User Not Found" })
    }
  } catch (error) {
    res.status(500).json({ error: `Error in Get-ALL-Docs-Controller ${error}` })
  }
}

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
    res.status(500).json({ error: `Error in Get-File-By-DocumentId-Controller: ${error.message}` });
  }
}

exports.getChaptersFromADocument = async (req, res) => {
  const { documentId } = req.params;
  try {
    const doc = await documentModel.findById(documentId);
    if (!doc) {
      return res.status(404).json({ error: "Document Not Found" });
    }

    if (doc.hasChaptersGenerated) {
      const chapters = await chapterModel.find({ docId: documentId });
      return res.status(200).json({ chapters });
    }

    const fastApiResponse = await axios.post('http://localhost:8000/extract-toc/',
      {},
      {
        params: { filePath: doc.file },
        headers: {
          'Content-Type': 'application/json',
        },
      });
    const toc = fastApiResponse.data.TOC;
    const totalPageCount = fastApiResponse.data.totalPages;

    toc.sort((a, b) => a.Level - b.Level);

    const chapters = [];
    for (let i = 0; i < toc.length; i++) {
      const currentChapter = toc[i];
      const nextChapter = toc[i + 1];

      const startPageNum = currentChapter.Page;
      const endPageNum = nextChapter
        ? nextChapter.Level === currentChapter.Level
          ? nextChapter.Page - 1
          : totalPageCount
        : totalPageCount;

      const newChapter = new chapterModel({
        title: currentChapter.Title,
        docId: documentId,
        level: currentChapter.Level,
        startPageNum,
        endPageNum,
      });

      const savedChapter = await newChapter.save();
      chapters.push({
        chapterId: savedChapter._id,
        title: savedChapter.title,
        level: savedChapter.level,
        startPageNum: savedChapter.startPageNum,
        endPageNum: savedChapter.endPageNum,
      });
    }
    doc.hasChaptersGenerated = true;
    await doc.save();
    res.status(200).json({ chapters });
  } catch (error) {
    res.status(500).json({ error: `Error in Get-ALL-Docs-Controller ${error}` })
  }
}

