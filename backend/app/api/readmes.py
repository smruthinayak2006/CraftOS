from pathlib import Path
import shutil

from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import FileResponse

import app.crud as crud

router = APIRouter(
    tags=["Readme"],
)

README_UPLOAD_DIR = Path("uploads/readmes")
README_UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


@router.post("/projects/{project_id}/readme")
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


@router.get("/projects/{project_id}/readme")
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