import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import connectDB from '../scripts/db-connection.js';
import User from '../database-models/user.js';
import PlaceList from '../database-models/place-list.js';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

function getRandomInt() {
    return Math.floor(Math.random() * (1000000)) + 1;
}

async function register(req) {
    const db = await connectDB();
    const { user_name, password, email, phone, city } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = getRandomInt();
    const placeListId = getRandomInt();

    // Create a new user
    const newUser = new User({
        user_id: userId,
        user_name,
        password: hashedPassword,
        email,
        phone,
        city,
    });

    try {
        const result = await db.collection('users').insertOne(newUser);
        const newPlaceList = new PlaceList({
            list_id: placeListId,
            user_id: newUser._id,  
            visited_place_list: [],
            fav_place_list: []
        });
        await db.collection('place-lists').insertOne(newPlaceList);
        newUser.place_list_id = newPlaceList._id;
        await db.collection('users').updateOne({user_id: userId}, {$set: {place_list_id: newPlaceList._id}});
        return { status: 'User registered', userId: result.insertedId };
    } catch (error) {
        return { status: 'Error', error: error.message };
    }
}


async function login(req) {
    const db = await connectDB();
    const { user_name, password } = req.body;

    try {
        const user = await db.collection('users').findOne({ user_name });
        if (!user) {
            return { status: 'error', message: 'User not found' };
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return { status: 'error', message: 'Invalid credentials' };
        }

        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
        return { status: 'success', message: 'Login successful', token };
    } catch (error) {
        return { status: 'error', message: error.message };
    }
}


export { register, login };