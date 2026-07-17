# CraftOS Architecture

## Overview

CraftOS follows a client-server architecture.

```
Next.js Frontend
        │
 REST API (HTTP)
        │
        ▼
FastAPI Backend
        │
        ├──────────────┐
        │              │
        ▼              ▼
SQLite Database   uploads/
                  ├── readmes/
                  └── screenshots/
```

---

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

Responsibilities

- Project dashboard
- Project workspace
- README viewer
- Screenshot gallery
- API communication

---

## Backend

FastAPI

Modules

```
app/
├── api/
├── crud.py
├── database.py
└── main.py
```

Responsibilities

- CRUD
- File uploads
- SQLite
- REST API

---

## Database

SQLite

Tables

- projects

---

## File Storage

uploads/

- readmes/
- screenshots/

---

## Request Flow

```
Browser

↓

Next.js

↓

FastAPI

↓

SQLite

↓

JSON Response

↓

Frontend UI
```