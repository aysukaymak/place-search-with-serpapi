- Environment Variables, to set up the necessary environment variables for this project:
  - Run the command `cp .env.example .env` to create a copy of the `.env` file. 
  - Open the `.env` file and fill in the required values.
  
- For project dependencies, run install-dependencies script
    ```
    node scripts\install-dependencies.js
    ```
- Running project with
    ```
    npm start
    ```

## API Endpoints

You can access the Postman Collection from [here](https://www.postman.com/aysukaymak/workspace/city-guide/collection/28631208-77252557-57e4-440b-a058-a47110cf0ee6?action=share&creator=28631208).

### Login

**Endpoint**: `/login`

**Method**: `POST`

**URL**: `http://localhost:3000/login`

**Request Headers**:
- `Cache-Control: no-cache`
- `Postman-Token: <calculated when request is sent>`
- `Content-Type: application/json`
- `Content-Length: <calculated when request is sent>`
- `Host: <calculated when request is sent>`
- `User-Agent: PostmanRuntime/7.32.1`
- `Accept: */*`
- `Accept-Encoding: gzip, deflate, br`
- `Connection: keep-alive`

**Request Body (JSON)**:
```json
{
  "username": "testuser",
  "password": "password"
}
```

### Register

**Endpoint**: `/register`

**Method**: `POST`

**URL**: `http://localhost:3000/register`

**Request Headers**:
- `Cache-Control: no-cache`
- `Postman-Token: <calculated when request is sent>`
- `Host: <calculated when request is sent>`
- `User-Agent: PostmanRuntime/7.32.1`
- `Accept: */*`
- `Accept-Encoding: gzip, deflate, br`
- `Connection: keep-alive`
- `Content-Type: application/json`

**Request Body (JSON)**:
```json
{
  "user_name": "testuser",
  "password": "password",
  "email": "test@example.com",
  "phone": "12345667",
  "city": "Ankara"
}
```

### Add Fav Places

**Endpoint**: `/add-fav-place`

**Method**: `POST`

**URL**: `http://localhost:3000/add-fav-place`

**Request Headers**:
- `Cache-Control: no-cache`
- `Postman-Token: <calculated when request is sent>`
- `Host: <calculated when request is sent>`
- `User-Agent: PostmanRuntime/7.32.1`
- `Accept: */*`
- `Accept-Encoding: gzip, deflate, br`
- `Connection: keep-alive`
- `Content-Type: application/json`

**Request Body (JSON)**:
```json
{
  "list_id": 1785,
  "place": {
    "name": "Central Park",
    "city": "New York",
    "location": {
      "lat": 40.785091,
      "long": -73.968285
    },
    "address": "New York, NY 10024, USA"
  }
}
```

### Add Visited Places

**Endpoint**: `/add-visited-place`

**Method**: `POST`

**URL**: `http://localhost:3000/add-visited-place`

**Request Headers**:
- `Cache-Control: no-cache`
- `Postman-Token: <calculated when request is sent>`
- `Host: <calculated when request is sent>`
- `User-Agent: PostmanRuntime/7.32.1`
- `Accept: */*`
- `Accept-Encoding: gzip, deflate, br`
- `Connection: keep-alive`
- `Content-Type: application/json`

**Request Body (JSON)**:
```json
{
  "list_id": 1785,
  "place": {
    "name": "Central Park",
    "city": "New York",
    "location": {
      "lat": 40.785091,
      "long": -73.968285
    },
    "address": "New York, NY 10024, USA"
  }
}
```
