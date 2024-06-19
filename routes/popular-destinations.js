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
        const json = await getJson(params);
        console.log(params);        
        console.log(json.top_sights);
        return json.top_sights;
    } catch (error) {
        console.error("Error finding destinations:", error);
        throw error;
    }
}

async function popularDestinations(query) {
    try {
        return await findDestinations(query);
    } catch (error) {
        console.error("Error in destinations function:", error);
        throw error;
    }
}

export { popularDestinations };
