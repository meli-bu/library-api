# Library Management System API

**Developer:** Melat Biruk Zewdie

## Project Description
The Library Management System API is a RESTful API built with Node.js and Express.js. It allows users to manage library books through HTTP requests.

The system has two roles:
- **Librarian:** Can add, view, update, and delete books.
- **Member:** Can only view books.

## Technologies Used
- Node.js
- Express.js
- JavaScript
- Postman

## Installation and Setup

1. Clone this repository:
   ```bash
   git clone YOUR_GITHUB_REPOSITORY_LINK
   ```

2. Navigate into the project folder:
   ```bash
   cd library-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   node server.js
   ```

The server runs at:

`http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description | Permission |
|---|---|---|---|
| GET | `/books` | View all books | Everyone |
| POST | `/books?role=librarian` | Add a new book | Librarian |
| PUT | `/books/:id?role=librarian` | Update a book | Librarian |
| DELETE | `/books/:id?role=librarian` | Delete a book | Librarian |

## Authentication

The API uses middleware to check the user's role through a query parameter.

Example:

`POST http://localhost:3000/books?role=librarian`

Requests without the librarian role receive a `403 Forbidden` response for protected operations.

## Error Handling

The API handles common HTTP status codes:

- `200` – Successful request
- `201` – Resource created
- `400` – Invalid or missing information
- `403` – Access denied
- `404` – Resource or route not found
- `500` – Internal server error

## Testing

All API endpoints can be tested using Postman.

The exported Postman collection and screenshots of test results are included with the project submission.

## Author

**Melat Biruk Zewdie**

Library Management System API – Express.js Practice Project.