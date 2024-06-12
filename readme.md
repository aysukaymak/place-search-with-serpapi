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
  "username": "testuser",
  "email": "test@example.com",
  "password": "password"
}
```
