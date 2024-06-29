import { getJson } from "serpapi";
import dotenv from 'dotenv';

dotenv.config();

const apiKey = '7c7e2b6f7a16407ff05688459ecaabb120929b829c54433c15e653ee0e8de942';

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
        const image_list = json.inline_images ? json.inline_images.map(item => item.original)
            : json.knowledge_graph.header_images ? json.knowledge_graph.header_images.map(item => item.image)
                : [];
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

export { inlineImages };
