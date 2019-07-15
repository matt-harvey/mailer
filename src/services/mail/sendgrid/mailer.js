
// Accepts an axios instance and an Email object (see models/email.js).
// Returns the Promise returned by axios.post.
export async function sendEmail(axios, email) {
  const { url, data, config } = axiosParams(email);
  return axios.post(url, data, config);
}

// Returns an object comprising { url, data, config }, suitable
// for passing as parameters to a call to axios.post(url, data, config).
function axiosParams(email) {
  return {
    url: 'https://api.sendgrid.com/v3/mail/send',
    data: requestData(email),
    config: requestConfig(),
  };
}

// Returns data object suitable for passing to axios.post.
function requestData(email) {
  const { from, subject, message } = email;

  return {
    from: { email: from },
    personalizations: [{
      to: convertField(email, 'to'),
      cc: convertField(email, 'cc'),
      bcc: convertField(email, 'bcc'),
    }],
    subject,
    content: [{ type: 'text/plain', value: message }],
  };
}

// Returns a configuration object suitable for passing to axios.post.
function requestConfig() {
  const apiKey = process.env.SENDGRID_API_KEY;
  return {
    headers: { 'Authorization': `Bearer ${apiKey}` },
    timeout: 5000,
  };
}

// convert to field structure required for Sendgrid "personalization".
function convertField(email, field) {
  const parts = email[field].map(address => ({ email: address }));
  return (parts.length === 0 ? undefined : parts);
}
