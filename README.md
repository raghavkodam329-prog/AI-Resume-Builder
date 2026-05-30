# AI-Powered Resume Builder

A modern, full-stack web application that helps users create professional resumes using AI-generated content and customizable templates.

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Vite
- React Router DOM
- Axios
- Framer Motion
- html2pdf.js
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- OpenAI API

## Features

- **User Authentication**: Sign up, login, JWT-based session management
- **Resume Builder**: Easy-to-use form with sections for personal info, education, experience, skills, projects
- **AI Integration**: Generate professional summaries using OpenAI
- **Templates**: Multiple resume templates (Modern, Professional)
- **PDF Export**: Download your resume as a PDF
- **Dark/Light Theme**: Toggle between themes
- **Responsive Design**: Works on all devices

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- MongoDB (local or cloud)
- OpenAI API key

### Installation

1. Clone the repository:
```bash
cd "ai resume builder"
```

2. Set up the backend:
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
JWT_SECRET=your_jwt_secret_key_here
OPENAI_API_KEY=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
```

4. Start the backend server:
```bash
npm run dev
```

5. Set up the frontend (in a new terminal):
```bash
cd frontend
npm install
npm run dev
```

6. Open your browser and navigate to http://localhost:3000

## Project Structure

```
ai resume builder/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── templates/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## License

MIT
