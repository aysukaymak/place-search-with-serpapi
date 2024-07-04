import { getJson } from "serpapi";
import dotenv from 'dotenv';

import { inlineImages } from './inline-images.js';

dotenv.config();

const apiKey = '75a62c2e63ee69e3bb72148cfbe22b2831ea617e1e3cbfa9751cfd47fbd6fccd';

async function searchPlaces(latlong, query) {
    try {
        const params = {
            engine: "google_maps",
            q: query,
            ll: `@${latlong},15.1z`,
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
            const images = await inlineImages(place.title, city);
            place.images = images;
        }
        return places;
    } catch (error) {
        console.error("Error in nearbySearch function:", error);
        throw error;
    }
}

export { nearbySearch };
