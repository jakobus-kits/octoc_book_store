// src/repositories/bookRepository.ts

import { IBook } from '../models/book';

// Simulated database storage
let books: IBook[] = [
  { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Genre 1', price: 10 },
  { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Genre 2', price: 15 },
  { id: 3, title: 'Book 3', author: 'Author 3', genre: 'Genre 3', price: 20 }
];

export default class BookRepository {
  static async getAllBooks(): Promise<IBook[]> {
    return books;
  }

  static async getBookById(id: number): Promise<IBook | null> {
    const book = books.find((b) => b.id === id);
    return book ? book : null;
  }

  static async createBook(bookData: IBook): Promise<IBook> {
    const newBook: IBook = { ...bookData, id: books.length + 1 };
    books.push(newBook);
    return newBook;
  }

  static async updateBook(id: number, bookData: IBook): Promise<IBook | null> {
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) {
      return null;
    }
    const updatedBook: IBook = { ...bookData, id };
    books[index] = updatedBook;
    return updatedBook;
  }

  static async deleteBook(id: number): Promise<boolean> {
    const initialLength = books.length;
    books = books.filter((b) => b.id !== id);
    return initialLength !== books.length;
  }
}