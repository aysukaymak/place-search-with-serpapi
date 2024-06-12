import { getJson } from "serpapi";
import dotenv from 'dotenv';

dotenv.config();

const apiKey = `${process.env.SERPAPI_API_KEY}`;

async function findEvents(query) {
    try {
        const params = {
            api_key: apiKey,
            engine: "google",
            q: `Events in ${query}`,
            google_domain: "google.com",
            gl: "us",
            hl: "en"
        };
        const json = await getJson(params);
        console.log(params);        
        console.log(json.events_results);
        return json.events_results;
    } catch (error) {
        console.error("Error finding events:", error);
        throw error;
    }
}

async function events(query) {
    try {
        return await findEvents(query);
    } catch (error) {
        console.error("Error in events function:", error);
        throw error;
    }
}

export { events };
