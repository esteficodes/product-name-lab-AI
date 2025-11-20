const express = require("express");
const cors = require("cors");
const { generateNames } = require("./aiClient");
const { saveGeneration } = require("./mockDb");

const PORT = 4000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/names", async (req, res) => {
  try {
    const { description, styles } = req.body;

    if (
      !description ||
      typeof description !== "string" ||
      !description.trim()
    ) {
      return res.status(400).json({ error: "Description is required." });
    }

    const safeStyles = Array.isArray(styles) ? styles : [];

    const suggestions = await generateNames(description, safeStyles);
    const mainName = suggestions[0];
    const alternatives = suggestions.slice(1, 4);

    saveGeneration({
      description,
      styles: safeStyles,
      mainName,
      alternatives,
    });

    res.json({ mainName, alternatives });
  } catch (err) {
    console.error("Error in /api/names:", err);
    res
      .status(500)
      .json({ error: "Failed to generate names. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`);
});
