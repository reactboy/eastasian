import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

import {
  stacks,
  profiles,
  projects,
  works,
  educations,
  experiences,
  auth,
} from '@api/routes/api/v1';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:4200', 'https://localhost:4200'],
    credentials: true,
  })
);

const API_ROOT = '/api';
app.use(API_ROOT, stacks);
app.use(API_ROOT, profiles);
app.use(API_ROOT, projects);
app.use(API_ROOT, works);
app.use(API_ROOT, educations);
app.use(API_ROOT, experiences);
app.use(API_ROOT, auth);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
