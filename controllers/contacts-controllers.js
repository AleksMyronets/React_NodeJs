import { Contact } from '../db/models/contactModels.js';

export const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const contacts = await Contact.find({ owner });

  res.json(contacts);
};

export const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

export const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  res.json(result);
};

export const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const existsContact = await Contact.findById(contactId);
  if (!existsContact) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    res.status(400).json({ message: 'Contact update failed' });
    return;
  }

  res.json(result);
};
