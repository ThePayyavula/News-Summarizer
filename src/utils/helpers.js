/**
 * Utility functions
 */

/**
 * Strip HTML tags from content
 * @param {string} html - HTML string to clean
 * @returns {string} - Plain text
 */
function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&[^;]+;/g, ' ')
    .trim()
    .slice(0, 500);
}

/**
 * Format date for display
 * @param {string} dateStr - ISO date string
 * @returns {string} - Formatted date
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

module.exports = {
  stripHtml,
  formatDate,
};