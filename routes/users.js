import express from "express";

const userRouter = express.Router();

userRouter.post('/users/signup')

userRouter.post('/users/login')

userRouter.post('/users/logout')

userRouter.get('/users/current')

export default userRouter;

