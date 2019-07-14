import MailService from '../services/mail/mailService';

const send = async (request, response) => {
  const { body } = request;

  // FIXME Validate and parse the request body.
  const { from, subject, message } = body;
  const to = body.to.split(',').map(address => address.trim());
  const email = { from, subject, message, to };
  const mailService = new MailService();

  try {
    await mailService.send(email);
    response.status(200).json({ email });
  } catch (err) {
    response.status(500).json({ err });
  }
};

export default { send };
