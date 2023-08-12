export const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    res.status(400).json({ message: 'missing fields' });
    return;
  }
  next();
};
