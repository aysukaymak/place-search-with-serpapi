import dotenv from 'dotenv';
import { getJson } from "serpapi";

import { inlineImages } from './inline-images.js';

dotenv.config();

const apiKey = '1bdbcbdab82fcbf7cde3c0e6cebe3bfd8a33cc0e93c4b0870f098954ec21dd0c';  // Use environment variable for API key

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
        return null;  // Return null or suitable default on error
    }
}

async function popularDestinations(query) {
    try {
        const destinations = await findDestinations(query);
        if (!destinations) throw new Error('Failed to fetch destinations');

        for (const destination of destinations) {
            const images = await inlineImages(destination.title, query);
            destination.images = images;
        }
        return destinations;
    } catch (error) {
        console.error("Error in popularDestinations function:", error);
        return [];  // Return an empty array or suitable default on error
    }
}

export { popularDestinations };
