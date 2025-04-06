import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  const decoded: any = jwt.decode(token);
  console.log(decoded);

  if (!decoded || !decoded.exp) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const now = Math.floor(Date.now() / 1000);

  if (decoded.exp < now) {
    res.status(401).json({ data: null, message: 'Token expired' });
    return;
  }

  next();
};