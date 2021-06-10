const express = require('express');
const router = express.Router()
const bookCtrl = require('../controllers/bookControllers')
console.log(bookCtrl)

// POST request to /books to create new book
router.post('/books', bookCtrl.createNewBook)

// GET request to /books to get the books

router.get('/books', bookCtrl.fetchAllBooks)
 
// GET request to /books to fetch a single book

router.get('/books/:id', bookCtrl.fetchSingleBook)

// PUT request to update book

router.put('/books/:id', bookCtrl.updateSingleBook)

// DELETE request to delete book

router.delete('/books/:id', bookCtrl.deleteSingleBook)

 module.exports = router;