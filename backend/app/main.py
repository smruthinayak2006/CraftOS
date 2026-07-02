from uuid import uuid4

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="CraftOS API",
    version="0.1.0"
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


@app.post("/projects")
def create_project(project: ProjectCreate):
    new_project = {
        "id": str(uuid4()),
        "name": project.name,
        "description": project.description,
    }

    projects.append(new_project)

    return new_project