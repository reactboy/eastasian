import * as express from 'express';

import { prisma } from '@api/configs/db';
import { verifyToken } from '@api/middleware';

const router = express.Router();

router.get('/works', async (_req, res) => {
  try {
    const works = await prisma.work.findMany({
      include: {
        stacks: {
          select: {
            id: true,
            stackImage: true,
            displayName: true,
          },
        },
      },
    });
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
      include: {
        stacks: {
          select: {
            id: true,
            stackImage: true,
            displayName: true,
          },
        },
      },
    });
    return res.send({ work });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.post('/works', verifyToken, async (req, res) => {
  try {
    const { stackIds, ...payload } = req.body;
    const work = await prisma.work.create({
      data: {
        ...payload,
        profileId: req.user.id,
        stacks: {
          connect: (stackIds || []).map((id) => ({ id })),
        },
      },
      include: {
        stacks: {
          select: {
            id: true,
            stackImage: true,
            displayName: true,
          },
        },
      },
    });
    return res.send({ work });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.put('/works/:workId', verifyToken, async (req, res) => {
  try {
    const { workId } = req.params;
    const { stackIds, prevStackIds, ...payload } = req.body;
    const disconnectingStackIds = prevStackIds.filter(
      (id) => stackIds.indexOf(id) === -1
    );
    const work = await prisma.work.update({
      where: {
        id: workId,
      },
      data: {
        ...payload,
        profileId: req.user.id,
        stacks: {
          connect: (stackIds || []).map((id) => ({ id })),
          disconnect: disconnectingStackIds.map((id) => ({ id })),
        },
      },
      include: {
        stacks: {
          select: {
            id: true,
            stackImage: true,
            displayName: true,
          },
        },
      },
    });
    return res.send({ work });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.delete('/works/:workId', verifyToken, async (req, res) => {
  try {
    const { workId } = req.params;
    const work = await prisma.work.delete({
      where: {
        id: workId,
      },
      include: {
        stacks: {
          select: {
            id: true,
            stackImage: true,
            displayName: true,
          },
        },
      },
    });
    return res.send({ work });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

export { router as works };
