from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

import app.crud as crud

router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
)


class ProjectRequest(BaseModel):
    name: str
    description: str


@router.get("")
def get_projects():
    return crud.get_projects()


@router.get("/{project_id}")
def get_project(project_id: str):

    project = crud.get_project(project_id)

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return project

@router.put("/{project_id}")
def update_project(
    project_id: str,
    project: ProjectRequest,
):

    existing = crud.get_project(project_id)

    if not existing:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    crud.update_project(
        project_id,
        project.name,
        project.description,
    )

    return crud.get_project(project_id)

@router.post("")
def create_project(project: ProjectRequest):

    return crud.create_project(
        project.name,
        project.description,
    )


@router.delete("/{project_id}")
def delete_project(project_id: str):

    success = crud.delete_project(project_id)

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return {
        "message": "Project deleted successfully"
    }