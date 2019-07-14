import axios from 'axios';

import SendgridMailer from './sendgrid/mailer';
import MailgunMailer from './mailgun/mailer';

export default class MailerService {
  constructor() {
    this.mailers = [
      new SendgridMailer(),
      // new MailgunMailer(), // FIXME
    ]
  }

  async send(email) {
    for (let i = 0; i !== this.mailers.length; ++i) {
      const mailer = this.mailers[i];
      const { url, data, config } = mailer.axiosParams(email);
      const result = await axios.post(url, data, config);
    }
  }
}
