# Nalanda - Library Management System

Nalanda is a library management system built with Node.js and Express. It provides a backend API for managing books, users, and borrowing transactions.

## Features

- **Book Management**: Add, update, delete, and list books.
- **User Management**: Register, login
- **Borrowing System**: Borrow Book, Return Book, Borrow History,


## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose

## Getting Started

### Prerequisites

- Node.js and npm installed on your local machine.
- MongoDB installed and running (if using MongoDB).

### Installation

1. Clone the repository:
   git clone https://github.com/yourusername/nalanda.git

2. Navigate to the project directory:
   cd nalanda

3. Install the dependencies:
   npm install
4. Create a .env file in the root directory and add your environment variables. For example:
   PORT = 3000,
   MONGODB_URL = ,
   JWT_EXPIRE = "5h",
   JWT_SECRET_KEY = "jhjhbhgyuhjkbbvhgfgh"

3. Start the server:
   npm run dev
   