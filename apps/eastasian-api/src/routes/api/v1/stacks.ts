import * as express from 'express';

import { prisma } from '@api/configs/db';
import { verifyToken } from '@api/middleware';

const router = express.Router();

router.get('/stacks', async (_req, res) => {
  try {
    const stacks = await prisma.stack.findMany({});
    return res.send({
      stacks,
    });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.get('/stacks/:stackId', async (req, res) => {
  try {
    const { stackId } = req.params;
    const stack = await prisma.stack.findUnique({
      where: {
        id: stackId,
      },
    });
    return res.send({
      stack,
    });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.post('/stacks', verifyToken, async (req, res) => {
  try {
    const { name, displayName, link = '' } = req.body;
    const stack = await prisma.stack.create({
      data: {
        name,
        displayName,
        link,
      },
    });
    return res.send({
      stack,
    });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.put('/stacks/:stackId', verifyToken, async (req, res) => {
  try {
    const { stackId } = req.params;
    const { name, displayName, link = '' } = req.body;
    const stack = await prisma.stack.update({
      where: {
        id: stackId,
      },
      data: {
        name,
        displayName,
        link,
      },
    });
    return res.send({ stack });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.delete('/stacks/:stackId', verifyToken, async (req, res) => {
  try {
    const { stackId } = req.params;
    const stack = await prisma.stack.delete({
      where: {
        id: stackId,
      },
    });
    return res.send({ stack });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

export { router as stacks };
