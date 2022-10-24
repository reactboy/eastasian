import * as express from 'express';

import { prisma } from '@api/configs/db';

const router = express.Router();

router.get('/works', async (_req, res) => {
  try {
    const works = await prisma.work.findMany();
    return res.send({ works });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.get('/works/:workId', async (req, res) => {
  try {
    const { workId } = req.params;
    const work = await prisma.work.findUnique({
      where: {
        id: workId,
      },
    });
    return res.send({ work });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.post('/works', async (req, res) => {
  try {
    const { title, body, profileId, stackIds } = req.body;
    const work = await prisma.work.create({
      data: {
        title,
        body,
        profileId,
        stacks: {
          connect: stackIds.map((stackId) => stackId),
        },
      },
    });
    return res.send({ work });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.put('/works/:workId', async (req, res) => {
  try {
    const { workId } = req.params;
    const { title, body, profileId, stackIds } = req.body;
    const work = await prisma.work.update({
      where: {
        id: workId,
      },
      data: {
        title,
        body,
        profileId,
        stacks: {
          connect: stackIds.map((stackId) => stackId),
        },
      },
    });
    return res.send({ work });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.delete('/works/:workId', async (req, res) => {
  try {
    const { workId } = req.params;
    const work = await prisma.work.delete({
      where: {
        id: workId,
      },
    });
    return res.send({ work });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

export { router as works };
