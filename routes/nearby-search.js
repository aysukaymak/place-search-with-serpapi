import { getJson } from "serpapi";
import dotenv from 'dotenv';

dotenv.config();

const apiKey = `${process.env.SERPAPI_API_KEY}`;

async function searchPlaces(latlong) {
    try {
        const params = {
            engine: "google_maps",
            q: "pizza",
            ll: `@${latlong},15.1z`,
            type: "search",
            api_key: apiKey
        };
        const json = await getJson(params);
        console.log(params);        
        console.log(json.local_results);
        return json.local_results;
    } catch (error) {
        console.error("Error searching places:", error);
        throw error;
    }
}

async function nearbySearch(latlong) {
    try {
        return await searchPlaces(latlong);
    } catch (error) {
        console.error("Error in nearbySearch function:", error);
        throw error;
    }
}

export { nearbySearch };