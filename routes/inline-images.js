import { getJson } from "serpapi";
import dotenv from 'dotenv';

dotenv.config();

const apiKey = `${process.env.SERPAPI_API_KEY}`;

async function searchImages(query, city) {
    try {
        const params = {
            q: query,
            location: `${city}, Turkiye`,
            google_domain: "google.com",
            hl: "en",
            gl: "us",
            api_key: apiKey,
        };
        const json = await getJson(params);
        const image_list = json.inline_images.map(item => item.original);
        console.log(image_list);
        return image_list;
    } catch (error) {
        console.error("Error searching images:", error);
        throw error;
    }
}

async function inlineImages(query, city) {
    try {
        return await searchImages(query, city);
    } catch (error) {
        console.error("Error in inlineImages function:", error);
        throw error;
    }
}

export default { inlineImages };
