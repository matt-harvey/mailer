import express from 'express';
import emails from './controllers/emails';

const router = express.Router();

router.post('/emails/send', emails.send);

module.exports = router;
