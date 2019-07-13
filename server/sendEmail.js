const sendEmail = async (request, response) => {
  const { body } = request;
  console.log('DEBUG body:', body);
  response.status(200).redirect('/');
};

module.exports = sendEmail;
