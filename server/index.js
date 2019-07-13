const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const dotenv = require('dotenv-safe');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const appName = process.env.APP_NAME;

app.use(bodyParser.json({ limit: '256MB' }));

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`${appName} is listening on port ${port}`);
});
