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

npm run dev
```
