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

module.exports = router;
