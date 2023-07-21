import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

class TokenValidations {
  static validateAuthentication(req: Request, res: Response, next: NextFunction): Response | void {
    try {
      const { authorization } = req.headers;
      if (!authorization) return res.status(401).json({ message: 'Token not found' });
      const data = authorization.split(' ');
      const decoded = jwt.verify(data[1], secret);
      res.locals.user = { decoded };
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default TokenValidations;
