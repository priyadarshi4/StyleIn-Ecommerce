# Style In — E-Commerce Shopping Platform 🛍️

---

## ⏱️ Project Overview

**Style In** is a modern, full-stack eCommerce shopping platform developed as a startup-grade application.  
It is designed with scalability, clean architecture, and real-world business requirements in mind.

This project follows industry best practices and is suitable for:
- Startup deployment
- Portfolio presentation
- Recruiter & investor review

---

## ⭐ Support

If you find **Style In** useful or inspiring:
- ⭐ Star the repository
- 👀 Follow the project for future updates

Your support helps the project grow 🚀

---

## 📖 Introduction

**Style In** is a full-stack eCommerce web application built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
It provides a complete shopping ecosystem with both **customer-facing features** and a **powerful admin dashboard**.

The platform is:
- Secure
- Responsive
- Scalable
- Production-ready

---

## 🎥 Application Demo

### 🧑 Customer Area
- Browse products
- Add to cart
- Secure checkout
- Order tracking
- Profile management

### 🛠️ Admin Area
- Product management
- Order control
- User management
- Inventory monitoring

*(Demo links/screenshots can be added here)*

---

## 🧰 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Stripe (Payments)
- Cloudinary (Image storage)
- Nodemailer (Emails)

### Frontend
- React.js
- Redux & Redux Thunk
- Material UI (MUI)
- CSS3
- Axios

---

## ⚙️ Configuration Guide

### ☁️ Cloudinary
Used for secure image hosting and optimization.

### 💳 Stripe/COD
Used for secure payment processing.

### 📧 Nodemailer
Used for email verification and password reset.

### 🗄️ MongoDB
Database hosted on MongoDB Atlas.

---

## 🛠️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/priyadarshi4/style-in.git
cd style-in


2️⃣ Install Dependencies
npm install
cd frontend
npm install
cd ..

3️⃣ Environment Variables

Create a .env file inside backend/config:

PORT=5000
MONGO_URI=<mongodb_connection>
NODE_ENV=production

JWT_SECRET=<jwt_secret>
JWT_EXPIRE=5d
COOKIE_EXPIRE=5

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SERVICE=gmail
SMTP_MAIL=<email>
SMTP_PASS=<password>

CLOUDINARY_NAME=<name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>

STRIPE_API_KEY=<key>
STRIPE_SECRET_KEY=<secret>

FRONTEND_URL=http://localhost:3000
