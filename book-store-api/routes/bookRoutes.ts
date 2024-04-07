// routes/bookRoutes.ts
import express from 'express';
import BookController from '../controllers/bookController';

const router = express.Router();

router.get('/', BookController.getAllBooks);
router.get('/discounted-price', BookController.getCalculatedBookGenreResult);
router.get('/:id', BookController.getBookById);
router.post('/', BookController.createBook);
router.put('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

export default router;
