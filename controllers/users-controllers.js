import User from '../db/models/userModels.js';

import jwt from 'jsonwebtoken';

const { SECRET_KEY } = process.env;

const singUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.status(409).json({message: 'Email in use'});
            const newUser = new User({ name, email, password });
            newUser.hashPassword(password);

            await newUser.save();

            const payload = {
                id: newUser._id,
            };

            const token = jwt.sing(payload, SECRET_KEY);

            await newUser.findByIdAndUpdate(newUser._id, { token });
            
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.massege });
    }
}

export default {
    singUp,
};