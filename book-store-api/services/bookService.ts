// src/services/bookService.ts

import BookRepository from '../repositories/bookRepo';
import { IBook } from '../models/book';

export default class BookService {
  static async getAllBooks(): Promise<IBook[]> {
    return await BookRepository.getAllBooks();
  }

  static async getBookById(id: number): Promise<IBook | null> {
    return await BookRepository.getBookById(id);
  }

  static async createBook(bookData: IBook): Promise<IBook> {
    return await BookRepository.createBook(bookData);
  }

  static async updateBook(id: number, bookData: IBook): Promise<IBook | null> {
    const existingBook = await BookRepository.getBookById(id);
    if (!existingBook) {
      return null;
    }
    return await BookRepository.updateBook(id, bookData);
  }

  static async deleteBook(id: number): Promise<boolean> {
    const existingBook = await BookRepository.getBookById(id);
    if (!existingBook) {
      return false;
    }
    return await BookRepository.deleteBook(id);
  }
}
