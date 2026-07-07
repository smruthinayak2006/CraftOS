# CraftOS

> AI-powered developer workspace for managing software projects, documentation, screenshots, and AI-generated content.

## Overview

CraftOS is a full-stack project management platform designed for developers. It provides a centralized workspace where users can create projects, organize documentation, upload README files, manage screenshots, and prepare AI-generated project content.

The current version focuses on building the backend API and frontend integration using FastAPI and Next.js.

---

## Features

### Project Management

- Create new projects
- View all projects
- View individual project details
- Unique UUID generated for every project

### README Management

- Upload README files
- Download uploaded README files
- Store uploaded README files on the server
- Validate missing README requests

### REST API

- FastAPI backend
- Automatic Swagger documentation
- OpenAPI schema generation
- JSON responses
- HTTP error handling

### Frontend

- Modern Next.js interface
- Dark developer-focused UI
- Dashboard showing recent projects
- Project workspace page
- Backend API integration

---

## Tech Stack

### Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS

### Backend

- FastAPI
- Python
- Pydantic
- Uvicorn

### Development

- Git
- GitHub
- VS Code

---

## Project Structure

```
CraftOS/
│
├── app/
│   ├── lib/
│   ├── project/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── backend/
│   ├── app/
│   │   └── main.py
│   │
│   ├── uploads/
│   │   └── readmes/
│   │
│   ├── requirements.txt
│   └── venv/
│
├── components/
│
├── docs/
│   └── screenshots/
│
└── README.md
```

---

## Current API Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | `/` | API Status |
| GET | `/projects` | List all projects |
| POST | `/projects` | Create project |
| GET | `/projects/{project_id}` | Get project details |
| POST | `/projects/{project_id}/readme` | Upload README |
| GET | `/projects/{project_id}/readme` | Download README |

---

## Screenshots

### Dashboard

`docs/screenshots/frontend-dashboard.png`

### Project Workspace

`docs/screenshots/project-workspace.png`

### Create Project API

`docs/screenshots/create-project-api-success.png`

### Get Projects API

`docs/screenshots/get-projects-api-success.png`

### Get Project by ID

`docs/screenshots/get-project-by-id-success.png`

### Upload README

`docs/screenshots/readme-upload-success.png`

### Download README

`docs/screenshots/readme-download-success.png`

---

## Running the Project

### Clone Repository

```bash
git clone <repository-url>
cd CraftOS
```

---

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger UI

```
http://127.0.0.1:8000/docs
```

---

### Frontend

Open another terminal.

```bash
npm install

npm run dev
```

Frontend

```
http://localhost:3000
```

---

## Current Workflow

```
Create Project
        │
        ▼
Project stored in backend
        │
        ▼
Open Project Workspace
        │
        ▼
Upload README
        │
        ▼
README stored in uploads/readmes/
        │
        ▼
Download README
```

---

## Current Limitations

- Projects are stored in memory.
- Data is lost when the backend restarts.
- Screenshot upload UI is not implemented yet.
- AI content generation is under development.
- Authentication is not implemented.

---

## Planned Features

- SQLite database
- Screenshot upload
- Notes editor
- AI README generation
- AI documentation assistant
- AI project summaries
- Project search
- User authentication
- Dashboard analytics

---

## Development Progress

### Completed

- Project initialization
- FastAPI backend
- Next.js frontend
- Project creation
- Project listing
- Project details
- README upload
- README download
- Swagger documentation

### In Progress

- Persistent database
- Screenshot management

---

## Author

Smruthi Nayak

B.Tech Computer Science Engineering

Internship Project

2026