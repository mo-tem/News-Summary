const express = require('express');
const router = express.Router();
const { HfInference } = require('@huggingface/inference');

const hf = process.env.HF_API_KEY ? new HfInference(process.env.HF_API_KEY) : null;

router.post('/', async (req, res) => {
  try {
    const headlines = req.body.headlines;
    if (!headlines || !Array.isArray(headlines)) {
      return res.status(400).json({ error: 'headlines must be an array of strings' });
    }

    let summary;

    if (hf) {
      const inputText = headlines.join('. ');
      const response = await hf.summarization({
        model: 'facebook/bart-large-cnn',
        inputs: inputText
      });

      console.log('HF Response:', response); // Debugging

      // Support different HF return formats
      if (Array.isArray(response) && response.length > 0) {
        summary = response[0].summary_text || response[0].generated_text || inputText;
      } else {
        summary = inputText; // fallback if HF response is empty
      }
    } else {
      summary = headlines.slice(0, 3).join('. ') + '.';
    }

    res.json({ summary });

  } catch (error) {
    console.error('Summarization error:', error);
    res.status(500).json({ error: 'Failed to summarize headlines' });
  }
});

module.exports = router;