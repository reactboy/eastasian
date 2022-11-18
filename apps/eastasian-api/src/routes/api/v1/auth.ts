import * as express from 'express';

import { supabaseAdmin } from '@api/configs/supabase';
import { prisma } from '@api/configs/db';
import { verifyToken } from '@api/middleware';

const router = express.Router();

router.post('/auth/signup', async (req, res) => {
  try {
    const { email, password, name, nameJp } = req.body;
    const { data: authUser, error } = await supabaseAdmin.auth.admin.createUser(
      {
        email,
        password,
        email_confirm: true,
      }
    );

    if (error) throw new Error(error.message);

    const profile = await prisma.profile.create({
      data: {
        id: authUser.user.id,
        name,
        nameJp,
      },
    });

    return res.send({ profile });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.post('/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data: authUser, error } =
      await supabaseAdmin.auth.signInWithPassword({
        email,
        password,
      });

    if (error) return res.status(500).send({ error });

    const profile = await prisma.profile.findUnique({
      where: {
        id: authUser.user.id,
      },
    });
    return res.send({ profile, authUser });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.post('/auth/signout', async (req, res) => {
  try {
    const { access } = req.cookies;
    const response = await supabaseAdmin.auth.admin.signOut(access);
    return res.send({ isSignout: true, response });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

router.post('/auth/authorize', verifyToken, async (req, res) => {
  try {
    return res.send({ user: req.user });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

export { router as auth };
