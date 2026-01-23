# News Summarizer

This web application that fetches tech news from an API and provides a summaries using OpenAI's GPT model.

## Features
- **Real Time News**: Gets latest tech-news from NewsAPI.
- **AI Summaries**: Using OpenAI api, we generate:
    - Summary of current tech trends
    - Top 3 most significant stories
    - Key themes identified
- **15 minute Cache**: I build a 15-minute cache that reduces API calls as OpenAI api is not free...:(

## How to run locally

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- NewsAPI key :-free at (https://newsapi.org/)
- OpenAI API key (https://platform.openai.com/)

### Steps to setup

1. git clone https://github.com/ThePayyavula/News-Summarizer.git
   cd News-Summarizer
2. npm install
3. cp .env.example .env
    Edit the .env with your API keys
4. npm start
5. Navigate to `http://localhost:3001`

## API Key Setup

### NewsAPI Key (Required)

1. Visit https://newsapi.org/register
2. Register for a free account
3. Copy your API key
4. Add it to `.env` as `NEWS_API_KEY`

### OpenAI API Key (Optional)

1. Visit https://platform.openai.com/signup
2. Create an account and add billing information
3. Generate an API key from the API keys section
4. Add it to `.env` as `OPENAI_API_KEY`

## Approach and Tradeoffs

**1. Backend Approach**: 
- Uses Express.js server: For the lightweight website, which this website is.
- Had different concerns seperated: 
    - **newsServices.js**: Handles NewsAPI integration
    - **aiService.js**: Manages OpenAI API calls
    - **cacheService.js**: In-memory caching logic
- **Tradeoffs**: In-memory cache means data is lost on server restart. I would use Redis if we are going to work on it for the future.

**2. Frontend Approach**: 
- Used vanilla javascript for now for simplicity.
- App works without AI summaries if OpenAI key is missing. (Error handling covers it)
- Client-side Rendering so server has less load.
- **Tradeoffs**: No SSR so shows the loading state in initial load. Also, Next.js would be great for SEO requirements for the future.

**Additional Tradeoff with improvements**: 

- NewsAPI free tier has daily limits (100 requests) so we cant have a lower refresh rate for the cache. (15 minutes cache means 96 refresh/day) We could upgarde it or use a different APi for more refreshes. 

- Using GPT-4o-mini Model which could often be incorrect with its output. Using a better model would be better for the production phase of this app.

- AI calls add latency (~2 or 3 seconds) so I need to work more on the performance.

- I still need to work on the sanitization on API endpoints to make the app work better.

- Need to add rate limiting to stop the abuse as it could lead to a huge charge.

**With more time**:
- Implement proper logging
- Track users preferences and show feed accordingly.
- Add more news sources beyond NewsAPI
- Add email service where we send daily summaries.

## AI Tools Used

### Claude
- **Usage**: Used it to help with the frontend design by asking for resources and examples I can use to make the website look better.

### OpenAI API
- **Usage**: Used in the RAG pipeline to generate article summaries and synthesize final responses from retrieved news content.






