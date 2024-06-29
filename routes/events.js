import dotenv from 'dotenv';
import { getJson } from "serpapi";

import { inlineImages } from './inline-images.js';

dotenv.config();

const apiKey = '7c7e2b6f7a16407ff05688459ecaabb120929b829c54433c15e653ee0e8de942';

async function findEvents(query) {
    try {
        const params = {
            api_key: apiKey,
            engine: "google",
            q: 'Events in Ankara', //`Events in ${query}`,
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
            const images = await inlineImages(event.title, 'Ankara');
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
