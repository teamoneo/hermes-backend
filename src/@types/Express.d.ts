declare namespace Express {
  export interface Request {
    store: 'ml' | 'am' | 'ml_default' | 'amz';
  }
}
