import axios from 'axios';

import SendgridMailer from './sendgrid/mailer';
import MailgunMailer from './mailgun/mailer';

export default class MailerService {
  constructor() {
    this.mailers = [
      new SendgridMailer(),
      new MailgunMailer(),
    ]
  }

  async send(email) {
    let error;
    for (let i = 0; i !== this.mailers.length; ++i) {
      const mailer = this.mailers[i];
      const { url, data, config } = mailer.axiosParams(email);
      try {
        const result = await axios.post(url, data, config);
        // Return after the first mailer succeeds
        return result;
      } catch (err) {
        error = err;
      }
    }
    // No mailer has succeeded; rethrow the error from the last attempt.
    throw error;
  }
}
