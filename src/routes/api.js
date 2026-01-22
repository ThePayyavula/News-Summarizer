/**
 * API Routes
 */

const express = require('express');
const router = express.Router();
const { newsService, aiService } = require('../services');

/**
 * GET /api/news
 * Fetch and return tech news articles
 */
router.get('/news', async (req, res) => {
  try {
    const articles = await newsService.fetchNews();
    res.json({
      success: true,
      count: articles.length,
      articles
    });
  } catch (error) {
    console.error('Error in /api/news:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch news',
      message: error.message
    });
  }
});

/**
 * POST /api/summary
 * Generate AI summary of provided articles
 */
router.post('/summary', async (req, res) => {
  try {
    const { articles } = req.body;

    if (!articles || !Array.isArray(articles)) {
      return res.status(400).json({
        success: false,
        error: 'Articles array required'
      });
    }

    const summary = await aiService.generateSummary(articles);

    res.json({
      success: true,
      summary: summary || {
        executiveSummary: 'AI summary unavailable. Please check your OpenAI API key.',
        topStories: [],
        themes: []
      }
    });
  } catch (error) {
    console.error('Error in /api/summary:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate summary',
      message: error.message
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
