# octoc_book_store
Bookstore API Test Scenario

**Objective**
The objective of this project is to implement a RESTful API for a bookstore using the Express framework and Typescript. The API allows users to perform CRUD operations on books and includes a complex logical operation for managing book discounts. The architecture follows an n-layered design pattern.

**Prerequisites**
Before you begin, ensure you have met the following requirements:
- Node.js installed on your local machine.
- npm package manager installed.

**Installation**
To set up the project, follow these steps:
- Clone this repository to your local machine using the following command: **git clone <repository_url>**
- Install project dependencies by running: **npm install**

**Running the Server**
To start the server, run the following command: **npx ts-node app.ts**

**Usage**
You can interact with the API using tools like Postman or cURL. Here are the available endpoints:
- GET http://localhost:3000/books: Retrieve all books.
- GET http://localhost:3000/books/{id}: Retrieve a book by its ID.
- POST http://localhost:3000/books: Create a new book.
- PUT http://localhost:3000/books/{id}: Update an existing book.
- DELETE http://localhost:3000/books/{id}: Delete a book by its ID.
- GET http://localhost:3000/books/discounted-price?genre={genre_name}&discount={discount_percentage}: Calculate the total discounted price for all books in a specific genre based on a given discount percentage.

**Conclusion**
This README provides an overview of the Bookstore API, including its objectives, tasks, example usage, and instructions for getting started. The implemented API aims to fulfill the requirements specified and provide a robust solution for managing bookstore operations.
