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

async function register(req, res) {
    const db = await connectDB();
    const { user_name, password, email, phone, city } = req;

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
        res({ status: 'User registered', userId: result.insertedId });
    } catch (error) {
        res({ status: 'Error', error: error.message });
    }

    // Create a new place list and reference the user
    const newPlaceList = new PlaceList({
        list_id: placeListId,
        user_id: newUser._id,  
        visited_place_list: [],
        fav_place_list: []
    });
    try {
        await db.collection('place-lists').insertOne(newPlaceList);
        console.log('User\'s place list inserted successfully!');
    } catch (err) {
        console.error('Error inserting new place list:', err);
    }

    // Set the place list reference in the user
    newUser.place_list_id = newPlaceList._id;
    try {
        await db.collection('users').updateOne({user_id: userId}, newUser);
        console.log('A place list assigned to new user successfully!');
    } catch (err) {
        console.error('Error updated new user:', err);
    }
}

async function login(req, res) {
    const db = await connectDB();
    const { user_name, password } = req;

    try {
        const user = await db.collection('users').findOne({ user_name });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id }, jwtSecret);
            res({ status: 'Login successful', token });
        } else {
            res({ status: 'Invalid credentials' });
        }
    } catch (error) {
        res({ status: 'Error', error: error.message });
    }
}

export { register, login };
