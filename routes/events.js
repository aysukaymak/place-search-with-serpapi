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
        return json.events_results;
    } catch (error) {
        console.error("Error finding events:", error);
        throw error;
    }
}

async function events(query) {
    try {
        const events = await findEvents(query);
        for (const event of events) {
            const images = await inlineImages(event.title, query);
            event.images = images;
        }
        console.log(events);
        return events;
    } catch (error) {
        console.error("Error in events function:", error);
        throw error;
    }
}

export { events };
