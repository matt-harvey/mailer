export default class Mailer {

  // Returns an object comprising { url, data, config }, suitable
  // for passing as parameters to a call to axios.post(url, data, config).
  axiosParams(email) {
    return {
      url: 'https://api.sendgrid.com/v3/mail/send',
      data: this.data(email),
      config: this.config(),
    };
  }

  data(email) {
    const { from, subject, message } = email;

    return {
      from: { email: from },
      personalizations: [{
        to: this.convertField(email, 'to'),
        cc: this.convertField(email, 'cc'),
        bcc: this.convertField(email, 'bcc'),
      }],
      subject,
      content: [{ type: 'text/plain', value: message }],
    };
  }

  config() {
    const apiKey = process.env.SENDGRID_API_KEY;
    return {
      headers: { 'Authorization': `Bearer ${apiKey}` },
      timeout: 5000,
    };
  }

  // convert to field structure required for Sendgrid "personalization".
  convertField(email, field) {
    const parts = email[field].map(address => ({ email: address }));
    return (parts.length === 0 ? undefined : parts);
  }
}
