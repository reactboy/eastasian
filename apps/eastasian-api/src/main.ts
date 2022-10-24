import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';

import {
  stacks,
  profiles,
  projects,
  works,
  educations,
  experiences,
} from '@api/routes/api/v1';

const app = express();

app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(cors());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to eastasian-api!' });
});

app.use('/api', stacks);
app.use('/api', profiles);
app.use('/api', projects);
app.use('/api', works);
app.use('/api', educations);
app.use('/api', experiences);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
