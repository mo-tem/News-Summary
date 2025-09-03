# News Summary

## Overview

This project is a simple Express-based API for fetching and summarizing news headlines.

- **Fetch Headlines:** The `/news` endpoint retrieves the top 10 news headlines from NewsAPI. If the NewsAPI key is missing, it returns mock headlines for testing.
- **Summarize Headlines:** The `/summarize` endpoint accepts an array of headlines and returns a summary. If a Hugging Face API key is provided, it uses the BART model for advanced summarization. Otherwise, it falls back to a basic rule-based summarizer.

## Features

- Easy integration with NewsAPI and Hugging Face Inference API.
- Fallback mechanisms for local development and testing.
- Simple, clear REST API design.

## Usage

1. Clone the repository.
2. Add your API keys to the `.env` file:
   - `NEWS_API_KEY` for NewsAPI
   - `HF_API_KEY` for Hugging Face (optional)
3. Run the server:
   ```
   npm install
   npm start
   ```
4. Use the endpoints:
   - `POST /news` to fetch headlines
   - `POST /summarize` with `{ "headlines": [...] }` to get a summary

## Example Request

```json
POST /summarize
{
  "headlines": [
    "Global markets rally on economic optimism",
    "Tech companies announce new AI breakthroughs",
    "Climate summit yields new international agreements"
  ]
}
```

## Example Response

```json
{
  "summary": "Global markets are rising amid economic optimism, with major AI breakthroughs and new international climate agreements shaping current events."
