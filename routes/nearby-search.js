import { getJson } from "serpapi";
import dotenv from 'dotenv';

import { inlineImages } from './inline-images.js';

dotenv.config();

const apiKey = '7c7e2b6f7a16407ff05688459ecaabb120929b829c54433c15e653ee0e8de942';

async function searchPlaces(latlong, query) {
    try {
        const params = {
            engine: "google_maps",
            q: 'Ankara',
            ll: '@39.91987,32.85427,15.1z',//`@${latlong},15.1z`,
            type: "search",
            api_key: apiKey
        };
        const json = await getJson(params);
        return json.local_results;
    } catch (error) {
        console.error("Error searching places:", error);
        throw error;
    }
}

async function nearbySearch(latlong, query, city) {
    try {
        const places = await searchPlaces(latlong, query);
        for (const place of places) {
            //const images = await inlineImages(place.title, 'Ankara');
            //place.images = images;
        }
        return places;
    } catch (error) {
        console.error("Error in nearbySearch function:", error);
        throw error;
    }
}

export { nearbySearch };
