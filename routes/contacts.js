import express from 'express';
import {
  addContact,
  deleteContact,
  getAll,
  updateContact,
} from '../controllers/contacts-controllers.js';
import { addContactSchema } from '../joiSchemas/contactValidation.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isEmptyBody } from '../middlewares/isEmptyBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = express.Router();

router.get('/', authenticate, getAll);

router.post(
  '/',
  authenticate,
  isEmptyBody,
  validateBody(addContactSchema),
  addContact
);

router.delete(
  '/:contactId',
  authenticate,
  isEmptyBody,
  isValidId,
  deleteContact
);

router.put(
  '/:contactId',
  authenticate,
  isEmptyBody,
  // isValidId, //Чому ця мідлвара спрацьовує на валідний ідентифікатор
  validateBody(addContactSchema),
  updateContact
);

export default router;
