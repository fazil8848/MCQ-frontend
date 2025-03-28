# Authentication & Test System - Frontend

## Overview

React.js application for user authentication and MCQ test system built with Vite.

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- React Hook Form
- Axios
- React Router DOM
- Yup Validation

## Prerequisites

- Node.js (v18+)
- npm (v9+)

## Dependencies

- React & React DOM
- React Hook Form
- Axios
- Tailwind CSS
- Yup
- React Router
- React Phone Input
- React Toastify
- Lucide React
- React Icons

## Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/project-name.git
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file

```
VITE_BACKEND_API_URL=http://localhost:5000/api
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Project Structure

```
frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Layout.jsx
│   │   ├── UI/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Checkbox.jsx
│   │   │   ├── FormControl.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Loader.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ResultsPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── services/
│   │   ├── authService.js
│   │   ├── testService.js
│   │   └── feedbackService.js
│   ├── utils/
│   │   ├── api.js
│   │   └── localStorage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Linting

The project uses ESLint for code quality and consistency. Run `npm run lint` to check for linting errors.

## Features

- User Registration & Login
- Form Validation
- Responsive Design
- Toast Notifications
- Phone Number Input
- JWT Authentication


