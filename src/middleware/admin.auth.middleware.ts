import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Token is missing',
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      req['user'] = payload;

      if (payload.role !== 'admin') {
        return res.status(403).json({
          message: 'Access denied',
        });
      }

      next();
    } catch (err) {
      console.log(err);

      return res.status(401).json({
        message: 'Invalid or expired token',
      });
    }
  }
}
