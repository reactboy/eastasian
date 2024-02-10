import * as express from 'express';

import { prisma } from '@api/configs/db';
import { verifyToken } from '@api/middleware';

const router = express.Router();

router.get('/experiences', async (_req, res) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [
        {
          startDate: 'desc',
        },
      ],
    });
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
    const experience = await prisma.experience.create({
      data: {
        ...req.body,
        profileId: req.user.id,
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
    const experience = await prisma.experience.update({
      where: {
        id: experienceId,
      },
      data: {
        ...req.body,
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
