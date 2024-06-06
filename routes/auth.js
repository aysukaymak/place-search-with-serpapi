import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import connectDB from '../scripts/db-connection.js';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

async function register(req, res) {
    const db = await connectDB();
    const { username, email, password } = req;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, email, password: hashedPassword };

    try {
        const result = await db.collection('users').insertOne(user);
        res.status(200).json({ status: 'User registered', userId: result.insertedId });
    } catch (error) {
        res.status(500).json({ status: 'Error', error: error.message });
    }
}

async function login(req, res) {
    const db = await connectDB();
    const { username, password } = req;

    try {
        const user = await db.collection('users').findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
            res.status(200).json({ status: 'Login successful', token });
        } else {
            res.status(401).json({ status: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ status: 'Error', error: error.message });
    }
}

export { register, login };
