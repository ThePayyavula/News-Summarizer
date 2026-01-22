/**
 * News Service
 * Fetches tech news from NewsAPI
 */

const axios = require('axios');
const { NEWS_API_CONFIG } = require('../config');
const cacheService = require('./cacheService');

/**
 * Fetch tech news from NewsAPI
 * @returns {Promise<Array>} - Array of news articles
 */
async function fetchNews() {
  // Return cached data if still fresh
  const cached = cacheService.getArticles();
  if (cached) {
    console.log('Returning cached news...');
    return cached;
  }

  console.log('Fetching fresh news from NewsAPI...');

  try {
    const response = await axios.get(`${NEWS_API_CONFIG.baseUrl}${NEWS_API_CONFIG.endpoints.topHeadlines}`, {
      params: {
        category: NEWS_API_CONFIG.defaultParams.category,
        country: NEWS_API_CONFIG.defaultParams.country,
        pageSize: NEWS_API_CONFIG.defaultParams.pageSize,
        apiKey: NEWS_API_CONFIG.apiKey
      },
      timeout: 10000
    });

    const articles = response.data.articles.map(article => ({
      title: article.title || 'No title',
      link: article.url || '#',
      description: article.description || '',
      pubDate: article.publishedAt || new Date().toISOString(),
      source: article.source?.name || 'Unknown',
      image: article.urlToImage || null
    }));

    // Update cache
    cacheService.setArticles(articles);

    return articles;
  } catch (error) {
    console.error('Error fetching news:', error.message);
    throw error;
  }
}

module.exports = {
  fetchNews,
};