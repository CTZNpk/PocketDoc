const { default: axios } = require("axios");
const textSummaryModel = require("../models/textSummaryModel");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const { marked } = require("marked");

const DocSummary = require("../models/summaryModel");

const FormData = require("form-data");
const documentModel = require("../models/documentModel");

exports.generateSummaryFromText = async (req, res) => {
  const { passage, documentType, summaryLength, formatPreference, focus } =
    req.body;
  const form = new FormData();
  form.append("passage", passage);
  if (documentType) form.append("document_type", documentType);
  if (summaryLength) form.append("summary_length", summaryLength);
  if (formatPreference) form.append("format_preference", formatPreference);
  if (focus) form.append("focus", focus);
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
    const userId = req.user.id;

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
      userId: userId,
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

exports.getSummaryById = async (req, res) => {
  const { summaryId } = req.params;

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

exports.downloadSummaryPdf = async (req, res) => {
  const { summaryId } = req.params;

  try {
    const summary = await DocSummary.findById(summaryId).populate({
      path: "document",
      select: "title",
    });

    if (!summary) {
      return res.status(404).json({ message: "Summary not found" });
    }

    const markdown = summary.summary;
    const htmlContent = marked(markdown); // Convert Markdown to HTML

    const title = summary.document?.title?.replace(/\s+/g, "_") || "Untitled";
    const filename = `Summary_${title}_${summary.startPage}_${summary.endPage}.pdf`;
    const filePath = path.join(__dirname, "../temp", filename);

    // Launch Puppeteer and generate the PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(`
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #000;
            }
            h1, h2, h3 {
              color: #333;
            }
            ul {
              margin-left: 20px;
            }
          </style>
        </head>
        <body>${htmlContent}</body>
      </html>
    `);

    await page.pdf({ path: filePath, format: "A4", printBackground: true });
    await browser.close();

    res.download(filePath, filename, (err) => {
      if (err) {
        console.error("Error sending PDF:", err);
        res.status(500).json({ message: "Failed to send file" });
      }
      fs.unlink(filePath, () => {});
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserDocumentSummaries = async (req, res) => {
  try {
    const userId = req.user.id;

    const summaries = await DocSummary.find({ userId })
      .select("-summary")
      .populate("document", "title")
      .sort({ createdAt: -1 })
      .exec();

    if (!summaries.length) {
      return res
        .status(404)
        .json({ error: "No summaries found for this user" });
    }

    const result = summaries.map((summary) => ({
      summaryId: summary._id,
      documentTitle: summary.document?.title || "Untitled",
      startPage: summary.startPage,
      endPage: summary.endPage,
      summaryLength: summary.metadata.summaryLength,
      formatPreference: summary.metadata.formatPreference,
      focusArea: summary.metadata.focusArea,
      generatedAt: summary.metadata.generatedAt,
    }));

    return res.status(200).json({ status: "success", data: result });
  } catch (error) {
    console.error("Error fetching summaries:", error);
    return res.status(500).json({ error: "Error fetching summaries" });
  }
};
