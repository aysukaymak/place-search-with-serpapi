import { getJson } from "serpapi";
import dotenv from 'dotenv';

dotenv.config();

const apiKey = `${process.env.SERPAPI_API_KEY}`;

async function findDestinations(query) {
    try {
        const params = {         
            engine: "google",
            q: `${query} Destinations`,
            api_key: apiKey
        };
        console.log(params);
        const json = await getJson(params);
        return json.top_sights;
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
        console.log(destinations);
        return destinations;
    } catch (error) {
        console.error("Error in destinations function:", error);
        throw error;
    }
}

export { popularDestinations };
