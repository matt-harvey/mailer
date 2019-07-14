import FormData from 'form-data';

export default class Mailer {

  axiosParams(email) {
    const domain = process.env.MAILGUN_DOMAIN;
    const url = `https://api.mailgun.net/v3/${domain}/messages`;
    const data = this.data(email);
    const config = this.config(data);
    return { url, data, config };
  }

  data(email) {
    const { from, to, subject, message } = email;
    const data = new FormData();
    data.append('from', from);
    data.append('to', to.join(', '));
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
