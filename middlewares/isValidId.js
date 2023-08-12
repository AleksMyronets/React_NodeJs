import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  console.log(isValidObjectId(contactId));
  if (!isValidObjectId(contactId)) {
    res.status(404).json({ message: `${contactId} is not valid id` });
    return;
  }
  next();
};
