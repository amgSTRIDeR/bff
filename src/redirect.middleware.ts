import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { config } from 'dotenv';
config();

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('req.originalUrl', req.originalUrl.split('/'));
    if (req.originalUrl.split('/')[2] === 'products') {
      return res.redirect(process.env.PRODUCT_SERVICE_URL);
    } else if (req.originalUrl.split('/')[1] === 'cart') {
      return res.redirect(process.env.CART_SERVICE_URL);
    } else if (req.originalUrl.split('/')[1] === 'import') {
      return res.redirect(process.env.IMPORT_SERVICE_URL);
    } else {
      return res.status(502).json({ error: 'Cannot process request' });
    }
  }
}
