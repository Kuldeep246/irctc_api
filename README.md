# IRCTC Clone - Technical Documentation
## 1. Project Overview
### Purpose
This project is a simplified version of the IRCTC system. It allows users to register, log in, book train seats, and cancel bookings. Administrators can manage train schedules.
### Key Features
*   **User Authentication:** User registration and login.
*   **Admin Authentication:** Admin registration and login with elevated privileges.
*   **Train Management:**  Administrators can add, update, and delete train schedules.
*   **Booking Management:** Users can book and cancel train seats.
*   **API Key Protection:** Admin routes are protected by an API key.
### Supported Platforms/Requirements
*   Node.js (v14 or higher)
*   MySQL Database
*   npm (Node Package Manager)
## 2. Getting Started
### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Kuldeep246/irctc_api.git
    
2.  **Install dependencies:**
    ```bash
    npm install
    
3.  **Configure environment variables:**
    *   Create a `.env` file in the root directory.
    *   Add the following variables, replacing the placeholders with your actual values:
        SQL_PASSWORD=<your_mysql_password>
        JWT_SECRET=<your_jwt_secret>
        API_KEY=<your_api_key>
        PORT=5000
        *   `SQL_PASSWORD`: The password for your MySQL root user.
        *   `JWT_SECRET`: A secret key used for signing JSON Web Tokens (JWTs).  Choose a strong, random string.
        *   `API_KEY`: An API key to protect admin routes.
        *   `PORT`: The port the server will listen on (defaults to 5000).
4.  **Initialize the database:**
    *   The application automatically creates the database and tables upon startup. Ensure your MySQL server is running.
### Dependencies
*   **bcryptjs:** For password hashing.
*   **body-parser:** For parsing request bodies.
*   **dotenv:** For loading environment variables from a `.env` file.
*   **express:** For creating the web server and handling routes.
*   **jsonwebtoken:** For creating and verifying JSON Web Tokens (JWTs).
*   **mysql2:** For connecting to the MySQL database.
## 3. Usage
1.  **Start the server:**
    ```bash
    node index.js
        This will start the server on the port specified in your `.env` file (or port 5000 if not specified).
2.  **Access the API:**
    The API endpoints are documented in the API Documentation section below.  You can use tools like `curl`, Postman, or Insomnia to interact with the API.
### Example: User Registration
```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "testuser", "password": "password123"}' http://localhost:5000/auth/register
```json
{
    "message": "User registered",
    "user": {
        "id": 1,
        "username": "testuser"
    }
}

## Key Components
*   **`index.js`:** The main entry point of the application. It sets up the Express server, middleware, and routes.
*   **`src/config/db.js`:**  Establishes the connection to the MySQL database and initializes the database schema (creates tables if they don't exist).
*   **`src/controllers/*`:** Contains the logic for handling API requests. Each controller corresponds to a specific resource (e.g., users, trains, bookings).
*   **`src/middlewares/*`:** Contains middleware functions that perform tasks such as authentication and API key validation.
*   **`src/routes/*`:** Defines the API routes and maps them to the corresponding controller functions.
## 5. API Documentation
### Authentication Routes (`/auth`)
*   **`POST /auth/register`:** Registers a new user.
    *   **Input:**
        ```json
        {
            "username": "string",
            "password": "string"
        }
            *   **Output (Success):**
        ```json
        {
            "message": "User registered",
            "user": {
                "id": "integer",
                "username": "string"
            }
        }
            *   **Output (Error):**
        ```json
        {
            "error": "username already in use"
        }
        *   **`POST /auth/login`:** Logs in an existing user.
    *   **Input:**
        ```json
        {
            "username": "string",
            "password": "string"
        }
            *   **Output (Success):**
        ```json
        {
            "token": "string",
            "user": {
                "id": "integer",
                "username": "string"
            }
        }
            *   **Output (Error):**
        ```json
        {
            "error": "Invalid credentials"
        }
        *   **`POST /auth/admin/register`:** Registers a new admin.
    *   **Input:**
        ```json
        {
            "username": "string",
            "password": "string"
        }
            *   **Output (Success):**
        ```json
        {
            "message": "Admin registered",
            "admin": {
                "id": "integer",
                "username": "string"
            }
        }
            *   **Output (Error):**
        ```json
        {
            "error": "username already in use"
        }
        *   **`POST /auth/admin/login`:** Logs in an existing admin.
    *   **Input:**
        ```json
        {
            "username": "string",
            "password": "string"
        }
            *   **Output (Success):**
        ```json
        {
            "token": "string"
        }
            *   **Output (Error):**
        ```json
        {
            "error": "Invalid credentials"
        }
        
### Admin Routes (`/admin`)
*   **`POST /admin/train`:** Adds a new train. Requires `x-api-key` header and admin authentication.
    *   **Input:**
        ```json
        {
            "train_number": "string",
            "source": "string",
            "destination": "string",
            "totalSeats": "integer",
            "availableSeats": "integer"
        }
            *   **Output (Success):**
        ```json
        {
            "message": "Train added successfully",
            "trainId": "integer"
        }
            *   **Output (Error):**
        ```json
        {
            "error": "string"
        }
        *   **`POST /admin/train/:id`:** Updates an existing train. Requires `x-api-key` header and admin authentication.
    *   **Input:**
        ```json
        {
            "train_number": "string",
            "source": "string",
            "destination": "string",
            "totalSeats": "integer",
            "availableSeats": "integer"
        }
            *   **Output (Success):**
        ```json
        {
            "message": "Train updated",
            "trainId": "integer"
        }
            *   **Output (Error):**
        ```json
        {
            "error": "string"
        }
        *   **`DELETE /admin/train/:id`:** Deletes a train. Requires `x-api-key` header and admin authentication.
    *   **Output (Success):**
        ```json
        {
            "message": "Train deleted successfully"
        }
            *   **Output (Error):**
        ```json
        {
            "error": "string"
        }
        
### Train Routes (`/trains`)
*   **`GET /trains`:** Gets all trains.
    *   **Output (Success):**
        ```json
        [
            {
                "id": "integer",
                "train_number": "string",
                "source": "string",
                "destination": "string",
                "total_seats": "integer",
                "available_seats": "integer"
            }
        ]
            *   **Output (Error):**
        ```json
        {
            "error": "string"
        }
        *   **`GET /trains/:id`:** Gets the available seats for a specific train.
    *   **Output (Success):**
        ```json
        {
            "available_seats": "integer"
        }
            *   **Output (Error):**
        ```json
        {
            "error": "string"
        }
        
### Booking Routes (`/bookings`)
*   **`POST /bookings/:trainId/book`:** Books seats on a train. Requires user authentication.
    *   **Input:**
        ```json
        {
            "seats": "integer"
        }
            *   **Output (Success):**
        ```json
        {
            "message": "Seat(s) booked successfully",
            "bookingId": "integer"
        }
            *   **Output (Error):**
        ```json
        {
            "error": "string"
        }
        *   **`DELETE /bookings/:bookingId`:** Cancels a booking. Requires user authentication.
    *   **Output (Success):**
        ```json
        {
            "message": "Booking canceled successfully"
        }
            *   **Output (Error):**
        ```json
        {
            "error": "string"
        }
        *   **`GET /bookings/:bookingId`:** Gets booking details. Requires user authentication.
    *   **Output (Success):**
        ```json
        {
            "id": "integer",
            "user_id": "integer",
            "train_id": "integer",
            "seats": "integer",
            "booking_time": "string"
        }
            *   **Output (Error):**
        ```json
        {
            "error": "string"
        }
        
### User Routes (`/user`)
*   **`GET /user/:id`:** Gets user details. Requires user authentication.
    *   **Output (Success):**
        ```json
        {
            "username": "string"
        }
            *   **Output (Error):**
        ```json
        {
            "error": "string"
        }
        *   **`GET /user/:id/booking`:** Gets all booking details for a user. Requires user authentication.
     *   **Output (Success):**
        ```json
        [
            {
                "train_id": "integer"
            }
        ]
            *   **Output (Error):**
        ```json
        {
            "error": "string"
        }

```
