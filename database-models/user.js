// models/user.js
import mongoose from 'mongoose';

const User = new mongoose.Schema({
    user_id: { type: Number, required: true, unique: true },
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    place_list_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PlaceList' }  // Changed to a single reference
});

export default mongoose.model('User', User);
