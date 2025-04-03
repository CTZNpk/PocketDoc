const explanationModel = require("../models/explanationModel");
const { default: axios } = require("axios");

const FormData = require("form-data");

exports.generateExplanationForText = async (req, res) => {
  const { passage, detailLevel } = req.body;
  const form = new FormData();
  form.append("passage", passage);
  form.append("detail_level", detailLevel);
  try {
    const fastApiResponse = await axios.post(
      "http://localhost:8000/explanation/",
      form,
      { headers: form.getHeaders() },
    );

    const explanation = fastApiResponse.data.explanation;
    const newTextExplanation = new explanationModel({
      passage: passage,
      modelUsed: "gemini",
      explanation: explanation,
    });
    await newTextExplanation.save();
    res.status(200).json({ explanation });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error generating explanation: ${error.message}` });
  }
};
