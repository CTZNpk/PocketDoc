const { default: axios } = require("axios");
const textSummaryModel = require("../models/summaryModel");
const chapterModel = require("../models/chapterModel");
const documentModel = require("../models/documentModel");
const qs = require("qs");

exports.generateSummaryFromText = async (req, res) => {
  const { passage } = req.body;
  try {
    const fastApiResponse = await axios.post(
      "http://localhost:8000/summarize/",
      {
        passage: passage,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const summary = fastApiResponse.data.summary;
    const newTextSummary = new textSummaryModel({
      passage: passage,
      modelUsed: fastApiResponse.data.model_used,
      summary: summary,
    });
    await newTextSummary.save();
    res.status(200).json({ summary: summary });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error summarizing passage: ${error.message}` });
  }
};

exports.summarizeDocumentPages = async (req, res) => {
  console.log("WE ARE HERHERHHER");
  const { document_id, start_page, end_page } = req.body;
  console.log(document_id);
  console.log(start_page);
  console.log(end_page);

  try {
    const document = await documentModel.findById(document_id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    const formData = qs.stringify({
      file_path: document.file,
      start_page: start_page,
      end_page: end_page,
    });

    const fastApiResponse = await axios.post(
      "http://localhost:8000/summarize-doc/",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const newSummary = new textSummaryModel({
      summary: fastApiResponse.data.summary,
      modelUsed: "gemini",
      path: fastApiResponse.data.pdf_path,
    });
    await newSummary.save();

    return res.status(200).json({ data: newSummary });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error summarizing document: ${error.message}` });
  }
};

exports.summarizeChapters = async (req, res) => {
  const { id } = req.params;

  try {
    const chapter = await chapterModel.findById(id);
    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    if (chapter.isProcessed) {
      const summary = await textSummaryModel.findById(chapter.summaryId);
      return res.status(200).json({ data: summary });
    }
    const document = await documentModel.findById(chapter.docId);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    const formData = qs.stringify({
      file_path: document.file,
      start_page: chapter.startPageNum,
      end_page: chapter.endPageNum,
    });

    const fastApiResponse = await axios.post(
      "http://localhost:8000/summarize-doc/",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const newSummary = new textSummaryModel({
      summary: fastApiResponse.data.summary,
      modelUsed: "gemini",
      path: fastApiResponse.data.pdf_path,
    });
    await newSummary.save();

    chapter.isProcessed = true;
    chapter.summaryId = newSummary._id;
    await chapter.save();

    return res.status(200).json({ data: newSummary });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error summarizing document: ${error.message}` });
  }
};

exports.queryBasedSummary = async (req, res) => {
  const { id } = req.params;
  const { query } = req.body;
  try {
    const doc = await documentModel.findById(id);
    if (!doc) {
      res.status(404).json({ error: "Document Not Found" });
    }
    const querySummary = generateQuerySummary(doc.content, query);

    const newSummary = new summaryModel({
      documentId: id,
      content: querySummary,
      queryBased: true,
    });
    await newSummary.save();
    res.status(201).json({
      message: "Query-based summary created successfully",
      summary: newSummary,
    });
  } catch (error) {}
};
