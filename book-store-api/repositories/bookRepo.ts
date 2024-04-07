// src/repositories/bookRepository.ts

import { IBook } from '../models/book';

// Simulated database storage
let books: IBook[] = [
  { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', price: 50 },
  { id: 2, title: '1984', author: 'George Orwell', genre: 'Fiction', price: 75 },
  { id: 7, title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', genre: 'Fantasy', price: 65 },
  { id: 8, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', price: 70 },
  { id: 9, title: 'The Da Vinci Code', author: 'Dan Brown', genre: 'Mystery', price: 40 },
  { id: 10, title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', genre: 'Mystery', price: 55 }
];

export default class BookRepository {
  static async getAllBooks(): Promise<IBook[]> {
    return books;
  }

  static async getBooksByGenre(genre: string): Promise<IBook[]> {
    const filteredBooks = books.filter((b) => b.genre.toLowerCase() === genre.toLowerCase());
    return filteredBooks;
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