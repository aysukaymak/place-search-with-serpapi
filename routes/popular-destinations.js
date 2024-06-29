import dotenv from 'dotenv';
import { getJson } from "serpapi";

import { inlineImages } from './inline-images.js';

dotenv.config();

const apiKey = '7c7e2b6f7a16407ff05688459ecaabb120929b829c54433c15e653ee0e8de942';

async function findDestinations(query) {
    try {
        const params = {         
            engine: "google",
            q: `${query} Destinations`,
            api_key: apiKey
        };
        const json = await getJson(params);
        return json.top_sights.sights;
    } catch (error) {
        console.error("Error finding destinations:", error);
        throw error;
    }
}

async function popularDestinations(query) {
    try {
        const destinations = await findDestinations(query);
        for (const destination of destinations) {
            const images = await inlineImages(destination.title, query);
            destination.images = images;
        }
        //console.log('Destinations=', destinations);
        return destinations;
    } catch (error) {
        console.error("Error in destinations function:", error);
        throw error;
    }
}

export { popularDestinations };
