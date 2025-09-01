const express = require('express');
const router = express.Router();

// GitHub Copilot comment for generating route
// Express route /summarize that summarizes top headlines using Hugging Face API
// Fallback to simple rule-based summarizer if HF_API_KEY is missing

router.post('/', async (req, res) => {
  try {
    const headlines = req.body.headlines; // Array of strings

    if (!headlines || !Array.isArray(headlines)) {
      return res.status(400).json({ error: 'headlines must be an array of strings' });
    }

    if (process.env.HF_API_KEY) {
      // Hugging Face summarization
      const { HfInference } = require('@huggingface/inference');
      const hf = new HfInference(process.env.HF_API_KEY);

      const summaryArr = await hf.summarization({
        model: 'facebook/bart-large-cnn',
        inputs: headlines.join('\n')
      });

      return res.json({ summary: summaryArr[0].summary_text });
    }

    // Fallback rule-based summarizer (for testing without API key)
    const summary = headlines.slice(0, 3).join('. ') + '.';
    res.json({ summary });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to summarize headlines' });
  }
});

module.exports = router;