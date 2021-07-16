const express = require('express');
const router = express.Router()
const bookCtrl = require('../controllers/bookControllers')
const { authenticateUser, checkifAdmin} = require('../middlewares/authentication')
console.log(bookCtrl)

// POST request to /books to create new book
router.post('/books', authenticateUser, checkifAdmin , bookCtrl.createNewBook)

// GET request to /books to get the books
router.get('/books', authenticateUser  ,  bookCtrl.fetchAllBooks)
 
// GET request to /books to fetch a single book
router.get('/books/:id', authenticateUser  ,bookCtrl.fetchSingleBook)

// PUT request to update book
router.put('/books/:id',authenticateUser  , bookCtrl.updateSingleBook)

// DELETE request to delete book
router.delete('/books/:id', authenticateUser  , bookCtrl.deleteSingleBook)

module.exports = router;