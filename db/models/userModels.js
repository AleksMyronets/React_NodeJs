import { Schema, model } from "mongoose";

import bcrypt from 'bcrypt';

const userShema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: true
}, { versionKey: false })

userShema.methods.hashPassword = async function (password) {
    this.password = await bcrypt.hash(password, 10)
}

const User = model('user', userShema);

export default User;
