import jwt from 'jsonwebtoken';

import User from '../db/models/userModels.js';

const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
  const errorMessage = 'Not authorized';
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    res.status(401).json({ message: errorMessage });
    return;
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const searchedUser = await User.findById(id);
    if (!searchedUser || !searchedUser.token || token !== searchedUser.token) {
      console.log('searchedUser');
      res.status(401).json({ message: errorMessage });
      return;
    }
    req.user = searchedUser;
    console.log(12345);
    next();
  } catch (error) {
    console.log('error:', error);
    res.status(401).json({ message: errorMessage });
    return;
  }
};
