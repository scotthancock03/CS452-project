# CS452-project
Inventory Management MERN App

## Input
The application gets user data from the React and Material UI interface. The users provide product details such as SKU codes, product names, categories, quantity, unit price, low stock threshold, and description. The users also submit control inputs like text search terms, table sort columns, pagination tyle, and modals for adding or editing items. 

## Process
The application processes the data at the front-end and back-end levels. At the front-end level, React components process the user data to validate the input fields, ensuring that there are no empty fields, negative numeric data, and correct SKU formats. React Router handles all the page navigation, and state management allows the application to process search terms, table columns sort, and pagination manually. The application also has an inventory health calculator that determines the inventory condition based on the quantity and threshold value and sets the chip color to low, medium, or high. On the backend, the Express application processes the request and response objects from the frontend, directs the HTTP requests to the appropriate controller functions, and validates the user input data using Mongoose schemas. The backend also handles all the database operations such as reading, writing, updating, and deleting data in MongoDB.

## Output
The application outputs a responsive web application that displays a dynamic inventory table with chips, product details modals, and transaction history. The application also outputs error messages if there are input validation errors in the forms. At the back-end level, the application outputs HTTP status codes and JSON data to the front-end to indicate the status of the database after processing an HTTP request.