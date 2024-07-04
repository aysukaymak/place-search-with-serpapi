import dotenv from 'dotenv';
import { getJson } from "serpapi";

import { inlineImages } from './inline-images.js';

dotenv.config();

const apiKey = 'c8ee9205d74b180c569192152996a97e89b34333ecbfd52556b325edfcce1f5a';

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
        return json.events_results.slice(0, 3) || json.organic_results.slice(0, 3);
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
        return events;
    } catch (error) {
        console.error("Error in events function:", error);
        throw error;
    }
}

export { events };
