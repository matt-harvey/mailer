import FormData from 'form-data';

// Accepts an axios instance and an Email object (see models/email.js).
// Returns the Promise returned by axios.post.
export async function sendEmail(axios, email) {
  const { url, data, config } = axiosParams(email);
  return axios.post(url, data, config);
}

// Returns an object comprising { url, data, config }, suitable
// for passing as parameters to a call to axios.post(url, data, config).
function axiosParams(email) {
  const domain = process.env.MAILGUN_DOMAIN;
  const url = `https://api.mailgun.net/v3/${domain}/messages`;
  const data = requestData(email);
  const config = requestConfig(data);
  return { url, data, config };
}

// Returns data object suitable for passing to axios.post.
function requestData(email) {
  const { from, to, cc, bcc, subject, message } = email;
  const data = new FormData();
  data.append('from', from);
  data.append('to', to.join(', '));
  if (cc.length !== 0) data.append('cc', cc.join(', '));
  if (bcc.length !== 0) data.append('bcc', bcc.join(', '));
  data.append('subject', subject);
  data.append('text', message);
  return data;
}

// Returns a configuration object suitable for passing to axios.post.
function requestConfig(data) {
  const password = process.env.MAILGUN_API_KEY;
  const formHeaders = data.getHeaders();
  return {
    headers: { ...formHeaders },
    auth: { username: 'api', password },
  };
}
