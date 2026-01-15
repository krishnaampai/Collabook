const express = require("express");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

router.post("/:id", async (req, res) => {
  try {
    const pdfPath = path.join(__dirname, "../uploads/sample.pdf");

    const buffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(buffer);

    const prompt = `
Summarise the following student notes in bullet points.
Make it concise and exam-oriented.

${pdfData.text}
    `;

    const result = await model.generateContent(prompt);

    res.json({
      summary: result.response.text(),
    });

  } catch (error) {
    console.error("Summarise error:", error);
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
