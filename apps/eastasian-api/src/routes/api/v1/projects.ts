import * as express from 'express';

import { prisma } from '@api/configs/db';
import { verifyToken } from '@api/middleware';

const router = express.Router();

router.get('/projects', async (_req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [
        {
          startDate: 'desc',
        },
      ],
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
    return res.send({ projects });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.get('/projects/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
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
    return res.send({ project });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.post('/projects', verifyToken, async (req, res) => {
  try {
    const { stackIds, ...payload } = req.body;
    const project = await prisma.project.create({
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
    return res.send({ project });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.put('/projects/:projectId', verifyToken, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { stackIds, prevStackIds, ...payload } = req.body;
    const disconnectingStackIds = prevStackIds.filter(
      (id) => stackIds.indexOf(id) === -1
    );
    const project = await prisma.project.update({
      where: {
        id: projectId,
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
    return res.send({ project });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.delete('/projects/:projectId', verifyToken, async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await prisma.project.delete({
      where: {
        id: projectId,
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
    return res.send({ project });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

export { router as projects };
