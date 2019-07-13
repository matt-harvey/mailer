import bodyParser from 'body-parser';
import dotenv from 'dotenv-safe';
import express from 'express';
import path from 'path';

import router from './router';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const appName = process.env.APP_NAME;

app.use(bodyParser.json({ limit: '256MB' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '256MG' }));

app.use('/', express.static(path.join(__dirname, 'static')));
app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`${appName} is listening on port ${port}`);
});
