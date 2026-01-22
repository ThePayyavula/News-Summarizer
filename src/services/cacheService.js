/**
 * Simple in-memory cache service
 */

const { CACHE_CONFIG } = require('../config');

class CacheService {
  constructor() {
    this.articles = [];
    this.lastFetched = null;
  }

  /**
   * Check if cache is still valid
   * @returns {boolean}
   */
  isValid() {
    if (!this.lastFetched) return false;
    return (Date.now() - this.lastFetched) < CACHE_CONFIG.duration;
  }

  /**
   * Get cached articles
   * @returns {Array|null}
   */
  getArticles() {
    if (this.isValid()) {
      return this.articles;
    }
    return null;
  }

  /**
   * Set articles in cache
   * @param {Array} articles
   */
  setArticles(articles) {
    this.articles = articles;
    this.lastFetched = Date.now();
  }

  /**
   * Get cache age in milliseconds
   * @returns {number|null}
   */
  getAge() {
    if (!this.lastFetched) return null;
    return Date.now() - this.lastFetched;
  }

  /**
   * Clear the cache
   */
  clear() {
    this.articles = [];
    this.lastFetched = null;
  }
}

// Export singleton instance
module.exports = new CacheService();