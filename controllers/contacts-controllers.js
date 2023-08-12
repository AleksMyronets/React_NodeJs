import { Contact } from '../db/models/contactModels.js';

export const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const contacts = await Contact.find({ owner });

  res.json({
    contacts,
  });
};
