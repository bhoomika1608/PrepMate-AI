# PrepMate AI - AI-Powered Coding Interview & Career Prep

PrepMate AI is a comprehensive, beginner-friendly MERN stack application designed to help users prepare for coding interviews and plan their careers. It features a modern UI, AI-powered tools, and a curated list of DSA questions.

## Features

- **Authentication**: Secure JWT-based user login and registration.
- **Practice Problems**: 15 curated DSA questions across various topics (Arrays, Strings, Linked Lists, etc.).
- **Code Explainer**: AI-powered tool to explain your code, provide time/space complexity, and suggest optimizations.
- **Interview Generator**: Generates targeted interview questions based on role, topic, and difficulty.
- **Resume Analyzer**: Evaluates plain text resumes against a target role and provides ATS score and improvements.
- **Career Roadmap**: Generates a step-by-step career progression guide based on current skills and target role.
- **Notes**: Personal workspace to save important formulas and concepts.
- **Dashboard & Profile**: Track progress and manage career goals.

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, React Router, Axios, Lucide React
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
- **AI Integration**: Groq API (Llama3)

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd prepmate-ai
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory (you can copy from `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/prepmate_ai
JWT_SECRET=supersecretjwtkeyforprepmate
GROQ_API_KEY=your_groq_api_key_here
```

Seed the database with sample DSA questions:

```bash
node seed.js
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal and navigate to the client folder:

```bash
cd client
npm install
npm run dev
```

## Folder Structure

- `/client` - Frontend React application (Vite)
- `/server` - Backend Express application
  - `/models` - Mongoose database schemas
  - `/routes` - API endpoints
  - `/middlewares` - Authentication middleware
  - `seed.js` - Script to populate initial data

