import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

import { register, login } from './routes/auth.js';
import { addVisitedPlace, addFavPlace } from './routes/user-place-lists.js';
import { nearbySearch } from './routes/nearby-search.js';
import { reverseGeocode } from './routes/reverse-geocode.js';
import { events } from './routes/events.js';
import { popularDestinations } from './routes/popular-destinations.js';

dotenv.config();

const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/register', async (req, res) => {
    const response = await register(req.body);
    res.status(200).json(response);
});

app.post('/login', async (req, res) => {
    const response = await login(req.body);
    res.status(200).json(response);
});

app.post('/add-visited-place', async (req, res) => {
    const response = await addVisitedPlace(req.body);
    res.status(200).json(response);
});

app.post('/add-fav-place', async (req, res) => {
    const response = await addFavPlace(req.body);
    res.status(200).json(response);
});

app.post('/search-places', async (req, res) => {
    const { latitude, longitude, query } = req.body;
    const latlong = `${latitude},${longitude}`;
    try {
        const results = await nearbySearch(latlong, query);
        res.status(200).json({ status: 'Search completed', results });
    } catch (error) {
        res.status(500).json({ status: 'Error', error: error.message });
    }
});

app.post('/find-events', async (req, res) => {
    const { latitude, longitude } = req.body;
    const city = await reverseGeocode(latitude, longitude);
    const eventsData = await events(city);
    res.status(200).json({ status: 'Events search completed', events: eventsData });
});

app.post('/find-popular', async (req, res) => {
    const { latitude, longitude } = req.body;
    const city = await reverseGeocode(latitude, longitude);
    const destinationsData = await popularDestinations(city);
    res.status(200).json({ status: 'Popular destinations search completed', destinations: destinationsData });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
