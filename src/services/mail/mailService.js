import axios from 'axios';

import SendgridMailer from './sendgrid/mailer';
import MailgunMailer from './mailgun/mailer';
import log from '../log/log';

export default class MailerService {
  constructor() {
    this.mailers = [
      new SendgridMailer(),
      new MailgunMailer(),
    ]
  }

  async send(email) {
    log('Sending email:', email);
    let error;
    for (let i = 0; i !== this.mailers.length; ++i) {
      const mailer = this.mailers[i];
      const { url, data, config } = mailer.axiosParams(email);
      try {
        const result = await axios.post(url, data, config);
        log('Email sent:', email);
        // Return after the first mailer succeeds
        return result;
      } catch (err) {
        log('Failed to send email:', err.toString());
        error = err;
      }
    }
    // No mailer has succeeded; rethrow the error from the last attempt.
    throw error;
  }
}
