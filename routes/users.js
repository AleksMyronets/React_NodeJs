import express from 'express';
import controllers from '../controllers/users-controllers.js';

const userRouter = express.Router();

//додати валідацію
userRouter.post('/signup', controllers.signUp);

userRouter.post('/login');

userRouter.post('/logout');

userRouter.get('/current');

export default userRouter;
