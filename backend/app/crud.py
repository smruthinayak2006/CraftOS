from uuid import uuid4

from app.database import get_connection


def create_project(name: str, description: str):
    connection = get_connection()
    cursor = connection.cursor()

    project_id = str(uuid4())

    cursor.execute(
        """
        INSERT INTO projects (
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