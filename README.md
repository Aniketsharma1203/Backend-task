URL Shortener Web App API Documentation

Base URL
https://backend-task-uudr.onrender.com/

Endpoints
1. Create a Short URL
Method: POST
Endpoint: /shorten
Description: Creates a short URL for the given original URL.
Request Body
The request body must be a JSON object with the following field:

json
Copy code
{
  "originalUrl": "https://example.com"
}
originalUrl: The original URL to be shortened. This is a required field and must be a valid URL.
Responses
Success (201 Created):

json
Copy code
{
  "shortId": "5fbf33",
  "originalUrl": "https://example.com",
  "shortUrl": "https://backend-task-uudr.onrender.com//5fbf33"
}
Error (400 Bad Request): If the originalUrl is invalid or missing.

json
Copy code
{
  "error": "Invalid URL"
}
Error (500 Internal Server Error): If there’s an issue on the server.

json
Copy code
{
  "error": "Server error"
}

2. Redirect to Original URL
Method: GET
Endpoint: /:shortId
Description: Redirects the user to the original URL based on the given shortId.
Path Parameter
shortId: A string identifier of the shortened URL.
Example Request
sql
Copy code
GET /5fbf33
Responses
Success (302 Found): The request will automatically redirect to the original URL.

Example: Redirects to https://example.com.
Error (404 Not Found): If the shortId doesn’t exist.

json
Copy code
{
  "error": "Short URL not found"
}
Error (500 Internal Server Error): If there's an internal error.

json
Copy code
{
  "error": "Server error"
}


3. Get URL Details
Method: GET
Endpoint: /stats/:shortId
Description: Fetches the details of the original URL and creation time for a given shortId.
Path Parameter
shortId: The ID of the shortened URL.
Example Request
bash
Copy code
GET /details/5fbf33
Responses
Success (200 OK):

json
Copy code
{
  "shortId": "5fbf33",
  "originalUrl": "https://example.com",
  "createdAt": "2024-11-25T12:34:56Z"
}
Error (404 Not Found): If the shortId does not exist.

json
Copy code
{
  "error": "Short URL not found"
}
Error (500 Internal Server Error): If there's an issue on the server.

json
Copy code
{
  "error": "Server error"
}
Error Format
All errors from the API will return the following JSON format:

json
Copy code
{
  "error": "Error message"
}


Example Workflow
Shorten a URL:

POST Request: /shorten with the body:
json
Copy code
{
  "originalUrl": "https://example.com"
}
Response:
json
Copy code
{
  "shortId": "5fbf33",
  "originalUrl": "https://example.com",
  "shortUrl": "https://backend-task-uudr.onrender.com//5fbf33"
}
Redirect to Original URL:

GET Request: /5fbf33
The user will be redirected to https://example.com.
Get Details of the Shortened URL:

GET Request: /details/5fbf33
Response:
json
Copy code
{
  "shortId": "5fbf33",
  "originalUrl": "https://example.com",
  "createdAt": "2024-11-25T12:34:56Z"
}

Deployment Notes
Host: The app is deployed on Render and is accessible at https://backend-task-uudr.onrender.com/
MongoDB: MongoDB Atlas is used for database storage of original and short URLs.
Development & Testing
Local Testing: To test the app locally, clone the repository, set up the environment variable MONGO_URI to connect to MongoDB Atlas, and run the app using:

bash
Copy code
npm start
API Testing: Use Postman or curl to interact with the endpoints. Ensure the shortId exists before testing the redirect.

