const { default: axios } = require("axios");
const textSummaryModel = require("../models/textSummaryModel");

const DocSummary = require("../models/summaryModel");
const qs = require("qs");

exports.generateSummaryFromText = async (req, res) => {
  const { passage } = req.body;
  const form = new FormData();
  form.append("passage", passage);
  try {
    const fastApiResponse = await axios.post(
      "http://localhost:8000/summarize/",
      form,
      { headers: form.getHeaders() },
    );

    console.log(fastApiResponse);
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
  } catch (error) { }
};

const FormData = require("form-data");

exports.storeSummaryDocument = async (req, res) => {
  try {
    // 1. Extract all required fields with defaults
    const {
      document_id,
      file_path,
      start_page = 1,
      end_page = 1,
      document_type = "general",
      summary_length = 40,
      format_preference = "paragraph",
      focus = "main ideas",
    } = req.body;

    // 2. Validate required fields
    if (!document_id || !file_path) {
      return res.status(400).json({
        status: "error",
        error: "document_id and file_path are required",
      });
    }

    // 3. Create form-data payload
    const form = new FormData();
    form.append("document_id", document_id);
    form.append("file_path", file_path);
    form.append("start_page", start_page.toString());
    form.append("end_page", end_page.toString());
    form.append("document_type", document_type);
    form.append("summary_length", summary_length.toString());
    form.append("format_preference", format_preference);
    form.append("focus", focus);

    // 4. Call FastAPI endpoint
    const fastApiResponse = await axios.post(
      "http://localhost:8000/summarize-doc/",
      form,
      {
        headers: {
          ...form.getHeaders(),
          Accept: "application/json",
        },
        timeout: 30000,
      },
    );

    // 5. Verify and process response
    if (!fastApiResponse.data?.summary) {
      throw new Error("Invalid response from summarization service");
    }

    // 6. Store in MongoDB with all fields
    const summaryDoc = new DocSummary({
      documentId: document_id,
      filePath: file_path,
      startPage: parseInt(start_page),
      endPage: parseInt(end_page),
      summary: fastApiResponse.data.summary,
      metadata: {
        documentType: document_type,
        summaryLength: parseInt(summary_length),
        formatPreference: format_preference,
        focusArea: focus,
        generatedAt: new Date(),
      },
    });

    await summaryDoc.save();

    // 7. Return success response
    return res.status(201).json({
      status: "success",
      data: {
        summaryId: summaryDoc._id,
        documentId: summaryDoc.documentId,
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
        documentId: summary.documentId, // Adjust if the field is different
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
