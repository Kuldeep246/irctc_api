# API_DOCUMENTATION

## Authentication Routes (`/auth`)

*   **`POST /auth/register`:** Registers a new user.
    *   **Input:**
        ```json
        {
            "username": "string",
            "password": "string"
        }
        ```
    *   **Output (Success):**
        ```json
        {
            "message": "User registered",
            "user": {
                "id": "integer",
                "username": "string"
            }
        }
        ```
    *   **Output (Error):**
        ```json
        {
            "error": "username already in use"
        }
        ```

*   **`POST /auth/login`:** Logs in an existing user.
    *   **Input:**
        ```json
        {
            "username": "string",
            "password": "string"
        }
        ```
    *   **Output (Success):**
        ```json
        {
            "token": "string",
            "user": {
                "id": "integer",
                "username": "string"
            }
        }
        ```
    *   **Output (Error):**
        ```json
        {
            "error": "Invalid credentials"
        }
        ```

*   **`POST /auth/admin/register`:** Registers a new admin. (Similar input/output structure as `/auth/register`)
*   **`POST /auth/admin/login`:** Logs in an existing admin. (Similar input/output structure as `/auth/login`, but only returns the token)

## Admin Routes (`/admin`)

*   **`POST /admin/train`:** Adds a new train. Requires `x-api-key` header and admin authentication.
    *   **Input:**
    *   **Example Input:**
        ```json
        {
            "train_number": "string",
            "source": "string",
            "destination": "string",
            "totalSeats": "integer",
            "availableSeats": "integer"
        }
        ```
    *   **Output (Success):**
        ```json
        {
            "message": "Train added successfully",
            "trainId": "integer"
        }
        ```
    *   **Output (Error):**
        ```json
        {
            "error": "string"
        }
        ```
    

*   **`POST /admin/train/:id`:** Updates an existing train. Requires `x-api-key` header and admin authentication. (Similar input/output structure as `/admin/train`)
*   **`DELETE /admin/train/:id`:** Deletes a train. Requires `x-api-key` header and admin authentication.
    *   **Output (Success):**
        ```json
        {
            "message": "Train deleted successfully"
        }
        ```
    *   **Output (Error):**
        ```json
        {
            "error": "string"
        }
        ```

## Train Routes (`/trains`)

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
        ```
    *   **Output (Error):**
        ```json
        {
            "error": "string"
        }
        ```

*   **`GET /trains/:id`:** Gets the details for a specific train.
    *   **Output (Success):**
        ```json
        {
            "train_number": "string",
            "source": "string",
            "destination": "string",
            "available_seats": "integer"
        }
        ```
    *   **Output (Error):**
        ```json
        {
            "error": "string"
        }
        ```

## Booking Routes (`/bookings`)

*   **`POST /bookings/:trainId/book`:** Books seats on a train. Requires user authentication.
    *   **Input:**
        ```json
        {
            "seats": "integer"
        }
        ```
    *   **Output (Success):**
        ```json
        {
            "message": "Seat(s) booked successfully",
            "bookingId": "integer"
        }
        ```
    *   **Output (Error):**
        ```json
        {
            "error": "string"
        }
        ```

*   **`DELETE /bookings/:bookingId`:** Cancels a booking. Requires user authentication. (Similar output structure as `/bookings/:trainId/book` - success message or error)
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
        ```
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
       
