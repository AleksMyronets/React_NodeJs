import express from 'express';
import controllers from '../controllers/users-controllers.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  userLoginSchema,
  userSignupSchema,
} from '../joiSchemas/userValidation.js';
import { validateBody } from '../middlewares/validateBody.js';

const userRouter = express.Router();

userRouter.post('/signup', validateBody(userSignupSchema), controllers.signUp);

userRouter.post('/login', validateBody(userLoginSchema), controllers.login);

userRouter.post('/logout', authenticate, controllers.logout);

userRouter.get('/current', authenticate, controllers.getCurrentUser);

export default userRouter;
