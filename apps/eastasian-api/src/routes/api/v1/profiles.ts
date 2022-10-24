import * as express from 'express';

import { prisma } from '@api/configs/db';

const router = express.Router();

router.get('/profiles', async (_req, res) => {
  try {
    const profiles = await prisma.profile.findMany();
    return res.send({
      profiles,
    });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.get('/profiles/:profileId', async (req, res) => {
  try {
    const { profileId } = req.params;
    const profile = await prisma.profile.findUnique({
      where: {
        id: profileId,
      },
    });
    return res.send({
      profile,
    });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.post('/profiles', async (req, res) => {
  try {
    const { name, nameJp, profileImage = '' } = req.body;
    const profile = await prisma.profile.create({
      data: {
        name,
        nameJp,
        profileImage,
      },
    });
    return res.send({
      profile,
    });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.put('/profiles/:profileId', async (req, res) => {
  try {
    const { profileId } = req.params;
    const { name, nameJp, profileImage = '' } = req.body;
    const profile = await prisma.profile.update({
      where: {
        id: profileId,
      },
      data: {
        name,
        nameJp,
        profileImage,
      },
    });
    return res.send({
      profile,
    });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.delete('/profiles/:profileId', async (req, res) => {
  try {
    const { profileId } = req.params;
    const stack = await prisma.profile.delete({
      where: {
        id: profileId,
      },
    });
    return res.send({ stack });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

export { router as profiles };
