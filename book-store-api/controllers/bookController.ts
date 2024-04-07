import { Request, Response } from 'express';
import { IBook, validateBook } from '../models/book';
import BookService from '../services/bookService';

export default class BookController {
  static async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await BookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getBookById(req: Request, res: Response): Promise<void> {
    const bookId = parseInt(req.params.id);
    try {
      const book = await BookService.getBookById(bookId);
      if (!book) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }
      res.status(200).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getCalculatedBookGenreResult(req: Request, res: Response): Promise<void> {
    const genre = req.query.genre as string;
    const discount = Number(req.query.discount);

    try {
      const discountedResult = await BookService.getCalculatedBookGenreResult(genre, discount);
      if (!discountedResult) {
        res.status(404).json({ message: 'No books found for the specified genre' });
        return;
      }
      res.status(200).json(discountedResult);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async createBook(req: Request, res: Response): Promise<void> {
    const newBookData = req.body as Partial<IBook>;

    // Validate book data
    const validationError = validateBook(newBookData);
    if (validationError) {
      res.status(400).json({ message: validationError });
      return;
    }

    try {
      const createdBook = await BookService.createBook(newBookData as IBook);
      res.status(201).json(createdBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async updateBook(req: Request, res: Response): Promise<void> {
    const bookId = parseInt(req.params.id);
    const { title, author, genre, price } = req.body;

    // Validate request data
    if (!title && !author && !genre && !price) {
      res.status(400).json({ message: 'At least one field (title, author, genre, price) must be provided for update' });
      return;
    }

    // Validate price format if provided
    if (price && (isNaN(parseFloat(price)) || !isFinite(price))) {
      res.status(400).json({ message: 'Price must be a valid number' });
      return;
    }

    const updatedBookData = { title, author, genre, price } as IBook;
    try {
      const updatedBook = await BookService.updateBook(bookId, updatedBookData);
      if (!updatedBook) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }
      res.status(200).json(updatedBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async deleteBook(req: Request, res: Response): Promise<void> {
    const bookId = parseInt(req.params.id);
    try {
      const deletedBook = await BookService.deleteBook(bookId);
      if (!deletedBook) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}