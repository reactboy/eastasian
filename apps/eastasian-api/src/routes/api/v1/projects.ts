import * as express from 'express';

import { prisma } from '@api/configs/db';
import { verifyToken } from '@api/middleware';

const router = express.Router();

router.get('/projects', async (_req, res) => {
  try {
    const projects = await prisma.project.findMany();
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
    });
    return res.send({ project });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.post('/projects', verifyToken, async (req, res) => {
  try {
    const project = await prisma.project.create({
      data: {
        ...req.body,
        profileId: req.user.id,
        stacks: {
          connect: (req.body.stackIds || []).map((stackId) => stackId),
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
    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        ...req.body,
        profileId: req.user.id,
        stacks: {
          connect: (req.body.stackIds || []).map((stackId) => stackId),
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
    });
    return res.send({ project });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

export { router as projects };
