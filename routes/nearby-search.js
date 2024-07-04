import { getJson } from "serpapi";
import dotenv from 'dotenv';

import { inlineImages } from './inline-images.js';

dotenv.config();

const apiKey = 'c8ee9205d74b180c569192152996a97e89b34333ecbfd52556b325edfcce1f5a';

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
