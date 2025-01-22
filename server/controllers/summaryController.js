const { default: axios } = require("axios");
const textSummaryModel = require("../models/summaryModel");



exports.generateSummaryFromText = async (req, res) => {
  const { passage } = req.body;
  try {
    const fastApiResponse = await axios.post('http://localhost:8000/summarize/',
      {
        passage: passage
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });

    const summary = fastApiResponse.data.summary
    const newTextSummary = new textSummaryModel({
      passage: passage,
      modelUsed: fastApiResponse.data.model_used,
      summary: summary,
    });
    await newTextSummary.save()
    res.status(200).json({ summary: summary })


  } catch (error) {
    return res.status(500).json({ error: `Error summarizing passage: ${error.message}` });
  }
}


exports.queryBasedSummary = async (req, res) => {
  const { id } = req.params;
  const { query } = req.body;
  try {
    const doc = await documentModel.findById(id)
    if (!doc) {
      res.status(404).json({ error: "Document Not Found" })
    }
    const querySummary = generateQuerySummary(doc.content, query);

    const newSummary = new summaryModel({
      documentId: id,
      content: querySummary,
      queryBased: true

    });
    await newSummary.save()
    res.status(201).json({ message: "Query-based summary created successfully", summary: newSummary });
  } catch (error) {

  }
}
exports.summarizeEntireDocController = async (req, res) => {
  const { id } = req.params;

  console.log()
  try {
    const document = await documentModel.findById(id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    const summaryText = generateSummary(document.content)

    const newSummary = new summaryModel({
      documentId: id,
      content: summaryText

    });
    await newSummary.save();


    return res.status(200).json({ data: newSummary });
  } catch (error) {

    return res.status(500).json({ error: `Error summarizing document: ${error.message}` });
  }
};

function generateSummary(content) {
  // Add logic to create a summary based on content and type (e.g., using an NLP API)
  return "Generated summary based on the document content.";
}

// Example function to generate a query-based summary (replace with your own logic)
function generateQuerySummary(documentContent, query) {
  // Implement your search and summarization logic here
  // This is a basic example that checks if the query is present in the document content
  if (documentContent.includes(query)) {
    return `Summary for query '${query}': ${documentContent}`;
  } else {
    return `No relevant content found for query '${query}'.`;
  }
}
