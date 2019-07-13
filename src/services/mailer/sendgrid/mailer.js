const sendgridURI = 'https://api.sendgrid.com/v3/mail/send';

class Mailer {

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async send(email) {
    const data = {
      personalizations: [{ to: email.to.map(address => ({ email: address })) }],
      from: { email: email.from },
      subject: email.subject,
      content: [{ type: 'text/plain', value: email.message }],
    };
    const sendgridAPIKey = process.env.SENDGRID_API_KEY;
    const config = { headers: { 'Authorization': `Bearer ${sendgridAPIKey}` }, timeout: 5000 };
    return await this.httpClient.post(sendgridURI, data, config);
    // FIXME Handle error etc.
  }
}

module.exports = Mailer;
