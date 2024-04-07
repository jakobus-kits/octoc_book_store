// src/services/bookService.ts

import { from } from 'rxjs';
import { IBook, IDiscountedGenrePriceResult } from '../models/book';
import BookRepository from '../repositories/bookRepo';

export default class BookService {
  static async getAllBooks(): Promise<IBook[]> {
    return await BookRepository.getAllBooks();
  }

  static async getBookById(id: number): Promise<IBook | null> {
    return await BookRepository.getBookById(id);
  }

  static async getCalculatedBookGenreResult(genre: string, discountPercentage: number): Promise<IDiscountedGenrePriceResult | null> {
    try {
      const books = await BookRepository.getAllBooks();
      if(books == null || books.length < 1)
        return null;

      const filteredBooks = books?.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
      if (filteredBooks.length < 1) {
        return null;
      }

      // Calculate sum of book price
      const totalOriginalPrice = filteredBooks?.reduce((total, book) => total + book.price, 0);
      
      // Calculate discount amount
      const discountedPrice = (totalOriginalPrice ?? 0) * (1 - discountPercentage / 100);

      return {
        genre: genre,
        discount_percentage: discountPercentage,
        total_discounted_price: discountedPrice
      };
    } catch (error) {
      console.error(error);
      return null;
    }
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
