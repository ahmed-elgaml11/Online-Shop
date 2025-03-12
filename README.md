# 🛒 Online Shop

## 📌 Overview

The **Online Shop** is a full-featured e-commerce web application that allows users to browse products, manage a shopping cart, place orders, and handle payments. It includes an admin panel for managing products, users, and orders. The platform is built using **Node.js, Express, MongoDB, and EJS** for templating.

## ✨ Features

### 🔹 User Features
- **User Authentication**: Secure login and registration using Express Sessions, bcrypt.js
- **Product Browsing**: View available products with details like images, prices, and descriptions.
- **Shopping Cart**: Add, update, and remove items in the cart.
- **Order Management**: Place orders and track order history.
- **Payment Integration**:  PayPal integration.
- **Search & Filtering** – Find products easily based on categories, price, and name.

### 🔹 Admin Features
- **Admin Authentication**: Secure access to the admin panel.
- **Product Management**: Create, update, and delete products.
- **Order Management**: View, update, and process user orders.
- **User Management**: Manage customer accounts and roles.
- **File Upload**: Upload product images for display in the store.

---

## 🛠️ Technologies Used

| **Category**   | **Technology** |
|---------------|---------------|
| **Backend**   | Node.js, Express.js |
| **Database**  | MongoDB, Mongoose |
| **Frontend**  | EJS (Embedded JavaScript), CSS |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ahmed-elgaml11/Online-Shop.git
cd Online-Shop
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Configure Environment Variables
Create a .env file in the root directory and add:
```bash
DATABASE=your_mongodb_connection_string
PAYPALID=your_paypal_id  
PAYPALSECRET=your_paypal_secretkey
SESSION=your_session_secretkey
COOKIE=your_cookie_secretkey
```

### 4️⃣ Start the Application
```bash
npm start
```

## 💳 Payment Integration (PayPal)

This project supports **PayPal** for processing payments.

### 🔹 Setting Up PayPal
1. Go to [PayPal Developer](https://developer.paypal.com/) and log in.
2. Navigate to **Dashboard** → **My Apps & Credentials**.
3. Create a new **REST API App**.
4. Copy the **Client ID** and **Secret Key**.
5. Add them to the `.env` file:

   ```env
   PAYPALID=your_paypal_client_id
   PAYPALSECRET=your_paypal_secret
