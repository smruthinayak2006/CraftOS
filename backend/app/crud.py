from pathlib import Path
from uuid import uuid4
import os

from app.database import get_connection


def create_project(name: str, description: str):
    connection = get_connection()
    cursor = connection.cursor()

    project_id = str(uuid4())

    cursor.execute(
        """
        INSERT INTO projects
        (
            id,
            name,
            description,
            readme_path
        )
        VALUES (?, ?, ?, ?)
        """,
        (
            project_id,
            name,
            description,
            None,
        ),
    )

    connection.commit()
    connection.close()

    return {
        "id": project_id,
        "name": name,
        "description": description,
        "readme": None,
        "screenshots": [],
    }


def get_projects():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT *
        FROM projects
        ORDER BY created_at DESC
        """
    )

    rows = cursor.fetchall()

    projects = []

    for row in rows:

        screenshot_cursor = connection.cursor()

        screenshot_cursor.execute(
            """
            SELECT filename
            FROM screenshots
            WHERE project_id = ?
            """,
            (row["id"],),
        )

        screenshots = [
            image["filename"]
            for image in screenshot_cursor.fetchall()
        ]

        projects.append(
            {
                "id": row["id"],
                "name": row["name"],
                "description": row["description"],
                "readme": row["readme_path"],
                "screenshots": screenshots,
            }
        )

    connection.close()

    return projects


def get_project(project_id: str):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT *
        FROM projects
        WHERE id = ?
        """,
        (project_id,),
    )

    row = cursor.fetchone()

    if not row:
        connection.close()
        return None

    screenshot_cursor = connection.cursor()

    screenshot_cursor.execute(
        """
        SELECT filename
        FROM screenshots
        WHERE project_id = ?
        """,
        (project_id,),
    )

    screenshots = [
        image["filename"]
        for image in screenshot_cursor.fetchall()
    ]

    connection.close()

    return {
        "id": row["id"],
        "name": row["name"],
        "description": row["description"],
        "readme": row["readme_path"],
        "screenshots": screenshots,
    }


def upload_readme(project_id: str, file_path: Path):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT id
        FROM projects
        WHERE id = ?
        """,
        (project_id,),
    )

    if not cursor.fetchone():
        connection.close()
        return False

    cursor.execute(
        """
        UPDATE projects
        SET readme_path = ?
        WHERE id = ?
        """,
        (
            str(file_path),
            project_id,
        ),
    )

    connection.commit()
    connection.close()

    return True


def get_readme(project_id: str):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT readme_path
        FROM projects
        WHERE id = ?
        """,
        (project_id,),
    )

    row = cursor.fetchone()

    connection.close()

    if not row:
        return None

    return row["readme_path"]


def add_screenshot(project_id: str, filename: str):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT id
        FROM projects
        WHERE id = ?
        """,
        (project_id,),
    )

    if not cursor.fetchone():
        connection.close()
        return False

    cursor.execute(
        """
        INSERT INTO screenshots
        (
            project_id,
            filename
        )
        VALUES (?, ?)
        """,
        (
            project_id,
            filename,
        ),
    )

    connection.commit()
    connection.close()

    return True


def get_screenshots(project_id: str):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT filename
        FROM screenshots
        WHERE project_id = ?
        ORDER BY id
        """,
        (project_id,),
    )

    screenshots = [
        row["filename"]
        for row in cursor.fetchall()
    ]

    connection.close()

    return screenshots


def delete_project(project_id: str):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT readme_path
        FROM projects
        WHERE id = ?
        """,
        (project_id,),
    )

    project = cursor.fetchone()

    if not project:
        connection.close()
        return False

    cursor.execute(
        """
        SELECT filename
        FROM screenshots
        WHERE project_id = ?
        """,
        (project_id,),
    )

    screenshots = cursor.fetchall()

    readme_path = project["readme_path"]

    if readme_path:

        readme_file = Path(readme_path)

        if readme_file.exists():
            readme_file.unlink()

    screenshot_directory = Path("uploads/screenshots")

    for screenshot in screenshots:

        image = screenshot_directory / screenshot["filename"]

        if image.exists():
            image.unlink()

    cursor.execute(
        """
        DELETE FROM screenshots
        WHERE project_id = ?
        """,
        (project_id,),
    )

    cursor.execute(
        """
        DELETE FROM projects
        WHERE id = ?
        """,
        (project_id,),
    )

    connection.commit()
    connection.close()

    return True