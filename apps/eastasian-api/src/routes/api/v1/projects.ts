import * as express from 'express';

import { prisma } from '@api/configs/db';

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

router.post('/projects', async (req, res) => {
  try {
    const { title, body, profileId, stackIds } = req.body;
    const project = await prisma.project.create({
      data: {
        title,
        body,
        profileId,
        stacks: {
          connect: stackIds.map((stackId) => stackId),
        },
      },
    });
    return res.send({ project });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.put('/projects/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, body, profileId, stackIds } = req.body;
    const project = await prisma.project.update({
      where: {
        id: projectId,
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
    return res.send({ project });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.delete('/projects/:projectId', async (req, res) => {
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
