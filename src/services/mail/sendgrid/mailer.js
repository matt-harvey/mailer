export default class Mailer {

  axiosParams(email) {
    return {
      url: this.apiURL(),
      data: this.data(email),
      config: this.config(),
    };
  }

  data(email) {
    return {
      personalizations: [{ to: email.to.map(address => ({ email: address })) }],
      from: { email: email.from },
      subject: email.subject,
      content: [{ type: 'text/plain', value: email.message }],
    };
  }

  apiURL() {
    return 'https://api.sendgrid.com/v3/mail/send';
  }

  config() {
    const apiKey = process.env.SENDGRID_API_KEY;
    return {
      headers: { 'Authorization': `Bearer ${apiKey}` },
      timeout: 5000,
    };
  }
}
