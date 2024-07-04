import dotenv from 'dotenv';
import { getJson } from "serpapi";

import { inlineImages } from './inline-images.js';

dotenv.config();

const apiKey = '75a62c2e63ee69e3bb72148cfbe22b2831ea617e1e3cbfa9751cfd47fbd6fccd'; 

async function findDestinations(query) {
    try {
        const params = {         
            engine: "google",
            q: `${query} Destinations`,
            api_key: apiKey
        };
        const json = await getJson(params);
        return json.top_sights.sights.slice(0, 5);;
    } catch (error) {
        console.error("Error finding destinations:", error);
    }
}

async function popularDestinations(query) {
    try {
        const destinations = await findDestinations(query);
        for (const destination of destinations) {
            const images = await inlineImages(destination.title, query);
            destination.images = images;
        }
        return destinations;
    } catch (error) {
        console.error("Error in popularDestinations function:", error);
    }
}

export { popularDestinations };
