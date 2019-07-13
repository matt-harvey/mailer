import Mailer from '../services/mailer/mailer';

const send = async (request, response) => {
  const { body } = request;

  // FIXME Validate and parse the request body.
  const { from, subject, message } = body;
  const to = body.to.split(',').map(address => address.trim());
  const email = { from, subject, message, to };
  const mailer = Mailer.defaultMailer();

  try {
    await mailer.send(email);
    response.status(200).redirect('/');
  } catch (err) {
    response.status(500).redirect('/'); // FIXME
  }
};

export default { send };
