import MailService from '../services/mail/mailService';
import Email from '../models/email';

const send = async (request, response) => {
  try {
    const { body } = request;
    const { from, subject, message } = body;
    const [to, cc, bcc] = ['to', 'cc', 'bcc'].map(fieldName => parseAddressField(body, fieldName));

    // Validate that object received in form conforms to schema defined for Email: this
    // will throw if it doesn't.
    const email = Email({ from, to, cc, bcc, subject, message });

    const mailService = new MailService();
    await mailService.send(email);
    response.status(200).json({ result: { email } });
  } catch (error) {
    response.status(500).json({ error: { message: error.message } });
  }
};

// Grabs a field from the form value and parses it as a comma-separated list of strings,
// returning an array of the list items.
const parseAddressField = (formBody, fieldName) =>
  (formBody[fieldName] || '')
    .split(',')
    .map(address => address.trim())
    .filter(address => address.length !== 0);

export default { send };
