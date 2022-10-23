import * as express from 'express';

import { prisma } from '@api/configs/db';

export const router = express.Router();

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

router.post('/stacks', async (req, res) => {
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

router.put('/stacks/:stackId', async (req, res) => {
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

router.delete('/stacks/:stackId', async (req, res) => {
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
