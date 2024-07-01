import dotenv from 'dotenv';
import { getJson } from "serpapi";

import { inlineImages } from './inline-images.js';

dotenv.config();

const apiKey = '1bdbcbdab82fcbf7cde3c0e6cebe3bfd8a33cc0e93c4b0870f098954ec21dd0c';

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
        return json.events_results || json.organic_results;
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
        //console.log('Events=', events);
        return events;
    } catch (error) {
        console.error("Error in events function:", error);
        throw error;
    }
}

export { events };
