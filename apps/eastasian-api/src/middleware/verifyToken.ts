import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { supabase } from '@api/configs/supabase';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { access } = req.cookies;
  if (!access) return res.status(401).send({ msg: 'Unauthorized' });
  const isVerified = jwt.verify(access, process.env['SUPABASE_JWT_KEY']);

  if (!isVerified) return res.status(401).send({ msg: 'Unauthorized' });

  const { data, error } = await supabase.auth.getUser(access);

  if (error) return res.status(500).send({ msg: 'internal server error' });

  req.user = data.user;
  next();
};
