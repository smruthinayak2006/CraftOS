from pathlib import Path
import shutil

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

from app.database import initialize_database
import app.crud as crud
from app.api.projects import router as project_router

app = FastAPI(
    title="CraftOS API",
    version="0.1.0",
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

app.include_router(project_router)


@app.get("/")
def root():
    return {
        "message": "CraftOS API is running"
    }


@app.post("/projects/{project_id}/readme")
def upload_readme(
    project_id: str,
    file: UploadFile = File(...),
):

    project = crud.get_project(project_id)

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    file_path = README_UPLOAD_DIR / f"{project_id}.md"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    crud.upload_readme(
        project_id,
        file_path,
    )

    return {
        "message": "README uploaded successfully",
        "filename": file.filename,
    }


@app.get("/projects/{project_id}/readme")
def get_readme(project_id: str):

    readme_path = crud.get_readme(project_id)

    if not readme_path:
        raise HTTPException(
            status_code=404,
            detail="README not uploaded",
        )

    return FileResponse(
        path=readme_path,
        filename="README.md",
        media_type="text/markdown",
    )


@app.post("/projects/{project_id}/screenshots")
def upload_screenshot(
    project_id: str,
    file: UploadFile = File(...),
):

    project = crud.get_project(project_id)

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    extension = Path(file.filename).suffix

    filename = f"{project_id}_{len(project['screenshots']) + 1}{extension}"

    destination = SCREENSHOT_UPLOAD_DIR / filename

    with open(destination, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    crud.add_screenshot(
        project_id,
        filename,
    )

    return {
        "message": "Screenshot uploaded successfully",
        "filename": filename,
    }


@app.get("/projects/{project_id}/screenshots")
def get_screenshots(project_id: str):

    project = crud.get_project(project_id)

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return {
        "screenshots": crud.get_screenshots(project_id)
    }


@app.get("/screenshots/{filename}")
def get_screenshot(filename: str):

    image_path = SCREENSHOT_UPLOAD_DIR / filename

    if not image_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Screenshot not found",
        )

    return FileResponse(image_path)