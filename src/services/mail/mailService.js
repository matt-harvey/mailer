import axios from 'axios';

import { sendEmail as sendEmailViaSendgrid } from './sendgrid/mailer';
import { sendEmail as sendEmailViaMailgun } from './mailgun/mailer';
import log from '../log/log';

// Provides an abstraction around 1 or more concrete mailers (instances of Mailer),
// to arrange for sending an email via one of those mailers, or if that one fails, the next one, etc.,
// until one succeeds.
//
// By default a `new MailService` will be configured with a Sendgrid mailer (first preference) and a Mailgun mailer
// (second). The `.mailers` property contains the list of mailers on a given MailService instance.
export default class MailService {

  constructor() {
    this.mailers = [
      new Mailer('Sendgrid', sendEmailViaSendgrid),
      new Mailer('Mailgun', sendEmailViaMailgun),
    ];
  }

  // Send an email. The email argument should satisfy the Email schema defined in models/email.js.
  async send(email) {
    log('Sending email:', email);
    let error;
    for (let i = 0; i !== this.mailers.length; ++i) {
      const { serviceName, send } = this.mailers[i];
      try {
        const result = await send(axios, email);
        log(`Email sent via ${serviceName}:`, email);
        // Return after the first mailer succeeds
        return result;
      } catch (err) {
        log(`Failed to send email via ${serviceName}:`, err.toString());
        error = err;
      }
    }
    // No mailer has succeeded; rethrow the error from the last attempt.
    throw error;
  }
}

// Constructor to be called with new.
// Encapsulates the name of an email service (e.g. 'Sendgrid') and an async send function
// that when passed an axios instance and an email object, will send an email
// via that service. If the send function should indicate failure by throwing an exception.
export function Mailer(serviceName, send) {
  this.serviceName = serviceName;
  this.send = send;
}

