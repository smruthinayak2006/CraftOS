from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

import app.crud as crud

router = APIRouter(
    tags=["Notes"],
)


class NoteRequest(BaseModel):
    content: str


@router.get("/projects/{project_id}/notes")
def get_note(project_id: str):

    project = crud.get_project(project_id)

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    content = crud.get_note(project_id)

    return {
        "content": content or ""
    }


@router.post("/projects/{project_id}/notes")
def save_note(
    project_id: str,
    request: NoteRequest,
):

    project = crud.get_project(project_id)

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    crud.save_note(
        project_id,
        request.content,
    )

    return {
        "message": "Note saved successfully"
    }


@router.delete("/projects/{project_id}/notes")
def delete_note(project_id: str):

    project = crud.get_project(project_id)

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    crud.delete_note(project_id)

    return {
        "message": "Note deleted successfully"
    }