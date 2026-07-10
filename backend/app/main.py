from pathlib import Path
import shutil

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.database import initialize_database
import app.crud as crud

app = FastAPI(
    title="CraftOS API",
    version="0.1.0"
)

initialize_database()

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
    return crud.get_projects()


@app.get("/projects/{project_id}")
def get_project(project_id: str):

    project = crud.get_project(project_id)

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return project


@app.post("/projects")
def create_project(project: ProjectCreate):
    return crud.create_project(
        project.name,
        project.description,
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

    if not project.get("readme"):
        raise HTTPException(
            status_code=404,
            detail="README not uploaded"
        )

    return FileResponse(
        path=project["readme"],
        filename="README.md",
        media_type="text/markdown"
    )


@app.post("/projects/{project_id}/screenshots")
def upload_screenshot(
    project_id: str,
    file: UploadFile = File(...)
):

    project = next(
        (p for p in projects if p["id"] == project_id),
        None
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    extension = Path(file.filename).suffix

    filename = f"{Path(file.filename).stem}{extension}"

    destination = SCREENSHOT_UPLOAD_DIR / filename

    with open(destination, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    project["screenshots"].append(filename)

    return {
        "message": "Screenshot uploaded successfully",
        "filename": filename,
    }


@app.get("/projects/{project_id}/screenshots")
def get_screenshots(project_id: str):

    project = next(
        (p for p in projects if p["id"] == project_id),
        None
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    return {
        "screenshots": project["screenshots"]
    }


@app.get("/screenshots/{filename}")
def get_screenshot(filename: str):

    image_path = SCREENSHOT_UPLOAD_DIR / filename

    if not image_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Screenshot not found"
        )

    return FileResponse(image_path)


@app.delete("/projects/{project_id}")
def delete_project(project_id: str):

    project = next(
        (p for p in projects if p["id"] == project_id),
        None
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    if project.get("readme"):

        readme_path = Path(project["readme"])

        if readme_path.exists():
            readme_path.unlink()

    for screenshot in project["screenshots"]:

        image_path = SCREENSHOT_UPLOAD_DIR / screenshot

        if image_path.exists():
            image_path.unlink()

    projects.remove(project)

    return {
        "message": "Project deleted successfully"
    }