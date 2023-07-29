import User from '../db/models/userModels.js';
import jwt from 'jsonwebtoken';
const { SECRET_KEY } = process.env;

const signUp = async (req, res, next) => {
  console.log(User);
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({ message: 'Email in use' });
      return;
    }

    const newUser = new User({ name, email, password });
    await newUser.hashPassword(password);

    await newUser.save();

    const payload = {
      id: newUser._id,
    };

    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(newUser._id, { token });

    res.status(201).json({ user: { name, email } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  signUp,
};