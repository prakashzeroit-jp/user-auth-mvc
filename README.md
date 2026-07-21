# Advanced E-Commerce REST API Backend (MVC Architecture) 🚀

A robust, production-ready, and highly scalable E-Commerce REST API built using **Node.js, Express, and MongoDB (Mongoose)**. This project follows strict industry-standard Model-View-Controller (MVC) decoupling patterns.

---

## 📂 Complete MVC Directory Structure Breakdown

The codebase is organized into cleanly separated logical layers to ensure scalability and ease of maintainability:

```text
user-auth-mvc/
├── config/
│   └── db.js                 # Database connection setup using Mongoose instance
├── controllers/              # Core Business Logic Layer (Processes requests & sends responses)
│   ├── adminController.js     # System analytics metrics & administration controls
│   ├── authController.js      # User identity management & security lifecycle logic
│   ├── categoryController.js  # Inventory organization structural controls
│   ├── cartController.js      # Active user consumption bucket modifications
│   ├── productController.js   # Main catalog processing logic
│   ├── reviewController.js    # Embedded feedback aggregate computation layers
│   └── wishlistController.js  # Static bookmark parsing indexes
├── middleware/               # Intermediate Filtering Layer (Request verification)
│   ├── authMiddleware.js     # Identity token parser & role-permission guard rails
│   └── uploadMiddleware.js   # File multipart parsing boundary & type interceptor
├── models/                   # Data Modeling Layer (Defines Database Schema blueprints)
│   ├── Blacklist.js          # Persistent tracking schema filtering expired tokens
│   ├── Cart.js               # Multi-item bucket container maps linked to users
│   ├── Category.js           # Structural catalog organizational definitions
│   ├── Order.js              # Historical transactional financial logging maps
│   ├── Product.js            # Unified catalog asset maps with embedded sub-reviews
│   └── User.js               # Structural user identities with encryption constraints
├── routes/                   # Routing Configuration Layer (Maps URL Endpoints to Controllers)
│   ├── adminRoutes.js        # Admin operation command definitions
│   ├── authRoutes.js         # Security session mapping bindings
│   ├── cartRoutes.js         # Client shopping container endpoints
│   ├── categoryRoutes.js     # Directory configuration schema mappings
│   ├── orderRoutes.js        # Checkout transaction processing endpoints
│   ├── productRoutes.js      # Core catalog endpoint matrices
│   └── wishlistRoutes.js     # Bookmark lookup processing routes
├── uploads/                  # Physical Storage Layer (Destination folder for image assets)
├── .env                      # Environment Configuration Secrets File (Kept out of Git)
├── .gitignore                # Declaration manifest files specifying omitted resources
├── package.json              # Project manifest and lifecycle dependency mapping scripts
└── server.js                 # Application Entry Point (Bootstraps plugins, routes, & listeners)
```

---

## 🛠️ Global Postman Testing Setup Configuration

Before calling any protected resources, make sure you configure your request execution variables in Postman correctly:

1. **Host Server base domain context:** `http://localhost:3000`
2. **Global Application Content Type Header:** 
   * Go to **Headers** tab in Postman.
   * Add: `Content-Type` = `application/json` *(Except for the Multipart Image Upload API)*.
3. **Session Authentication Web Tokens (JWT):**
   * Select the **Authorization** tab directly below the URL bar.
   * Toggle the **Type** option selector dropdown and set it to **`Bearer Token`**.
   * Paste the clean un-quoted string key generated from the Login API response directly into the text field.

---

## 📡 Comprehensive API Endpoint Blueprint & Postman Testing Reference

### 🔐 1. Authentication Module (`/api/auth`)

#### 🔹 Register User Profile
* **HTTP Method:** `POST`
* **Endpoint URL:** `http://localhost:3000/api/auth/register`
* **Body Format:** `raw (JSON)`
* **JSON Payload Matrix:**
```json
{
  "username": "prakashkumar12",
  "email": "prakash123456@gmail.com",
  "password": "yoursecurepassword"
}
```

#### 🔹 Login & Generate Access Bearer Web Token
* **HTTP Method:** `POST`
* **Endpoint URL:** `http://localhost:3000/api/auth/login`
* **Body Format:** `raw (JSON)`
* **JSON Payload Matrix:**
```json
{
  "email": "prakash123456@gmail.com",
  "password": "yoursecurepassword"
}
```
*📌 **Postman Check:** Copy the long `token` string value returned upon a successful `200 OK` action to authorize all subsequent protected APIs.*

---

### 🗂️ 2. Categories Module (`/api/categories`)

#### 🔹 Add New Category *(Admin Route)*
* **HTTP Method:** `POST`
* **Endpoint URL:** `http://localhost:3000/api/categories`
* **Authorization:** `Bearer Token` *(Ensure `isAdmin: true` or hardcoded development email match is configured)*
* **Body Format:** `raw (JSON)`
* **JSON Payload Matrix:**
```json
{
  "name": "chargers",
  "description": "High velocity charging equipment adapters"
}
```

#### 🔹 View All Categories List *(Public Route)*
* **HTTP Method:** `GET`
* **Endpoint URL:** `http://localhost:3000/api/categories`
* **Authorization:** `No Auth`

---

### 📦 3. Product & Search Module (`/api/products`)

#### 🔹 Add New Product Asset *(Admin Route)*
* **HTTP Method:** `POST`
* **Endpoint URL:** `http://localhost:3000/api/products`
* **Authorization:** `Bearer Token`
* **Body Format:** `raw (JSON)`
* **JSON Payload Matrix:**
```json
{
  "name": "Samsung 25W Charger",
  "description": "Adaptive type-c high velocity fast charging power wall block adapter",
  "price": 1299,
  "category": "PASTE_THE_MONGOOSE_CATEGORY_ID_HERE",
  "stock": 150
}
```

#### 🔹 Master Catalog Search & Multi-Filter Query Handler *(Public Route)*
* **HTTP Method:** `GET`
* **Endpoint URL Configurations:**
  * *Test Case A (Get All):* `http://localhost:3000/api/products`
  * *Test Case B (Name Regular Expressions Match):* `http://localhost:3000/api/products?search=charger`
  * *Test Case C (Category Pipeline Filtration):* `http://localhost:3000/api/products?category=PASTE_CATEGORY_ID`
  * *Test Case D (Boundary Price Range Filter & Sorting):* `http://localhost:3000/api/products?minPrice=500&maxPrice=2000&sortBy=priceAsc`
  * *Test Case E (Offset Index Pagination Controls):* `http://localhost:3000/api/products?page=1&limit=2`

---

### 🖼️ 4. Multipart Image Upload Module (`/api/products/:id/upload`)

#### 🔹 Robust Batch Image Asset Append Process *(Protected Route)*
* **HTTP Method:** `POST`
* **Endpoint URL:** `http://localhost:3000/api/products/PASTE_YOUR_PRODUCT_ID_HERE/upload`
* **Authorization:** `Bearer Token`
* **Body Format:** **`form-data`** *(⚠️ Uncheck Content-Type Application/JSON headers for this operation)*
* **Key/Value Configuration Mapping:**
  * Set **Key** = `images`
  * Change the Key type dropdown selection from *Text* to **`File`**.
  * Under **Value**, click *Select Files* and upload 1-5 image files from your computer.
  * *⚠️ Ensure all empty placeholder rows directly below your active entry inside the Postman table are completely cleared or unchecked.*

---

### 🛒 5. Shopping Cart Module (`/api/cart`)

#### 🔹 Add Item or Increment Quantity
* **HTTP Method:** `POST`
* **Endpoint URL:** `http://localhost:3000/api/cart`
* **Authorization:** `Bearer Token`
* **Body Format:** `raw (JSON)`
* **JSON Payload Matrix:**
```json
{
  "productId": "PASTE_YOUR_PRODUCT_ID_HERE",
  "quantity": 2
}
```

#### 🔹 Overwrite Targeted Quantity Constraint
* **HTTP Method:** `PUT`
* **Endpoint URL:** `http://localhost:3000/api/cart`
* **Authorization:** `Bearer Token`
* **Body Format:** `raw (JSON)`
* **JSON Payload Matrix:**
```json
{
  "productId": "PASTE_YOUR_PRODUCT_ID_HERE",
  "quantity": 5
}
```

---

### ❤️ 6. Wishlist Module (`/api/wishlist`)

#### 🔹 Add Clean Product to Wishlist *(Sanitized via `.trim()`)*
* **HTTP Method:** `POST`
* **Endpoint URL:** `http://localhost:3000/api/wishlist`
* **Authorization:** `Bearer Token`
* **Body Format:** `raw (JSON)`
* **JSON Payload Matrix:**
```json
{
  "productId": "PASTE_YOUR_PRODUCT_ID_HERE"
}
```

---

### 💳 7. Order Transaction Module (`/api/orders`)

#### 🔹 Place New Order & Auto-Reset Active Cart Staging List
* **HTTP Method:** `POST`
* **Endpoint URL:** `http://localhost:3000/api/orders`
* **Authorization:** `Bearer Token`
* **Body Format:** `raw (JSON)`
* **JSON Payload Matrix:**
```json
{
  "shippingAddress": {
    "address": "456 Corporate Business Complex Park Lane",
    "city": "Mumbai",
    "postalCode": "400001",
    "country": "India"
  }
}
```

#### 🔹 Update Order Status to Delivered *(Admin Route)*
* **HTTP Method:** `PUT`
* **Endpoint URL:** `http://localhost:3000/api/orders/PASTE_YOUR_ORDER_ID_HERE/deliver`
* **Authorization:** `Bearer Token`
* **Body Format:** `none`

---

### 📊 8. Administration Analytical Hub Module (`/api/admin`)

#### 🔹 Aggregate Global Real-Time Sales Metrics
* **HTTP Method:** `GET`
* **Endpoint URL:** `http://localhost:3000/api/admin/dashboard-stats`
* **Authorization:** `Bearer Token` *(Must pass Admin Verification Guard conditions)*
