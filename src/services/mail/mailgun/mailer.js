import FormData from 'form-data';

export default class Mailer {

  // Returns an object comprising { url, data, config }, suitable
  // for passing as parameters to a call to axios.post(url, data, config).
  axiosParams(email) {
    const domain = process.env.MAILGUN_DOMAIN;
    const url = `https://api.mailgun.net/v3/${domain}/messages`;
    const data = this.data(email);
    const config = this.config(data);
    return { url, data, config };
  }

  data(email) {
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

  config(data) {
    const password = process.env.MAILGUN_API_KEY;
    const formHeaders = data.getHeaders();
    return {
      headers: { ...formHeaders },
      auth: { username: 'api', password },
    };
  }
}
