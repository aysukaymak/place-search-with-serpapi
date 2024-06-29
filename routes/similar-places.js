import dotenv from 'dotenv';

import nearbySearch from './nearby-search.js';

dotenv.config();

async function similarPlaces(latlong, query, city) {
    //query is the type of the place
    //it come from front end when user click on a place it will send the type of the place
    try {
        return await nearbySearch(latlong, query, city);
    } catch (error) {
        console.error("Error in nearbySearch function:", error);
        throw error;
    }
}

export { similarPlaces };
