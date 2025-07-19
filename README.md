# Task Manager Application

A full-stack web application for managing tasks with user authentication, built using Django (REST API) and React (TypeScript, Vite) for the frontend.

---

## Features
- User registration and login (JWT authentication)
- Add, view, complete, and delete tasks
- Filter tasks by Pending, Missing, and Completed
- Responsive, modern UI with beautiful styling
- Protected routes for authenticated users

---

## Tech Stack
- **Backend:** Django, Django REST Framework, SimpleJWT
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Database:** SQLite (default, can be changed)

---

## Project Structure

```
task_manager_api/
  ├── core/                # Django project settings
  ├── tasks/               # Task management app (API)
  ├── users/               # User management app (API)
  ├── manage.py            # Django entry point
  ├── db.sqlite3           # SQLite database
  ├── requirements.txt     # Python dependencies
  └── task-manager-frontend/ # React frontend
```

---

## Setup Instructions

### 1. Backend (Django API)

#### a. Install dependencies
```bash
cd task_manager_api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### b. Run migrations
```bash
python manage.py migrate
```

#### c. Create a superuser (optional, for admin access)
```bash
python manage.py createsuperuser
```

#### d. Start the backend server
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/`

---

### 2. Frontend (React)

#### a. Install dependencies
```bash
cd task-manager-frontend
npm install
```

#### b. Start the frontend server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173/`

---

## Usage

1. Register a new user or log in with existing credentials.
2. Add new tasks with a title, description, and deadline.
3. View tasks filtered by Pending, Missing, or Completed using the navigation bar.
4. Mark tasks as complete or delete them as needed.
5. Use the "Back to Dashboard" button to return to the main dashboard from any page.

---

## API Overview

- All API endpoints are prefixed with `/api/`.
- See the [Swagger docs](http://localhost:8000/swagger/) for full API documentation.
- Example endpoints:
  - `POST /api/register/` — Register a new user
  - `POST /api/login/` — Obtain JWT tokens
  - `GET /api/tasks/` — List all tasks (filter with `?status=`)
  - `POST /api/tasks/{id}/mark_complete/` — Mark a task as complete

---

## Screenshots

### Register Page
![Register](task-manager-frontend/screenshots/register.png)

### Login Page
![Login](task-manager-frontend/screenshots/login.png)

### Dashboard
![Dashboard](task-manager-frontend/screenshots/dashboard.png)

### Pending Tasks
![Pending Tasks](task-manager-frontend/screenshots/pending-tasks.png)

### Missing Tasks
![Missing Tasks](task-manager-frontend/screenshots/missing-tasks.png)

### Completed Tasks
![Completed Tasks](task-manager-frontend/screenshots/completed-tasks.png)

### Add Task Page
![Add Task](task-manager-frontend/screenshots/add-task.png)

---

## Notes
- CORS is enabled for `http://localhost:5173` by default.
- All main pages are protected and require login.
- For any issues, check the browser console or Django server logs.

---

## License
This project is for educational/demo purposes created with love by Devanshu. 