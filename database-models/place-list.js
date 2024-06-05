// models/place-list.js
const placeListSchema = {
    list_id:Number,
    user_id: Number,
    visited_place_list: [{
        name: String,
        city: String,
        location: {
            lat: Number,
            long: Number
        },
        address: String
    }],
    fav_place_list: [{
        name: String,
        city: String,
        location: {
            lat: Number,
            long: Number
        },
        address: String
    }]
  };
  
  export default placeListSchema;  
