# 🏡 Abhi Estate – Premium Full-Stack Real Estate Platform

[![MIT License](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](#-tech-stack)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-violet.svg)](https://github.com/abhi-2029/mern-estate/pulls)
[![Author Profile](https://img.shields.io/badge/Author-Abhishek%20Ranjan-indigo.svg)](#-author)

Abhi Estate is a state-of-the-art, full-featured real estate marketplace where users can seamlessly list, search, rent, and sell properties. Designed with premium visual aesthetics (including glassmorphism, responsive grids, and dark/light modes), it offers an exceptionally smooth, responsive user experience. 

---

## 🚀 Live Demo
🔗 **Deployed Application:** [https://mern-estate-l7c1.onrender.com](https://mern-estate-l7c1.onrender.com)

---

## 📖 Table of Contents
- [✨ Key Features](#-key-features)
- [📦 Image Storage (Firebase Storage Alternative)](#-image-storage-firebase-storage-alternative)
- [🧠 Tech Stack](#-tech-stack)
- [📁 Project Architecture](#-project-architecture)
- [⚙️ Local Installation & Setup](#%EF%B8%8F-local-installation--setup)
- [🔐 Environment Variables](#-environment-variables)
- [⚡ Deployment Guide](#-deployment-guide)
- [🧑‍💻 Author](#-author)
- [🪪 License](#-license)

---

## ✨ Key Features

*   🌓 **Dynamic Dark & Light Modes**: Seamless visual themes toggled instantly in the header and saved in `localStorage` for cross-session persistence.
*   🔒 **Dual-Method Secure Auth**: Standard email/password registration alongside Firebase-powered Google OAuth.
*   💾 **Local Base64 Image Storage**: Client-side FileReader pipeline that bypasses expensive Firebase storage tiers by storing image data urls directly in MongoDB.
*   🔍 **Advanced Query Dashboard**: Reactive filters for renting vs. selling, parking spots, furnished status, sorting (createdAt, regularPrice), and pagination.
*   🛠️ **Responsive UI/UX**: Premium styling powered by Tailwind CSS using the elegant *Plus Jakarta Sans* typeface, glassmorphic headers, and smooth image carousels (Swiper).
*   🚀 **Performance Optimization**: Promisified concurrent database queries using `Promise.all` for minimal page load latency.

---

## 📦 Image Storage: Firebase Storage Alternative
To bypass Firebase Storage's Blaze pricing tier (which limits writes in new projects), Abhi Estate operates on an autonomous **Base64 Image Pipeline**:
1.  **Frontend Encoding**: Selected files are read locally using the browser's native `FileReader` API and converted into compressed data URLs.
2.  **Extended Server Limits**: The Express backend parses incoming JSON payloads up to `10MB` (configured via `express.json({ limit: '10mb' })`).
3.  **Database Storage**: Image arrays are saved directly as text strings in MongoDB documents, making the project **100% free** and completely self-contained.

---

## 🧠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React (v19), Tailwind CSS, Redux Toolkit, Redux Persist, React Router Dom (v7), Swiper |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Auth & Security** | Firebase OAuth (Google), JSON Web Tokens (JWT) inside HTTP-Only Cookies, BCrypt.js |
| **Hosting** | Render (Production Hosting) |

---

## 📁 Project Architecture

```directory
mern-estate/
├── api/                     # Express Backend Server
│   ├── controllers/         # Route controller handlers
│   ├── models/              # Mongoose database models (User, Listing)
│   ├── routes/              # Express API endpoint definitions
│   ├── utils/               # JWT token verification & error middleware
│   └── index.js             # Main server setup & database initialization
│
├── client/                  # Vite + React Frontend Application
│   ├── public/              # Global browser assets
│   ├── src/
│   │   ├── components/      # Shared components (Header, ListingItem, etc.)
│   │   ├── pages/           # View layouts (Home, SignIn, CreateListing, etc.)
│   │   ├── redux/           # Slice configs (User states & Actions)
│   │   ├── firebase.js      # App OAuth credentials
│   │   └── main.jsx         # App entry point
│   ├── .env                 # Frontend environment keys
│   └── package.json         # Client build configurations
│
├── package.json             # Root commands manager
└── README.md
```

---

## ⚙️ Local Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/abhi-2029/mern-estate.git
cd mern-estate
```

### 2️⃣ Install Dependencies
Run the installation command in the root folder (this will resolve both backend and client node packages):
```bash
npm install
npm install --prefix client
```

### 3️⃣ Environment Variable Configuration
Configure two `.env` files matching the variables below:

#### Root `.env` (Backend Configuration)
Create a `.env` file in the root workspace folder:
```env
MONGO=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_signature_key
```

#### Client `.env` (Frontend Configuration)
Create a `.env` file inside the `/client` directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_web_api_key
```

### 4️⃣ Start the Application
Run the dev task in the root directory:
```bash
npm run dev
```
*   **Backend Server**: Runs on `http://localhost:3000`
*   **Frontend Client**: Serves statically from the production build. Alternatively, navigate to `/client` and run `npm run dev` to start the Vite HMR server on `http://localhost:5173`.

---

## ⚡ Deployment Guide (Render)

1.  **Configure Build Script**: The root `package.json` includes a script that builds the frontend and places compiled assets inside `client/dist`.
2.  **Add Web Service on Render**:
    *   **Environment**: Node
    *   **Build Command**: `npm run build`
    *   **Start Command**: `npm start`
3.  **Environment Variables**: Add your `MONGO`, `JWT_SECRET`, and `VITE_FIREBASE_API_KEY` configurations inside Render's environment dashboard.

---

## 🧑‍💻 Author

**Abhishek Ranjan**
*   🎓 B.Tech Batch 2026 | Full Stack Developer | DSA & C++ Enthusiast
*   📧 [abhisheksingh70224@gmail.com](mailto:abhisheksingh70224@gmail.com)

---

## 🪪 License

This project is open-source and licensed under the **MIT License**. Feel free to use, modify, and distribute it.

---

⭐ *If you find this project helpful or inspiring, please give it a star on GitHub!*


