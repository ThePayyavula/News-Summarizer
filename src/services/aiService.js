/**
 * AI Summary Service
 * Handles generating summaries using OpenAI API
 */

const axios = require('axios');
const { API_CONFIG } = require('../config');

/**
 * Generate AI-powered summary of articles
 * @param {Array} articles - Array of news articles
 * @returns {Promise<Object>} - Summary object
 */
async function generateSummary(articles) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.log('No OpenAI API key found');
    return null;
  }
  
  const articleText = articles.slice(0, 10).map((a, i) => 
    `${i + 1}. [${a.source}] ${a.title}\n   ${a.description}`
  ).join('\n\n');
  
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: API_CONFIG.openaiModel,
      max_tokens: API_CONFIG.maxTokens,
      messages: [{
        role: 'user',
        content: `You are a tech news analyst. Analyze these tech news headlines and provide:

1. A brief 2-3 sentence executive summary of the most important trends
2. The top 3 most significant stories with one-line explanations of why they matter
3. 3-5 key themes you identify from the actual news content (be specific, like "AI Regulation", "Apple Product Launch", "Cybersecurity Threats" - not generic terms)

Respond ONLY with valid JSON in this exact format:
{
  "executiveSummary": "string",
  "topStories": [{"title": "string", "significance": "string"}],
  "themes": ["string", "string", "string"]
}

News articles:
${articleText}`
      }],
      temperature: 0.7
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      timeout: API_CONFIG.timeout
    });
    
    const content = response.data.choices[0].message.content;
    
    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return null;
  } catch (error) {
    console.error('Error generating AI summary:', error.message);
    return null;
  }
}

module.exports = {
  generateSummary,
};