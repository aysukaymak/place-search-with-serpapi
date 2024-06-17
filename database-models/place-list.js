// models/place-list.js
import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        long: { type: Number, required: true }
    },
    address: { type: String, required: true }
});

const PlaceList = new mongoose.Schema({
    list_id: { type: Number, required: true, unique: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to user
    visited_place_list: [placeSchema],
    fav_place_list: [placeSchema]
});

export default mongoose.model('PlaceList', PlaceList);
