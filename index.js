import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import { register, login } from './routes/auth.js';
import { nearbySearch } from './routes/nearby-search.js';
import { reverseGeocode } from './routes/reverse-geocode.js';
import { events } from './routes/events.js';
import { popularDestinations } from './routes/popular-destinations.js';

dotenv.config();

const port = process.env.PORT || 3000;

// Helper function to serve static files
const serveStaticFile = (res, filePath, contentType, responseCode = 200) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
};

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;
    const method = req.method;

    if (pathName === '/register' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const data = JSON.parse(body);
            await register(data, (response) => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(response));
            });
        });
    } else if (pathName === '/login' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const data = JSON.parse(body);
            await login(data, (response) => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(response));
            });
        });
    } else if (pathName === '/search-places' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const { latitude, longitude, query } = JSON.parse(body);

            if (latitude && longitude && query) {
                const latlong = `${latitude},${longitude}`;
                try {
                    const results = await nearbySearch(latlong, query);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'Search completed', results }));
                } catch (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'Error', error: error.message }));
                }
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'Bad Request: Missing parameters' }));
            }
        });
    } else if (pathName === '/find-events' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const { latitude, longitude } = JSON.parse(body);

            if (latitude && longitude) {
                // Use reverse geocoding to find the city name
                const city = await reverseGeocode(latitude, longitude);
                const eventsData = await events(city);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'Events search completed', events: eventsData }));
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'Bad Request: Missing parameters' }));
            }
        });
    } else if (pathName === '/find-popular' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const { latitude, longitude } = JSON.parse(body);

            if (latitude && longitude) {
                // Use reverse geocoding to find the city name
                const city = await reverseGeocode(latitude, longitude);
                const destinationsData = await popularDestinations(city);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'Popular destinations search completed', destinations: destinationsData }));
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'Bad Request: Missing parameters' }));
            }
        });
    } else if (pathName === '/' && method === 'GET') {
        // Serve the index.html file
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        serveStaticFile(res, path.join(__dirname, 'public', 'index.html'), 'text/html');
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'Not Found' }));
    }
});

server.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
