# Recipe - API Documentation

Welcome to the API documentation for the Recipe API. This API allows you to manage recipes.

---

## Getting Started

1. **Create an Environment File**  
   To set up your environment variables, create a `.env` file in the root directory of your project. Use `.env.example` as a reference for the required environment variables and their expected format.

2. **Testing Mode**  
   If you want to run tests, set `NODE_ENV` to `test` in your `.env` file:
   ```env
   NODE_ENV=test
   ```
3. **Start Server**
   To start server, run:
   ```
   npm run dev
   ```

## Base URL
http://localhost:3000


---

## Endpoints

### 1. GET `/`
Returns a welcome message to confirm the API is working.

- **Response**
  - Status: `200 OK`
  - Body: 
    ```json
    {
      "message": "Hello World! API is working"
    }
    ```

### 2. POST `/api/recipes`
Creates a new recipe.

- **Request Body**
  ```json
  {
    "title": "Pasta",
    "ingredients": ["flour", "water"],
    "instructions": ["Mix ingredients", "Cook pasta"]
  }
- **Response**
  - Status: `201 Created`
  - Body: 
    ```json
    {
        "data": {
            "_id": "5f8d0a9baf347d0001b3e6f0",
            "title": "Pasta",
            "ingredients": ["flour", "water"],
            "instructions": ["Mix ingredients", "Cook pasta"],
            "createdAt": "2024-10-20T12:45:00.000Z",
            "updatedAt": "2024-10-20T12:45:00.000Z"
        }
    }
    ```

### 3. GET /api/recipes
Fetches a list of recipes.

- **Query Parameters**
    - `page`: Page number for pagination (default is 1).
    - `limit`: Number of recipes per page (default is 10).

- **Response**
  - Status:  200 OK
  - Body: 
    ```json
    {
        "data": [
            {
            "_id": "5f8d0a9baf347d0001b3e6f0",
            "title": "Pasta",
            "ingredients": ["flour", "water"],
            "instructions": ["Mix ingredients", "Cook pasta"]
            }
        ],
        "currentPage": 1,
        "totalPages": 1,
        "totalItems": 1
    }

    ```

### 4. GET /api/recipes/:id
Fetches a single recipe by its ID.

- **Response**
  - Status: `200 OK`
  - Body: 
    ```json
    {
        "data": {
            "_id": "5f8d0a9baf347d0001b3e6f0",
            "title": "Pasta",
            "ingredients": ["flour", "water"],
            "instructions": ["Mix ingredients", "Cook pasta"]
        }
    }

    ```

### 5. PUT /api/recipes/:id
Updates an existing recipe by ID.

- **Request Body**
  ```json
  {
    "title": "Updated Pasta",
    "ingredients": ["flour", "water"],
    "instructions": ["Mix ingredients", "Cook pasta"]
  }
- **Response**
  - Status: `200 OK`
  - Body: 
    ```json
    {
        "data": {
            "_id": "5f8d0a9baf347d0001b3e6f0",
            "title": "Updated Pasta",
            "ingredients": ["flour", "water"],
            "instructions": ["Mix ingredients", "Cook pasta"],
            "createdAt": "2024-10-20T12:45:00.000Z",
            "updatedAt": "2024-10-20T12:45:00.000Z"
        }
    }
    ```

### 6. DELETE /api/recipes/:id
Deletes a recipe by its ID.

- **Response**
  - Status: `200 OK`
  - Body: 
    ```json
    {
        "message": "Recipe deleted successfully"
    }
    ```


## Error Handling
- **400 Bad Request**
  - Occurs when a required field is missing or invalid.
  - Example:
    ```json
    {
        "message": "Ingredients is required"
    }
    ```

- **404 Not Found**
  - Occurs when the recipe does not exist.

- **500 Internal Server Error**
  - Occurs for any unexpected errors on the server side.


## Running the API Locally
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the API on `http://localhost:3000`.

## Testing the API
To test the API, you can use tools like Postman or cURL, or you can run the unit tests with Jest and Supertest as outlined in the code.
```
npm run test
```