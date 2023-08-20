import User from '../db/models/userModels.js';
import jwt from 'jsonwebtoken';
const { SECRET_KEY } = process.env;
import fs from 'fs/promises';
import path from 'path';
import gravatar from 'gravatar';

const replaceSpacesWithUnderscores = (filename) => {
  return filename.replace(/\s+/g, '_');
};

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({ message: 'Email in use' });
      return;
    }

    const avatarURL = gravatar.url(email, { s: '200', r: 'pg', d: 'mp' });
    const newUser = new User({ name, email, password, avatarURL });
    await newUser.hashPassword(password);

    await newUser.save();

    const payload = {
      id: newUser._id,
    };

    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(newUser._id, { token });

    res.status(201).json({
      token,
      user: { name, email, avatarURL },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res, next) => {
  const errorMessage = 'Email or password is wrong';
  const { email, password } = req.body;
  const searchedUser = await User.findOne({ email });
  if (!searchedUser) {
    res.status(401).json({ message: errorMessage });
    return;
  }

  const compareResult = await searchedUser.comparePassword(password);

  if (!compareResult) {
    res.status(401).json({ message: errorMessage });
    return;
  }

  const payload = {
    id: searchedUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(searchedUser._id, { token });

  res.json({
    token,
    user: {
      name: searchedUser.name,
      email,
      avatarURL: searchedUser.avatarURL,
    },
  });
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });

    res.status(204).send();
  } catch (error) {}
};

const getCurrentUser = async (req, res, next) => {
  const { name, email, avatarURL } = req.user;

  res.json({ name, email, avatarURL });
};

const changeAvatar = async (req, res, next) => {
  try {
    console.log(req.file);
    const { _id } = req.user;
    const { path: tempDir, originalname } = req.file;

    const normalizedName = replaceSpacesWithUnderscores(originalname);

    const uniqueFileName = `${_id}-${normalizedName}`;
    const avatarsPath = path.resolve('public', 'avatars');
    const resultPath = path.join(avatarsPath, uniqueFileName);

    await fs.rename(tempDir, resultPath);

    const avatarURL = path.join('avatars', uniqueFileName);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatar: avatarURL,
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  signUp,
  login,
  logout,
  getCurrentUser,
  changeAvatar,
};
