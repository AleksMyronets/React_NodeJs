import express from 'express';
import { getAll } from '../controllers/contacts-controllers.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/', authenticate, getAll);

router.post('/');

router.delete('/:contactId');

router.put('/:contactId');

export default router;
