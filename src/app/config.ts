const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT ||
  'https://us-central1-com-gairal-chools.cloudfunctions.net';
// 'http://localhost:5000/com-gairal-chools/us-central1';

export default {
  API_AUTH_ENDPOINT: `${API_ENDPOINT}/auth`,
  API_SAVE_ENDPOINT: `${API_ENDPOINT}/sheets`,
  API_SEARCH_ENDPOINT: `${API_ENDPOINT}/tweets`,
  API_TRANSLATE_ENDPOINT: `${API_ENDPOINT}/translates`,
};
