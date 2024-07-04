import { getJson } from "serpapi";
import dotenv from 'dotenv';

dotenv.config();

const apiKey = '75a62c2e63ee69e3bb72148cfbe22b2831ea617e1e3cbfa9751cfd47fbd6fccd';

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
        const image_list = json.inline_images ? json.inline_images.map(item => item.original).filter(url => url.endsWith('jpeg') || url.endsWith('png') || url.endsWith('jpg') || url.endsWith('webp'))
            : json.knowledge_graph?.header_images ? json.knowledge_graph.header_images.map(item => item.image).filter(url => url.endsWith('jpeg') || url.endsWith('png') || url.endsWith('jpg') || url.endsWith('webp'))
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
