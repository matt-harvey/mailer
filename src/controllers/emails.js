import MailService from '../services/mail/mailService';
import Email from '../models/email';

const send = async (request, response) => {
  try {
    const { body } = request;
    const { from, subject, message } = body;
    const to = body.to.split(',').map(address => address.trim());
    const email = Email({ from, subject, message, to });
    const mailService = new MailService();
    await mailService.send(email);
    response.status(200).json({ result: { email } });
  } catch (error) {
    response.status(500).json({ error: { message: error.message } });
  }
};

export default { send };
