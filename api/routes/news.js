const express = require('express');
const axios = require('axios');
const router = express.Router();

// GitHub Copilot comment for generating route
// Express route /news that fetches top 10 headlines from NewsAPI
// If NEWS_API_KEY is missing, fallback to mock JSON
router.get('/', async (req, res) => {
  try {
    const API_KEY = process.env.NEWS_API_KEY;

    if (API_KEY) {
      // Real NewsAPI request
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${API_KEY}`);
      res.json(response.data.articles);
    } else {
      // Fallback mock data
      const mockArticles = [
        { title: "Mock Headline 1", description: "Description 1" },
        { title: "Mock Headline 2", description: "Description 2" },
        { title: "Mock Headline 3", description: "Description 3" }
      ];
      res.json(mockArticles);
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

module.exports = router;