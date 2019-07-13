import axios from 'axios';

import SendgridMailer from './sendgrid/mailer';

export default class Mailer {
  constructor() {
    this.submailers = [];
  }

  static defaultMailer() {
    const httpClient = axios;
    const mailer = new Mailer();
    const sendgridSubmailer = new SendgridMailer(httpClient);
    mailer.addSubmailer(sendgridSubmailer);
    return mailer;
  }

  addSubmailer(submailer) {
    this.submailers.push(submailer);
  }

  async send(email) {
    for (let i = 0; i !== this.submailers.length; ++i) {
      const submailer = this.submailers[i];
      const result = await submailer.send(email);
      // FIXME return if successful
    }
  }
}
