import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { config } from 'dotenv';
config();

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl === '/product') {
      return res.redirect(process.env.PRODUCT_SERVICE_URL);
    } else if (req.originalUrl === '/cart') {
      return res.redirect(process.env.CART_SERVICE_URL);
    } else {
      next();
    }
  }
}
