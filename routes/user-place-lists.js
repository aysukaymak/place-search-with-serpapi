import { ObjectId } from 'mongodb';
import connectDB from '../scripts/db-connection.js';

async function addVisitedPlace(req, res) {
    const db = await connectDB();

    //_id refers to list id
    const { list_id, place } = req;

    try {
        const result = await db.collection('place-lists').updateOne(
            { list_id },
            { $push: { visited_place_list: place } }
        );
        res({ status: 'Visited place added', result });
    } catch (error) {
        res({ status: 'Error', error: error.message });
    }
}

async function addFavPlace(req, res) {
    const db = await connectDB();

    //_id refers to list id
    const { list_id, place } = req;

    try {
        const result = await db.collection('place-lists').updateOne(
            { list_id },
            { $push: { fav_place_list: place } }
        );
        res({ status: 'Favorite place added', result });
    } catch (error) {
        res({ status: 'Error', error: error.message });
    }
}

export { addVisitedPlace, addFavPlace };
