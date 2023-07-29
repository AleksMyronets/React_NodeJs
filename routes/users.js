import express from "express";
import controllers from '../controllers/users-controllers.js';

const userRouter = express.Router();

userRouter.post('/users/signup', controllers.singUp);

userRouter.post('/users/login')

userRouter.post('/users/logout')

userRouter.get('/users/current')

export default userRouter;

