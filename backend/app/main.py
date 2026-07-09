from uuid import uuid4
from pathlib import Path
import shutil

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="CraftOS API",
    version="0.1.0"
)


README_UPLOAD_DIR = Path("uploads/readmes")
README_UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True,
)

SCREENSHOT_UPLOAD_DIR = Path("uploads/screenshots")
SCREENSHOT_UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True,
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


@app.post("/projects/{project_id}/readme")
def upload_readme(
    project_id: str,
    file: UploadFile = File(...)
):
    project = next(
        (project for project in projects if project["id"] == project_id),
        None,
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    file_path = README_UPLOAD_DIR / f"{project_id}.md"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    project["readme"] = str(file_path)

    return {
        "message": "README uploaded successfully",
        "filename": file.filename,
    }


@app.get("/projects/{project_id}/readme")
def get_readme(project_id: str):

    project = next(
        (p for p in projects if p["id"] == project_id),
        None
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    if "readme" not in project:
        raise HTTPException(
            status_code=404,
            detail="README not uploaded"
        )

    return FileResponse(
        path=project["readme"],
        filename="README.md",
        media_type="text/markdown"
    )


@app.post("/projects")
def create_project(project: ProjectCreate):
    new_project = {
        "id": str(uuid4()),
        "name": project.name,
        "description": project.description,
        "readme": None,
        "screenshots": [],
    }

    projects.append(new_project)

    return new_project