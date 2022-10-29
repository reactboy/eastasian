import * as express from 'express';

import { prisma } from '@api/configs/db';
import { verifyToken } from '@api/middleware';

const router = express.Router();

router.get('/educations', async (_req, res) => {
  try {
    const educations = await prisma.education.findMany();
    return res.send({ educations });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.get('/educations/:educationId', async (req, res) => {
  try {
    const { educationId } = req.params;
    const education = await prisma.education.findUnique({
      where: {
        id: educationId,
      },
    });
    return { education };
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.post('/educations', verifyToken, async (req, res) => {
  try {
    const { title, body, profileId } = req.body;
    const education = await prisma.education.create({
      data: {
        title,
        body,
        profileId,
      },
    });
    return { education };
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.put('/educations/:educationId', verifyToken, async (req, res) => {
  try {
    const { educationId } = req.params;
    const { title, body } = req.body;

    const education = await prisma.education.update({
      where: {
        id: educationId,
      },
      data: {
        title,
        body,
      },
    });
    return res.send({ education });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.delete('/educations/:educationId', verifyToken, async (req, res) => {
  try {
    const { educationId } = req.params;
    const education = await prisma.education.delete({
      where: {
        id: educationId,
      },
    });
    return res.send({ education });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

export { router as educations };
