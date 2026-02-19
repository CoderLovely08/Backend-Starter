import type { Logger } from 'winston';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id?: number | string;
        userType?: string;
        permissions?: string[];
      };
      logger?: Logger;
    }
  }
}

export {};
