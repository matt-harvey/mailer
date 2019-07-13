const express = require('express');
const sendEmail = require('./sendEmail');

const router = express.Router();

router.post('/emails', sendEmail);

module.exports = router;
