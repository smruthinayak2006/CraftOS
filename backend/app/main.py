from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import initialize_database

from app.api.projects import router as projects_router
from app.api.readmes import router as readmes_router
from app.api.screenshots import router as screenshots_router

app = FastAPI(
    title="CraftOS API",
    version="0.1.0",
)

initialize_database()

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


@app.get("/")
def root():
    return {
        "message": "CraftOS API is running"
    }


app.include_router(projects_router)
app.include_router(readmes_router)
app.include_router(screenshots_router)