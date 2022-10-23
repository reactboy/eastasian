import * as express from 'express';
import * as path from 'path';

import { router as apiRouter } from '@api/routes/api/v1';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to eastasian-api!' });
});

app.use('/api', apiRouter);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
