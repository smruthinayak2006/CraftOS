"use client";

import { useEffect, useState } from "react";
import CreateProjectModal from "@/components/CreateProjectModal";

type Project = {
  id: string;
  name: string;
  description: string;
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  function handleCreateProject(name: string, description: string) {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      description,
    };

    const updatedProjects = [newProject, ...projects];

    setProjects(updatedProjects);

    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-8 py-12">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">CraftOS</h1>

            <p className="mt-2 text-zinc-400">
              What are you building today?
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200"
          >
            + Create Project
          </button>
        </header>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold">
            Recent Projects
          </h2>

          {projects.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 p-16 text-center">
              <h3 className="text-xl font-semibold">
                No projects yet
              </h3>

              <p className="mt-3 text-zinc-500">
                Start by creating your first project.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                >
                  <h3 className="text-xl font-semibold">
                    {project.name}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-400">
                    {project.description || "No description"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </main>
  );
}