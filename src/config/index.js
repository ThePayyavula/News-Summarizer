const TECH_FEEDS = [
  apiKey: process.env.NEWS_API_KEY,
  baseUrl: 'https://newsapi.org/v2',
  endpoints: {
    topHeadlines: '/top-headlines',
    everything: '/everything'
  },
  defaultParams: {
    category: 'technology',
    country: 'us',
    pageSize: 20
  }
];

const CACHE_CONFIG = {
  duration: 15 * 60 * 1000, // 15 minutes
};

const API_CONFIG = {
  openaiModel: 'gpt-4o-mini',
  maxTokens: 1024,
  timeout: 30000,
};

const SERVER_CONFIG = {
  port: process.env.PORT || 3001,
};

module.exports = {
  TECH_FEEDS,
  CACHE_CONFIG,
  API_CONFIG,
  SERVER_CONFIG,
};
