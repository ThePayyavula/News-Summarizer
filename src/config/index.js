const TECH_FEEDS = [
  { 
    name: 'TechCrunch', 
    url: 'https://techcrunch.com/feed/', 
    category: 'Startups & Funding' 
  },
  { 
    name: 'Ars Technica', 
    url: 'https://feeds.arstechnica.com/arstechnica/technology-lab', 
    category: 'Deep Tech' 
  },
  { 
    name: 'The Verge', 
    url: 'https://www.theverge.com/rss/index.xml', 
    category: 'Consumer Tech' 
  },
  { 
    name: 'Wired', 
    url: 'https://www.wired.com/feed/rss', 
    category: 'Tech & Culture' 
  },
  { 
    name: 'Hacker News', 
    url: 'https://hnrss.org/frontpage', 
    category: 'Developer News' 
  },
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
