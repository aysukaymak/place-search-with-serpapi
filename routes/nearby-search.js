import { getJson } from "serpapi";
import dotenv from 'dotenv'

dotenv.config(); // Load environment variables

// search places with keywords and location
async function searchPlaces(latlong) {
    try {
        console.log(process.env.SERPAPI_API_KEY)
        getJson({
            engine: "google_maps",
            q: "pizza",
            ll: `${latlong},15.1z`,
            type: "search",
            api_key: "c8ee9205d74b180c569192152996a97e89b34333ecbfd52556b325edfcce1f5a"
        }, (json) => {
            console.log(json["local_results"]);
        });
    } catch (error) {
        console.log("Error searching places:", error);
        throw error;
    }
}

async function nearbySearch(latlong) {
    try {
        await searchPlaces(latlong);
    } catch (error) {
        console.log("Error in main function:", error);
    }
}

export { nearbySearch };
