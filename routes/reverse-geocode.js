import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

async function reverseGeocode(latitude, longitude) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'OK') {
            const results = data.results;
            for (const result of results) {
                if (result.types.includes('locality')) {
                    return result.address_components[0].long_name;
                }
            }
        }
        return null;
    } catch (error) {
        console.error('Error during reverse geocoding:', error);
        return null;
    }
}

export { reverseGeocode };
