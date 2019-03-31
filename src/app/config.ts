const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT ||
  'https://us-central1-com-gairal-chools.cloudfunctions.net';
// 'http://localhost:5000/com-gairal-chools/us-central1';

export default {
  API_AUTH_ENDPOINT: `${API_ENDPOINT}/auth`,
  API_SAVE_ENDPOINT: `${API_ENDPOINT}/sheets`,
  API_SEARCH_REDDITS_ENDPOINT: `${API_ENDPOINT}/reddits`,
  API_SEARCH_TWEETS_ENDPOINT: `${API_ENDPOINT}/tweets`,
  API_TRANSLATE_ENDPOINT: `${API_ENDPOINT}/translates`,
  API_TRASH_ENDPOINT: `${API_ENDPOINT}/trashes`,
};
