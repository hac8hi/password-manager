# 🔐 Password Manager (Local Usage)

A secure **password manager** built with the **MERN stack** (MongoDB, Express.js, React, Node.js) for **local usage only**.  
This app lets you **store, encrypt, and manage** your passwords directly on your machine without relying on cloud storage.

---

## 🚀 Features
- **Local-only storage** (No external servers or cloud)
- **AES-256 encryption** for identifier and password security
- **Add, view and delete** credentials
- **Responsive UI** built with React & Tailwind CSS
- **Master key + IV** to decrypt stored data

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (local instance)
- **Security:** Crypto library for AES encryption
- **State Management:** React Hooks / Context API

---

## Install backend dependencies
``` bash
  cd backend
  npm install
```

## Install frontend dependencies
``` bash
  cd frontend
  npm install
```
## Start MongoDB locally
``` bash
  mongod
```
- If you haven't installed it:

## Create a .env file in /backend with:
``` .env
  SECRET=       // Secret key to create token with jsonwebtoken
  PORT=      // Port of the backend server
  MONG_URI=    // URI to access the mongo database
  SECRETKEY=    // Secret key for the encryption of your identifier and password (32 character)
  IV=    // Initialization vector for the encryption (16 character)
  ALGORITHM=    // The encryption algotrithm used (eg: aes-256-cbc)
```

## Run the backend
``` bash
  cd backend
  npm run dev
```

## Run the frontend
``` bash
  cd frontend
  npm run dev
```

## 🔒 Security Notes
- AES-256-CBC is used for password encryption.
- Before saving, each password is encrypted using:
  - Your secret key (SECRETKEY)
  - Your Initialization Vector (IV)
- Encrypted identifier and passwords are stored in MongoDB, never in plain text.
- To view passwords, the same key + IV is required to decrypt them.
