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