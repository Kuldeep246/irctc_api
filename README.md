# IRCTC API - README.md

## Project Overview

This project is a simplified version of the IRCTC system, designed to demonstrate a basic train booking platform. It allows users to register, log in, book train seats, and cancel bookings. Administrators have the ability to manage train schedules.  This version focuses on the backend API.

## Key Features

*   **User Authentication:** User registration and login.
*   **Admin Authentication:** Admin registration and login with elevated privileges.
*   **Train Management:** Administrators can add, update, and delete train schedules.
*   **Booking Management:** Users can book and cancel train seats.
*   **API Key Protection:** Admin routes are protected by an API key.

## Supported Platforms/Requirements

*   Node.js (v14 or higher)
*   MySQL Database
*   npm (Node Package Manager)

## Getting Started

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/Kuldeep246/irctc_api.git](https://github.com/Kuldeep246/irctc_api.git)  # Replace with your actual repo URL
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment variables:**

    *   Create a `.env` file in the root directory.
    *   Add the following variables, replacing the placeholders with your actual values:

        ```
        SQL_PASSWORD=<your_mysql_password>
        JWT_SECRET=<your_jwt_secret>
        API_KEY=<your_api_key>
        PORT=5000  # Optional, defaults to 5000
        ```

        *   `SQL_PASSWORD`: The password for your MySQL root user.
        *   `JWT_SECRET`: A secret key used for signing JSON Web Tokens (JWTs). Choose a strong, random string.
        *   `API_KEY`: An API key to protect admin routes.
        *   `PORT`: The port the server will listen on.

4.  **Initialize the database:**

    *   The application automatically creates the database and tables upon startup. Ensure your MySQL server is running.

### Dependencies

*   bcryptjs: For password hashing.
*   body-parser: For parsing request bodies.
*   dotenv: For loading environment variables from a `.env` file.
*   express: For creating the web server and handling routes.
*   jsonwebtoken: For creating and verifying JSON Web Tokens (JWTs).
*   mysql2: For connecting to the MySQL database.

## Usage

1.  **Start the server:**

    ```bash
    node index.js
    ```

    This will start the server on the port specified in your `.env` file (or port 5000 if not specified).

2.  **Access the API:**

    The API endpoints are documented in the `API_DOCUMENTATION.md` file. You can use tools like `curl`, Postman, or Insomnia to interact with the API.

### Example: User Registration (using curl)

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "testuser", "password": "password123"}' http://localhost:5000/auth/register
