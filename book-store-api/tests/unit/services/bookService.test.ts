import BookRepository from "../../../repositories/bookRepo";
import BookService from "../../../services/bookService";


describe('BookService', () => {
  describe('getCalculatedBookGenreResult', () => {

    // Test 1
    it('should return null if no books are found', async () => {
      // Mock the BookRepository.getAllBooks method to return an empty array
      jest.spyOn(BookRepository, 'getAllBooks').mockResolvedValue([]);

      const result = await BookService.getCalculatedBookGenreResult('Fiction', 10);

      expect(result).toBeNull();
    });

    // Test 2
    it('should return null if no books match the specified genre', async () => {
      // Mock the BookRepository.getAllBooks method to return an array with books of different genres
      jest.spyOn(BookRepository, 'getAllBooks').mockResolvedValue([
        { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Non-fiction', price: 50 },
        { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Non-fiction', price: 75 }
      ]);

      const result = await BookService.getCalculatedBookGenreResult('Fiction', 10);

      expect(result).toBeNull();
    });

    // Test 3
    it('should calculate discounted price correctly for valid genre and discount percentage', async () => {
      // Mock the BookRepository.getAllBooks method to return an array of books with the specified genre
      jest.spyOn(BookRepository, 'getAllBooks').mockResolvedValue([
        { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Fiction', price: 50 },
        { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Fiction', price: 75 }
      ]);

      const result = await BookService.getCalculatedBookGenreResult('Fiction', 10);

      // Calculate the expected discounted price manually
      const expectedDiscountedPrice = (50 + 75) * (1 - 10 / 100);

      expect(result).toEqual({
        genre: 'Fiction',
        discount_percentage: 10,
        total_discounted_price: expectedDiscountedPrice
      });
    });
  });
});
