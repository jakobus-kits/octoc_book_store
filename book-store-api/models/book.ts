export interface IBook {
  id: number;
  title: string;
  author: string;
  genre: string;
  price: number;
}

/**
 * Validate book data.
 * @param bookData Partial book data to validate.
 * @returns A string containing an error message if validation fails, or null if validation passes.
 */
export function validateBook(bookData: Partial<IBook>): string | null {
  const { title, author, genre, price } = bookData;

  // Validates a field value
  const validateField = (
    field: string | undefined,
    fieldName: string,
    maxLength: number
  ): string | null => {
    if (!field || field.trim().length === 0) {
      return `${fieldName} is required`;
    }

    if (field.trim().length > maxLength) {
      return `${fieldName} must be maximum ${maxLength} characters long`;
    }

    return null;
  };

  // Validate title field
  const titleError = validateField(title, "Title", 100);
  if (titleError) return titleError;

  // Validate author field
  const authorError = validateField(author, "Author", 50);
  if (authorError) return authorError;

  // Validate genre field
  const genreError = validateField(genre, "Genre", 50);
  if (genreError) return genreError;

  // Validate price field
  if (typeof price !== "number" || isNaN(price) || price <= 0) {
    return "Price must be a positive number";
  }

  // Validation passed
  return null;
}
