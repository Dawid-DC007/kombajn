// ===== Configuration =====
const CONFIG = {
 RSS_FEEDS: [
 {
 name: 'Reuters Business',
 id: 'reuters',
 url: 'https://www.reutersagency.com/feed/?taxonomy=best-topics&post_type=best'
 },
 {
 name: 'Bloomberg',
 id: 'bloomberg',
 url: 'https://www.bloomberg.com/feed/podcast/etf-report.xml'
 },
 {
 name: 'Financial Times',
 id: 'ft',
 url: 'https://www.ft.com/?format=rss'
 },
 {
 name: 'Wall Street Journal',
 id: 'wsj',
 url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml'
 },
 {
 name: 'The Economist',
 id: 'economist',
 url: 'https://www.economist.com/business/rss.xml'
 }
 ],
 RSS2JSON_API: 'https://api.rss2json.com/v1/api.json',
 CACHE_DURATION: 15 * 60 * 1000, // 15 minutes
 MAX_ARTICLES_PER_SOURCE: 10,
 SEARCH_DEBOUNCE_MS: 300
};

// ===== State =====
let state = {
 articles: [],
 filteredArticles: [],
 currentTheme: 'light',
 searchQuery: '',
 sourceFilter: 'all',
 sortBy: 'newest'
};

// ===== DOM Elements =====
const elements = {
 articlesGrid: document.getElementById('articlesGrid'),
 searchInput: document.getElementById('searchInput'),
 sourceFilter: document.getElementById('sourceFilter'),
 sortBy: document.getElementById('sortBy'),
 refreshBtn: document.getElementById('refreshBtn'),
 themeToggle: document.getElementById('themeToggle'),
 articleCount: document.getElementById('articleCount'),
 lastUpdate: document.getElementById('lastUpdate'),
 loadingState: document.getElementById('loadingState'),
 errorState: document.getElementById('errorState'),
 emptyState: document.getElementById('emptyState'),
 errorMessage: document.getElementById('errorMessage'),
 retryBtn: document.getElementById('retryBtn')
};

// ===== Utility Functions =====
const debounce = (func, delay) => {
 let timeoutId;
 return (...args) => {
 clearTimeout(timeoutId);
 timeoutId = setTimeout(() => func(...args), delay);
 };
};

const formatDate = (dateString) => {
 const date = new Date(dateString);
 const now = new Date();
 const diffMs = now - date;
 const diffMins = Math.floor(diffMs / 60000);
 const diffHours = Math.floor(diffMs / 3600000);
 const diffDays = Math.floor(diffMs / 86400000);

 if (diffMins < 1) return 'Przed chwilą';
 if (diffMins < 60) return `${diffMins} min temu`;
 if (diffHours < 24) return `${diffHours}h temu`;
 if (diffDays < 7) return `${diffDays} dni temu`;
 
 return date.toLocaleDateString('pl-PL', { 
 day: 'numeric', 
 month: 'short', 
 year: 'numeric' 
 });
};

const stripHtml = (html) => {
 const tmp = document.createElement('DIV');
 tmp.innerHTML = html;
 return tmp.textContent || tmp.innerText || ... (Response truncated due to token limit)
