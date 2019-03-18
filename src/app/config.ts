const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT ||
  'https://us-central1-com-gairal-chools.cloudfunctions.net';
// 'http://localhost:5000/com-gairal-chools/us-central1';

export default {
  API_AUTH_ENDPOINT: `${API_ENDPOINT}/auth`,
  API_BOT_ENDPOINT: `${API_ENDPOINT}/bot`,
};
