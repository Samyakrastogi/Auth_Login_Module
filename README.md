# Auth_Login_Module

Authenticated Login Module in Node.js:

This is a simple authenticated login module built using Node.js, Express.js, MongoDB, and JWT (JSON Web Tokens) for user authentication and authorization.


FEATURES:

User registration with secure password hashing.
User login and JWT token generation.
Token-based authentication for protected routes.
Password reset and recovery functionality via email.
Access control using roles and permissions.
Basic CRUD operations for managing user accounts.

Prerequisites:

Before running the application, make sure you have the following dependencies installed:

Node.js and npm
MongoDB

USAGE
Start the server:
npm start

The server will run at http://localhost:4000.

Use an API client like Postman or curl to interact with the following endpoints:

Register User:
POST /auth/register

Login User:
POST /auth/login

Get All Users (protected route):
GET /users

Get User by ID (protected route):
GET /users/:id

Update User (protected route):
PUT /users/:id

Delete User (protected route):
DELETE /users/:id

Forgot Password:
POST /forgot
Reset Password:
GET /api/reset?token=your_reset_token


Authentication and Authorization:
User registration and login require a valid email and password.
JWT tokens are generated upon successful login and used for authentication.
Protected routes are accessible only with a valid JWT token.
Password reset functionality is available through the "Forgot Password" and "Reset Password" APIs.
Security
Passwords are securely hashed using bcrypt before being stored.
All communication between the client and server is secured using HTTPS.


