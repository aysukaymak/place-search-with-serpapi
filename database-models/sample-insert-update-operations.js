import mongoose from 'mongoose';
import dotenv from 'dotenv';

import connectDB from '../scripts/db-connection.js';
import User from './user.js';
import PlaceList from './place-list.js';

dotenv.config();

async function createData() {
    try {
        const db = await connectDB();

        // Create a new user
        const newUser = new User({
            user_id: 1,
            user_name: 'John Doe',
            password: 'password123',
            email: 'john.doe@example.com',
            phone: '123-456-7890',
            city: 'New York',
        });
        try {
            await db.collection('users').insertOne(newUser);
            console.log('New user inserted successfully!');
        } catch (err) {
            console.error('Error inserting new user:', err);
        }
        
        // Create a new place list and reference the user
        const newPlaceList = new PlaceList({
            list_id: 1,
            user_id: newUser._id,  // Referencing the User
            visited_place_list: [{
                name: 'Central Park',
                city: 'New York',
                location: { lat: 40.785091, long: -73.968285 },
                address: 'New York, NY 10024'
            }],
            fav_place_list: [{
                name: 'Times Square',
                city: 'New York',
                location: { lat: 40.758896, long: -73.985130 },
                address: 'Manhattan, NY 10036'
            }]
        });
        try {
            await db.collection('place-lists').insertOne(newPlaceList);
            console.log('New place list inserted successfully!');
        } catch (err) {
            console.error('Error inserting new place list:', err);
        }

        // Set the place list reference in the user
        newUser.place_list_id = newPlaceList._id;
        try {
            await db.collection('users').updateOne({user_id:1}, newUser);
            console.log('New user updated successfully!');
        } catch (err) {
            console.error('Error updated new user:', err);
        }
    } catch (err) {
        console.error('Error creating data:', err);
    } finally {
        mongoose.connection.close();
    }
}

createData().catch(err => console.error(err));
