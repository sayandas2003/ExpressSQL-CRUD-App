# **ExpressSQL CRUD App**

## 🚀 **Project Overview**
This project is a **full-stack CRUD application** built using **Node.js**, **Express.js**, **MySQL**, and **EJS**. It provides a simple yet efficient **User Management System**, allowing users to **add**, **edit**, **view**, and **delete** records in a **MySQL database** via a clean and intuitive user interface.

## 🔧 **Technologies Used**
- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web framework for Node.js to handle HTTP requests and routing.
- **MySQL**: Relational database for storing user data.
- **EJS (Embedded JavaScript)**: Templating engine for rendering dynamic HTML pages.
- **Method-Override**: Middleware to allow HTTP methods like PUT, DELETE in forms.
- **Faker.js** (optional): For generating fake data (if used).

## 📋 **Features**
- **Add User**: Add new users to the database with username, email, and password.
- **Edit User**: Modify user details such as username after verifying password.
- **Delete User**: Remove users from the database after password confirmation.
- **View Users**: View a list of all users stored in the database.
- **Responsive UI**: Designed using **HTML**, **CSS**, and **EJS** for a clean, mobile-friendly experience.
  
## 💻 **Installation & Setup**

### 1. **Clone the repository**
git clone https://github.com/yourusername/ExpressSQL-CRUD-App.git
cd ExpressSQL-CRUD-App
2. Install dependencies
bash
Copy
Edit
npm install
3. Set up MySQL database
Make sure you have MySQL installed and create a database (e.g., user_management). Use the following SQL query to create a users table:

sql
Copy
Edit
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
4. Configure the database connection
In the app.js (or relevant file), modify the connection settings to your MySQL credentials:

javascript
Copy
Edit
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'user_management',   // Name of your database
    password: 'yourpassword'       // Your MySQL password
});
5. Run the application
bash
Copy
Edit
npm start
The application will be live at http://localhost:8080.
