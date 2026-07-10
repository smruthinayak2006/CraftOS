const API_URL = "http://127.0.0.1:8000";

export async function getProjects() {
  const response = await fetch(`${API_URL}/projects`);
  return response.json();
}

export async function createProject(
  name: string,
  description: string
) {
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });

  return response.json();
}

export async function getProject(id: string) {
  const response = await fetch(`${API_URL}/projects/${id}`);

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function deleteProject(id: string) {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete project");
  }

  return response.json();
}

export function getScreenshotUrl(filename: string) {
  return `${API_URL}/screenshots/${filename}`;
}

export function getReadmeUrl(projectId: string) {
  return `${API_URL}/projects/${projectId}/readme`;
}