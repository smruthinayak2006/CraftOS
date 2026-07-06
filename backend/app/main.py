from uuid import uuid4
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(
    title="CraftOS API",
    version="0.1.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProjectCreate(BaseModel):
    name: str
    description: str = ""


projects = []


@app.get("/")
def root():
    return {
        "message": "CraftOS API is running"
    }


@app.get("/projects")
def get_projects():
    return projects

@app.get("/projects/{project_id}")
def get_project(project_id: str):
    for project in projects:
        if project["id"] == project_id:
            return project

    raise HTTPException(
        status_code=404,
        detail="Project not found",
    )


@app.post("/projects")
def create_project(project: ProjectCreate):
    new_project = {
        "id": str(uuid4()),
        "name": project.name,
        "description": project.description,
    }

    projects.append(new_project)

    return new_project