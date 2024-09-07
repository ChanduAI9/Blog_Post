# Blog Platform

A simple blog platform built with **Next.js** on the frontend and **Flask** on the backend. Users can create, view, edit, and delete blog posts.

## Features

- Create a new blog post
- View all blog posts
- Edit and update blog posts
- Delete blog posts with confirmation
- Form validation for post creation and editing

## Live Demo

Frontend: [Netlify Live Demo](https://your-site.netlify.app)  
Backend: [Render Backend API](https://your-backend.onrender.com)

## Setup Instructions

### Frontend (Next.js)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blog-platform.git
   cd blog-frontend

Install dependencies:

bash
Copy code
npm install
Run the development server:

bash
Copy code
npm run dev
Visit http://localhost:3000 to see the frontend.

Backend (Flask)
Clone the backend repository (if separate) or navigate to the backend folder:

bash
Copy code
cd blog-backend
Set up a Python virtual environment:

bash
Copy code
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
Install the dependencies:

bash
Copy code
pip install -r requirements.txt
Set up the SQLite database:

bash
Copy code
python
>>> from app import db
>>> db.create_all()
Start the Flask server:

bash
Copy code
python app.py
Visit http://127.0.0.1:5000 to test the backend.

Project Structure
plaintext
Copy code
blog-platform/
│
├── blog-frontend/        # Next.js frontend
│   ├── src/              # Source files
│   ├── pages/            # API routes
│   └── ...               # Other files
│
├── blog-backend/         # Flask backend
│   ├── app.py            # Main Flask application
│   ├── models.py         # Database models
│   └── ...               # Other files
│
└── README.md             # Setup instructions
