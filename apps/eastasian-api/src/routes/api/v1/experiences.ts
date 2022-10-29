import * as express from 'express';

import { prisma } from '@api/configs/db';
import { verifyToken } from '@api/middleware';

const router = express.Router();

router.get('/experiences', async (_req, res) => {
  try {
    const experiences = await prisma.experience.findMany();
    return res.send({ experiences });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.get('/experiences/:experienceId', async (req, res) => {
  try {
    const { experienceId } = req.params;
    const experience = await prisma.experience.findUnique({
      where: {
        id: experienceId,
      },
    });
    return res.send({ experience });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.post('/experiences', verifyToken, async (req, res) => {
  try {
    const { title, body, profileId } = req.body;
    const experience = await prisma.experience.create({
      data: {
        title,
        body,
        profileId,
      },
    });
    return res.send({ experience });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.put('/experiences/:experienceId', verifyToken, async (req, res) => {
  try {
    const { experienceId } = req.params;
    const { title, body, profileId } = req.body;
    const experience = await prisma.experience.update({
      where: {
        id: experienceId,
      },
      data: {
        title,
        body,
        profileId,
      },
    });
    return res.send({ experience });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.delete('/experiences/:experienceId', verifyToken, async (req, res) => {
  try {
    const { experienceId } = req.params;
    const experience = await prisma.experience.delete({
      where: {
        id: experienceId,
      },
    });
    return res.send({ experience });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

export { router as experiences };
