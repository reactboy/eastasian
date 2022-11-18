export {};

type User = any;

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
