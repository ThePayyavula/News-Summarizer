/**
 * Frontend JavaScript for Tech News Summarizer
 */

// State
let currentArticles = [];
let isLoading = false;

// DOM Elements
const newsContainer = document.getElementById('newsContainer');
const summarySection = document.getElementById('summarySection');
const executiveSummary = document.getElementById('executiveSummary');
const topStories = document.getElementById('topStories');
const themes = document.getElementById('themes');
const refreshBtn = document.getElementById('refreshBtn');
const cacheInfo = document.getElementById('cacheInfo');
const errorDisplay = document.getElementById('errorDisplay');
const loadingState = document.getElementById('loadingState');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadNews();
  refreshBtn.addEventListener('click', () => loadNews(true));
});

/**
 * Load news articles
 */
async function loadNews(force = false) {
  if (isLoading) return;

  isLoading = true;
  setLoading(true);
  hideError();

  try {
    const response = await fetch('/api/news');
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch news');
    }

    currentArticles = data.articles;
    renderArticles(data.articles);

    // Generate AI summary
    await generateSummary(data.articles);

    setLoading(false);
  } catch (error) {
    console.error('Error loading news:', error);
    showError('Failed to load news. Please check your NewsAPI key and try again.');
    setLoading(false);
  } finally {
    isLoading = false;
  }
}

/**
 * Generate AI summary
 */
async function generateSummary(articles) {
  if (!articles || articles.length === 0) {
    summarySection.classList.add('hidden');
    return;
  }

  try {
    const response = await fetch('/api/summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ articles })
    });

    const data = await response.json();

    if (data.success && data.summary) {
      renderSummary(data.summary);
      summarySection.classList.remove('hidden');
    } else {
      summarySection.classList.add('hidden');
    }
  } catch (error) {
    console.error('Error generating summary:', error);
    summarySection.classList.add('hidden');
  }
}

/**
 * Render articles to the page
 */
function renderArticles(articles) {
  if (!articles || articles.length === 0) {
    newsContainer.innerHTML = '<p class="no-articles">No articles found.</p>';
    return;
  }

  newsContainer.innerHTML = articles.map(article => `
    <article class="news-card">
      ${article.image ? `
        <div class="news-image" style="background-image: url('${escapeHtml(article.image)}')"></div>
      ` : '<div class="news-image no-image"></div>'}

      <div class="news-content">
        <div class="news-meta">
          <span class="news-source">${escapeHtml(article.source)}</span>
          <span class="news-date">${formatDate(article.pubDate)}</span>
        </div>

        <h3 class="news-title">
          <a href="${escapeHtml(article.link)}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(article.title)}
          </a>
        </h3>

        ${article.description ? `
          <p class="news-description">${escapeHtml(article.description)}</p>
        ` : ''}

        <a href="${escapeHtml(article.link)}" target="_blank" rel="noopener noreferrer" class="read-more">
          Read more →
        </a>
      </div>
    </article>
  `).join('');
}

/**
 * Render AI summary
 */
function renderSummary(summary) {
  // Executive Summary
  executiveSummary.textContent = summary.executiveSummary || 'No summary available';

  // Top Stories
  if (summary.topStories && summary.topStories.length > 0) {
    topStories.innerHTML = summary.topStories.map(story => `
      <li>
        <strong>${escapeHtml(story.title)}</strong>
        <span>${escapeHtml(story.significance)}</span>
      </li>
    `).join('');
  } else {
    topStories.innerHTML = '<li>No top stories available</li>';
  }

  // Themes
  if (summary.themes && summary.themes.length > 0) {
    themes.innerHTML = summary.themes.map(theme => `
      <span class="theme-tag">${escapeHtml(theme)}</span>
    `).join('');
  } else {
    themes.innerHTML = '<span class="theme-tag">No themes available</span>';
  }
}

/**
 * Set loading state
 */
function setLoading(loading) {
  if (loading) {
    loadingState.classList.remove('hidden');
    refreshBtn.classList.add('loading');
    refreshBtn.disabled = true;
  } else {
    loadingState.classList.add('hidden');
    refreshBtn.classList.remove('loading');
    refreshBtn.disabled = false;
  }
}

/**
 * Show error message
 */
function showError(message) {
  errorDisplay.textContent = message;
  errorDisplay.classList.remove('hidden');
  setTimeout(() => {
    errorDisplay.classList.add('hidden');
  }, 5000);
}

/**
 * Hide error message
 */
function hideError() {
  errorDisplay.classList.add('hidden');
}

/**
 * Format date for display
 */
function formatDate(dateStr) {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return 'Recent';
  }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
