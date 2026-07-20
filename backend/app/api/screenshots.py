from pathlib import Path
import shutil
from uuid import uuid4

from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import FileResponse

import app.crud as crud

router = APIRouter(
    tags=["Screenshots"],
)

SCREENSHOT_UPLOAD_DIR = Path("uploads/screenshots")
SCREENSHOT_UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


@router.post("/projects/{project_id}/screenshots")
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

    filename = f"{uuid4()}{extension}"

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


@router.get("/projects/{project_id}/screenshots")
def get_screenshots(project_id: str):

    project = crud.get_project(project_id)

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return {
        "screenshots": project["screenshots"]
    }


@router.get("/screenshots/{filename}")
def get_screenshot(filename: str):

    image_path = SCREENSHOT_UPLOAD_DIR / filename

    if not image_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Screenshot not found",
        )

    return FileResponse(image_path)

@router.delete("/screenshots/{filename}")
def delete_screenshot(filename: str):

    crud.delete_screenshot(filename)

    return {
        "message": "Screenshot deleted successfully"
    }