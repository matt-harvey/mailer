import FormData from 'form-data';

export default class Mailer {

  axiosParams(email) {
    const data = this.data(email);
    return {
      url: this.apiURL(),
      data: data,
      config: this.config(data),
    };
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

  apiURL() {
    const mailgunDomain = process.env.MAILGUN_DOMAIN;
    return `https://api.mailgun.net/v3/${mailgunDomain}/messages`;
  }

  config(data) {
    const apiKey = process.env.MAILGUN_API_KEY;
    const formHeaders = data.getHeaders();
    return {
      headers: { ...formHeaders },
      auth: {
        username: 'api',
        password: apiKey,
      },
    };
  }
}
