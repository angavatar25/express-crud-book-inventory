import express from 'express';
import {
  createBook,
  deleteBookData,
  showBookData,
  updateBookData
} from '../services/book_inventory.js';

const bookRouter = express.Router();

bookRouter.post('/create', createBook);
bookRouter.get('/show-book-list', showBookData);
bookRouter.put('/update-book-data/:id', updateBookData);
bookRouter.delete('/delete-book/:id', deleteBookData);

export default bookRouter;