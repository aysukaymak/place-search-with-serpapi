import { ObjectId } from 'mongodb';
import connectDB from '../scripts/db-connection.js';

async function addVisitedPlace(req, res) {
    const db = await connectDB();

    const { list_id, place } = req.body;

    try {
        const result = await db.collection('place-lists').updateOne(
            { list_id: ObjectId(list_id) },
            { $push: { visited_place_list: place } }
        );
        res.status(200).json({ status: 'Visited place added', result });
    } catch (error) {
        res.status(500).json({ status: 'Error', error: error.message });
    }
}

async function addFavPlace(req, res) {
    const db = await connectDB();

    console.log('Request Body in addFavPlace:', req.body); // Gelen isteğin gövdesini konsola yazdır

    const { list_id, place } = req.body;

    if (!list_id || !place) {
        return res.status(400).json({ status: 'error', message: 'Missing list_id or place in request body' });
    }

    try {
        const result = await db.collection('place-lists').updateOne(
            { list_id: list_id }, // list_id'yi ObjectId olarak değil, doğrudan sayı olarak kullanın
            { $push: { fav_place_list: place } }
        );
        console.log('Database update result:', result); // Veritabanı güncelleme sonucunu konsola yazdır
        res.status(200).json({ status: 'Favorite place added', result });
    } catch (error) {
        console.error('Error in addFavPlace function:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
}


export { addVisitedPlace, addFavPlace };
