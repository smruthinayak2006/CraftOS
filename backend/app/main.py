from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import initialize_database

from app.api import projects
from app.api import readmes
from app.api import screenshots
from app.api import notes

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


app.include_router(projects.router)
app.include_router(readmes.router)
app.include_router(screenshots.router)
app.include_router(notes.router)