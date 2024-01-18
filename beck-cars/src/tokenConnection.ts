import jwt from 'jsonwebtoken';

export const checkToken = (token: string) => {
  if (process.env.JWT_SECRET) {
    jwt.verify(token, process.env.JWT_SECRET);
  }
};
