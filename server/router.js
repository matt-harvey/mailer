const express = require('express');
const emails = require('./controllers/emails');

const router = express.Router();

router.post('/emails/send', emails.send);

module.exports = router;
