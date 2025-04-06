const { default: axios } = require("axios");
const textSummaryModel = require("../models/textSummaryModel");

const DocSummary = require("../models/summaryModel");
const qs = require("qs");

const FormData = require("form-data");
const documentModel = require("../models/documentModel");

exports.generateSummaryFromText = async (req, res) => {
  const { passage, documentType, summaryLength, formatPreference, focus } =
    req.body;
  const form = new FormData();
  form.append("passage", passage);
  form.append("document_type", documentType);
  form.append("summary_length", summaryLength);
  form.append("format_preference", formatPreference);
  form.append("focus", focus);
  try {
    const fastApiResponse = await axios.post(
      "http://localhost:8000/summarize/",
      form,
      { headers: form.getHeaders() },
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

exports.queryBasedSummary = async (req, res) => {
  const { documentId, query, startPage, endPage } = req.body;
  try {
    const doc = await documentModel.findById(documentId);

    if (!doc) {
      res.status(404).json({ error: "Document Not Found" });
    }

    const form = new FormData();
    form.append("document_id", documentId);
    form.append("query", query);
    form.append("start_page", startPage);
    form.append("end_page", endPage);
    const querySummary = await axios.post(
      "http://localhost:8000/search/",
      form,
    );
    console.log(querySummary.data);
    res.status(200).json({
      message: "Query-based summary created successfully",
      summary: querySummary.data,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: `Internal Server Error`,
    });
  }
};

exports.summarizeDocument = async (req, res) => {
  try {
    const {
      documentId,
      startPage = 1,
      endPage = 1,
      documentType = "general",
      summaryLength = 40,
      formatPreference = "paragraph",
      focus = "main ideas",
    } = req.body;

    const document = await documentModel.findById(documentId);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    const filePath = document.file;

    if (!documentId || !filePath) {
      return res.status(400).json({
        status: "error",
        error: "document_id and file_path are required",
      });
    }

    const form = new FormData();
    form.append("document_id", documentId);
    form.append("file_path", filePath);
    form.append("start_page", startPage.toString());
    form.append("end_page", endPage.toString());
    form.append("document_type", documentType);
    form.append("summary_length", summaryLength.toString());
    form.append("format_preference", formatPreference);
    form.append("focus", focus);

    const fastApiResponse = await axios.post(
      "http://localhost:8000/summarize-doc/",
      form,
      {
        headers: {
          ...form.getHeaders(),
          Accept: "application/json",
        },
      },
    );

    if (!fastApiResponse.data?.summary) {
      throw new Error("Invalid response from summarization service");
    }

    const summaryDoc = new DocSummary({
      document: documentId,
      filePath: filePath,
      startPage: parseInt(startPage),
      endPage: parseInt(endPage),
      summary: fastApiResponse.data.summary,
      metadata: {
        documentType: documentType,
        summaryLength: parseInt(summaryLength),
        formatPreference: formatPreference,
        focusArea: focus,
        generatedAt: new Date(),
      },
    });

    await summaryDoc.save();

    return res.status(201).json({
      status: "success",
      data: {
        summaryId: summaryDoc._id,
        document: summaryDoc.document,
        summary: fastApiResponse.data.summary,
        metadata: summaryDoc.metadata,
      },
    });
  } catch (error) {
    console.error("Summary processing error:", {
      error: error.message,
      stack: error.stack,
      requestBody: req.body,
      apiResponse: error.response?.data,
    });

    return res.status(error.response?.status || 500).json({
      status: "error",
      error: "Failed to process summary",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.fetchUserSummaryHistories = async (req, res) => {
  const userId = req.user._id;

  try {
    // Fetch all summaries from the textSummaryModel for the specific user
    const textSummaries = await textSummaryModel
      .find({ userId })
      .sort({ createdAt: -1 });

    // Fetch all summaries from DocSummary for the specific user
    const docSummaries = await DocSummary.find({ userId }).sort({
      createdAt: -1,
    });

    // Combine the summaries into a single array
    const allSummaries = [
      ...textSummaries.map((summary) => ({
        summaryId: summary._id,
        documentId: summary.documentId, // Adjust if the field is different
        summary: summary.summary,
        modelUsed: summary.modelUsed,
        createdAt: summary.createdAt,
        type: "text", // You can add a type to differentiate between summary sources
      })),
      ...docSummaries.map((summary) => ({
        summaryId: summary._id,
        document: summary.document, // Adjust if the field is different
        summary: summary.summary,
        modelUsed: summary.modelUsed,
        createdAt: summary.createdAt,
        type: "doc", // Different type for DocSummary
      })),
    ];

    // Sort the summaries by createdAt (if not already sorted)
    allSummaries.sort((a, b) => b.createdAt - a.createdAt);

    return res.status(200).json({
      status: "success",
      data: allSummaries,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: `Failed to fetch summary histories: ${error.message}`,
    });
  }
};

exports.getSummaryById = async (req, res) => {
  const { summaryId } = req.params;
  console.log("HAHHAHAHHA");
  console.log(summaryId);

  try {
    const summary = await DocSummary.findById(summaryId).populate({
      path: "document",
      select: "title",
    });

    if (!summary) {
      return res.status(404).json({ message: "Summary not found" });
    }

    res.json(summary);
  } catch (error) {
    console.error("Error fetching summary:", error);
    res.status(500).json({ message: "Server error" });
  }
};
