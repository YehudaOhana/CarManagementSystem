import jwt from 'jsonwebtoken';

export const checkToken = (token: string) => {
  try {
    if (process.env.JWT_SECRET) {
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      return verify;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
