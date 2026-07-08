# 🔐 User Authentication API (MVC)

![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![Express](https://img.shields.io/badge/Express.js-Backend-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![MVC](https://img.shields.io/badge/Architecture-MVC-red)
![License](https://img.shields.io/badge/License-MIT-blue)

A complete **Node.js Authentication API** built using **MVC (Model View Controller)** Architecture.

The project demonstrates how to build a secure authentication system using Node.js, Express.js, MongoDB, JWT Authentication, Password Hashing, Middleware, and REST APIs.

This project is beginner-friendly and can also serve as a starting template for production-ready backend applications.

---

# 📌 Features

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes
- MongoDB Database
- MVC Folder Structure
- Express Router
- Middleware
- Environment Variables
- Error Handling
- JSON Response
- REST API
- Postman Tested
- Clean Project Structure

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|----------|
| Node.js | Backend Runtime |
| Express.js | Server Framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| dotenv | Environment Variables |
| Nodemon | Development |

---

# 📁 Project Structure

```
user-auth-mvc
│
├── config
│     └── db.js
│
├── controllers
│     └── authController.js
│
├── middleware
│     └── authMiddleware.js
│
├── models
│     └── User.js
│
├── routes
│     └── authRoutes.js
│
├── .env
├── app.js
├── server.js
├── package.json
└── README.md
```

---

# 🏗 MVC Architecture

MVC stands for

```
Model
View
Controller
```

Since this is a REST API project, there is no frontend (View).

The project mainly uses:

```
Client
   │
   ▼
Routes
   │
   ▼
Controller
   │
   ▼
Model
   │
   ▼
MongoDB
```

---

# 📂 Folder Explanation

## config/

Contains database connection logic.

Example:

```
MongoDB Connection
```

---

## models/

Contains database schema.

Example

```
User Schema

name

email

password
```

Mongoose uses this schema to create the User Collection.

---

## controllers/

Contains business logic.

Example

```
Register User

Login User

Generate Token

Return Response
```

Controllers receive requests from routes and interact with models.

---

## routes/

Contains API endpoints.

Example

```
POST /register

POST /login

GET /profile
```

Routes only call controllers.

Business logic should never be written here.

---

## middleware/

Contains middleware functions.

Example

```
JWT Verification

Authentication

Authorization
```

Middleware runs before controller execution.

---

## .env

Stores secret variables.

Example

```
PORT=5000

MONGO_URI=your_mongodb_url

JWT_SECRET=your_secret_key
```

Never upload `.env` to GitHub.

---

# ⚙ Installation

Clone the repository

```
git clone https://github.com/prakashzeroit-jp/user-auth-mvc.git
```

Go inside folder

```
cd user-auth-mvc
```

Install packages

```
npm install
```

Create .env file

```
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key
```

Run project

```
npm run dev
```

or

```
node server.js
```

---

# 🚀 Server

If everything is configured correctly

```
Server Running on Port 5000

MongoDB Connected Successfully
```

---

# 🌐 Base URL

```
http://localhost:5000/api
```

---

# 📬 API Endpoints

## 1️⃣ Register User

### URL

```
POST /api/register
```

### Request Body

```json
{
    "name":"John",
    "email":"john@gmail.com",
    "password":"123456"
}
```

### Success Response

```json
{
    "success": true,
    "message": "User Registered Successfully",
    "data": {
        "_id": "66578c...",
        "name": "John",
        "email": "john@gmail.com"
    }
}
```

---

### Email Already Exists

```json
{
    "success": false,
    "message": "Email already exists"
}
```

---

## 2️⃣ Login

### URL

```
POST /api/login
```

### Request

```json
{
    "email":"john@gmail.com",
    "password":"123456"
}
```

---

### Success Response

```json
{
    "success": true,
    "message": "Login Successful",
    "token":"JWT_TOKEN"
}
```

---

### Wrong Password

```json
{
    "success": false,
    "message":"Invalid Credentials"
}
```

---

## 3️⃣ User Profile

### URL

```
GET /api/profile
```

Header

```
Authorization

Bearer JWT_TOKEN
```

---

### Success Response

```json
{
    "success":true,
    "data":{
        "_id":"6657...",
        "name":"John",
        "email":"john@gmail.com"
    }
}
```

---

### Unauthorized

```json
{
    "success":false,
    "message":"Unauthorized Access"
}
```

---

# 🔑 Authentication Flow

```
Register

↓

Password Hashing

↓

Store User

↓

Login

↓

Compare Password

↓

Generate JWT

↓

Return Token

↓

Protected API

↓

Verify Token

↓

Access Granted
```

---

# 🔒 Password Hashing

Passwords are never stored as plain text.

Before saving

```
123456
```

Stored inside database

```
$2b$10$E...
```

This is done using

```
bcrypt
```

---

# 🔐 JWT Authentication

After login

Server generates

```
JWT Token
```

Client stores

```
Token
```

Every protected API request

```
Authorization

Bearer TOKEN
```

Middleware verifies the token.

---

# 📮 Postman Testing

## Register API

Method

```
POST
```

URL

```
http://localhost:5000/api/register
```

Body

```
raw

JSON
```

Paste

```json
{
    "name":"John",
    "email":"john@gmail.com",
    "password":"123456"
}
```

Click

```
Send
```

---

## Login API

Method

```
POST
```

URL

```
http://localhost:5000/api/login
```

Paste

```json
{
    "email":"john@gmail.com",
    "password":"123456"
}
```

Click Send

Copy

```
JWT Token
```

---

## Protected API

Method

```
GET
```

Go to

Headers

```
Authorization

Bearer JWT_TOKEN
```

Click

```
Send
```

If token is valid

You will receive profile information.

---

# 📊 Request Flow

```
Client

↓

Route

↓

Controller

↓

Model

↓

MongoDB

↓

Controller

↓

Response

↓

Client
```

---

# 📦 Dependencies

```
express

mongoose

bcrypt

jsonwebtoken

dotenv

cors

nodemon
```

---

# ❌ Common Errors

## MongoDB Not Connected

Check

```
MONGO_URI
```

---

## Invalid Token

Generate new login token.

---

## JWT Expired

Login again.

---

## Email Already Exists

Use another email.

---

## Missing Token

Add

```
Authorization

Bearer TOKEN
```

---

# 📈 Future Improvements

- Email Verification
- Forgot Password
- Reset Password
- OTP Verification
- Google Authentication
- Refresh Token
- Role Based Authentication
- Admin Dashboard APIs
- File Upload
- Swagger Documentation
- Docker Support
- Unit Testing
- API Rate Limiting

---

# 🎯 Learning Objectives

This project helps developers understand

- MVC Architecture
- REST APIs
- JWT Authentication
- Password Hashing
- MongoDB CRUD
- Express Routing
- Middleware
- Environment Variables
- Authentication Flow
- Secure Backend Development

---

# 🤝 Contributing

Contributions are welcome.

1. Fork Repository

2. Create Branch

```
git checkout -b feature-name
```

3. Commit Changes

```
git commit -m "Added new feature"
```

4. Push

```
git push origin feature-name
```

5. Create Pull Request

---

# 👨‍💻 Author

**Jyoti Prakash**

Backend Developer

Node.js | Express.js | MongoDB

GitHub

https://github.com/prakashzeroit-jp

---

# ⭐ Support

If you found this project helpful,

⭐ Star this repository

🍴 Fork this repository

📢 Share it with others

---

## 📜 License

This project is licensed under the MIT License.

---

# ❤️ Thank You

Thank you for visiting this repository.

Happy Coding 🚀
