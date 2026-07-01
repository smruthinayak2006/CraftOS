"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Project = {
  id: string;
  name: string;
  description: string;
};

export default function ProjectPage() {
  const { id } = useParams();

  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");

    if (!savedProjects) return;

    const projects: Project[] = JSON.parse(savedProjects);

    const currentProject =
      projects.find((p) => p.id === id) || null;

    setProject(currentProject);
  }, [id]);

  if (!project) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-8 py-12">

        <Link
          href="/"
          className="text-zinc-400 hover:text-white"
        >
          ← Back
        </Link>

        <h1 className="mt-6 text-5xl font-bold">
          {project.name}
        </h1>

        <p className="mt-3 text-lg text-zinc-400">
          {project.description || "No description"}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">
              README
            </h2>

            <p className="mt-3 text-zinc-500">
              Not uploaded
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">
              Screenshots
            </h2>

            <p className="mt-3 text-zinc-500">
              0 uploaded
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">
              Notes
            </h2>

            <p className="mt-3 text-zinc-500">
              Empty
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">
              Generated Content
            </h2>

            <p className="mt-3 text-zinc-500">
              0 drafts
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}