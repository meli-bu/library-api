const express = require("express");

const app = express();

const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// Temporary book database
let books = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self-help"
    },
    {
        id: 2,
        title: "Oromay",
        author: "Bealu Girma",
        category: "Fiction"
    }
];

// GET: Retrieve all books
app.get("/books", (req, res) => {
    res.status(200).json(books);
});

// POST: Add a new book
app.post("/books", authenticateLibrarian, (req, res) => {

    const { title, author, category } = req.body;

    // Check required fields
    if (!title || !author || !category) {
        return res.status(400).json({
            message: "Title, author, and category are required!"
        });
    }

    const newBook = {
        id: books.length + 1,
        title: title,
        author: author,
        category: category
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully!",
        book: newBook
    });

});
// PUT: Update an existing book
// PUT: Update an existing book
app.put("/books/:id", authenticateLibrarian, (req, res) => {

    const bookId = parseInt(req.params.id);

    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const { title, author, category } = req.body;

    if (!title || !author || !category) {
        return res.status(400).json({
            message: "Title, author, and category are required!"
        });
    }

    book.title = title;
    book.author = author;
    book.category = category;

    res.status(200).json({
        message: "Book updated successfully!",
        book: book
    });

});
// DELETE: Remove a book
app.delete("/books/:id", authenticateLibrarian, (req, res) => {

    const bookId = parseInt(req.params.id);

    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const deletedBook = books.splice(bookIndex, 1);

    res.status(200).json({
        message: "Book deleted successfully!",
        book: deletedBook[0]
    });

});
// Authentication Middleware
function authenticateLibrarian(req, res, next) {

    const role = req.query.role;

    if (role !== "librarian") {
        return res.status(403).json({
            message: "Access denied! Only librarians can perform this action."
        });
    }

    next();
}
// Handle routes that do not exist
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found!"
    });
});

// Global error handling middleware
app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({
        message: "Something went wrong on the server!"
    });

});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});