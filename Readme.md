Style In — E-Commerce Shopping Platform 🛍️
⏱️ Project Overview

Style In is a modern, startup-grade full-stack eCommerce platform built with scalability, clean architecture, and real-world business requirements in mind.

The project is designed to demonstrate:

Production-ready backend architecture

Secure authentication & payments

Admin + customer workflows

AI-powered customer support

This application is suitable for:

🚀 Startup MVP

💼 Portfolio showcase

👨‍💻 Recruiter & investor review

⭐ Support

If you find Style In useful or inspiring:

⭐ Star the repository

👀 Follow the project for future updates

Your support helps the project grow 🚀

📖 Introduction

Style In is a full-stack eCommerce web application built using the
MERN stack (MongoDB, Express, React, Node.js).

It delivers a complete shopping ecosystem including:

Customer-facing storefront

Secure checkout & order tracking

Admin dashboard for business operations

AI-powered shopping assistant

The platform is:

🔐 Secure

📱 Fully responsive

⚡ Scalable

🏗️ Production-ready

🎥 Application Features
🧑 Customer Area

Browse products

Add to cart & wishlist

Secure checkout (Stripe / COD)

Order tracking

Profile & password management

AI shopping assistant (chat + voice)

🛠️ Admin Area

Product CRUD operations

Order management

User management

Inventory monitoring

Secure admin access

🤖 AI Shopping Assistant (NEW)

Style In includes a smart AI chatbot designed to improve user experience:

✨ Capabilities

Answers product & delivery questions

Explains brand, mission & founder info

Handles returns & order queries

Voice input (Speech-to-Text)

Voice responses (Text-to-Speech)

AI powered by OpenAI / Gemini

🧠 Example Questions

“Who is the founder of Style In?”

“What products do you sell?”

“How can I contact support?”

“Tell me about your return policy”

🧰 Tech Stack
Backend

Node.js

Express.js

MongoDB & Mongoose

JWT Authentication

Stripe Payment Gateway

Cloudinary (image storage)

Nodemailer / Resend (emails)

OpenAI / Gemini APIs (AI chatbot)

Frontend

React.js

Redux & Redux Thunk

Material UI (MUI)

CSS3 (custom UI)

Axios

⚙️ Configuration Guide
☁️ Cloudinary

Used for secure image upload, optimization, and CDN delivery.

💳 Payments

Stripe (Card payments)

Cash on Delivery (COD)

📧 Email Services

Password reset

Order notifications

Account verification

🗄️ Database

MongoDB Atlas (cloud hosted)

🛠️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/priyadarshi4/style-in.git
cd style-in

2️⃣ Install Dependencies
npm install
cd frontend
npm install
cd ..

3️⃣ Environment Variables

Create a file at:

backend/config/config.env

🔐 Backend Environment Variables
PORT=5000
NODE_ENV=production

MONGO_URI=<your_mongodb_connection>
DB_LINK=<your_mongodb_connection>

JWT_SECRET=<your_jwt_secret>
JWT_EXPIRE=5d
COOKIE_EXPIRE=5

CLOUDINARY_NAME=<cloudinary_name>
CLOUDINARY_API_KEY=<cloudinary_api_key>
CLOUDINARY_API_SECRET=<cloudinary_api_secret>

STRIPE_API_KEY=<stripe_public_key>
STRIPE_SECRET_KEY=<stripe_secret_key>

OPENAI_API_KEY=<openai_api_key>
GEMINI_API_KEY=<gemini_api_key>

FRONTEND_URL=http://localhost:3000


⚠️ Never commit this file to GitHub

🚀 Running the Application
Start Backend
cd backend
npm run dev

Start Frontend
cd frontend
npm start


App runs at:

🌐 Frontend: http://localhost:3000

🔌 Backend API: http://localhost:5000/api/v1

🧑‍💼 Founder & Vision

Style In was founded by Priyadarshi Prince,
a passionate entrepreneur and 3rd-year B.Tech student at IIT Patna.

Driven by creativity, technology, and youth culture, Style In was created to:

Make fashion affordable & accessible

Blend technology with modern lifestyle

Build a community-driven ecommerce brand

Style In believes:

Fashion is not just clothing — it’s self-expression.

📌 Future Enhancements

AI product recommendations

Multilingual chatbot (Hindi + English)

Real-time order tracking via chat

Mobile app integration

Advanced analytics dashboard

📝 License

This project is licensed for educational & portfolio use.