# 🧠 AI SaaS Backend

This is a **SaaS backend module for an AI-powered platform**, where users can generate and manage creative content with ease.  
The system integrates multiple AI services (text and image generation, resume review, and more) under a single authentication and billing model.

---

## 🚀 Features

### 📝 AI Content Generation

- Generate **articles**, **blogs**, and **titles** using AI.
- Smart prompt-based generation for flexible content creation.

### 🖼️ Image Tools

- **AI Image Generator** – create stunning visuals from text prompts.
- **Background Remover** – upload an image and remove its background instantly.
- **Object Remover** – erase unwanted objects from uploaded images using AI.
- **Cloud Uploads** – all images are stored securely using **Cloudinary**.

### 📄 Resume Review

- Upload your resume file (PDF).
- AI reviews and provides feedback on structure, content, and improvement areas.

### 🔐 Authentication & User Management

- **Clerk** handles authentication, authorization, and session management.
- Support for **Free** and **Premium** user plans.
- manage payment

### 💾 Data Storage

- Uses **Neon PostgreSQL** (SQL database) to store user activities, prompts, and AI creations.
- All user data and generations are safely persisted for account-based tracking.

---

## 🧩 Tech Stack

| Category       | Technology                                          |
| -------------- | --------------------------------------------------- |
| Language       | **TypeScript / JavaScript**                         |
| Framework      | **Node.js / Express.js** (depending on integration) |
| Authentication | **Clerk**                                           |
| Database       | **PostgreSQL (Neon)**                               |
| File Storage   | **Cloudinary**                                      |
| AI Services    | OpenAI API / Clip drop AI endpoints                 |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ehabzakout/quickAI-backend.git

cd quickAi-backend

```

### 2️⃣ Install dependencies and run

```bash
npm install

npm run dev

```

### 3️⃣ Configure Environment Variables

# Clerk

CLERK_PUBLISHABLE_KEY= your_clerk_key
CLERK_SECRET_KEY= your_clerk_secret

# Database

DATABASE_URL = you database link
PORT = 3000

# AI openAI, clip drop

AI_API_KEY = your openAi key
CLIP_DROP_KEY = your clip drop key
CLIP_DROP_API = your clip drop api key

# cloudinary Configuration

CLOUDINARY_SECRET = your cloudinary secret key
CLOUDINARY_API_KEY= your cloudinary api key
CLOUD_NAME= your cloudinary name
