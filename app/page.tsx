"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import CreateProjectModal from "@/components/CreateProjectModal";
import DashboardHero from "@/components/DashboardHero";
import DashboardStats from "@/components/DashboardStats";
import ProjectCard from "@/components/ProjectCard";
import SearchBar from "@/components/SearchBar";

import {
  getProjects,
  createProject,
} from "@/app/lib/api";

type Project = {
  id: string;
  name: string;
  description: string;
  readme: string | null;
  screenshots: string[];
};

export default function Home() {

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    async function loadProjects() {

      try {

        const data =
          await getProjects();

        setProjects(data);

      } catch {

        alert(
          "Failed to load projects."
        );

      }

    }

    loadProjects();

  }, []);

  async function handleCreateProject(
    name: string,
    description: string
  ) {

    try {

      const newProject =
        await createProject(
          name,
          description
        );

      setProjects((previous) => [
        newProject,
        ...previous,
      ]);

    } catch {

      alert(
        "Failed to create project."
      );

    }

  }

  const filteredProjects =
    useMemo(() => {

      return projects.filter(
        (project) => {

          const query =
            search.toLowerCase();

          return (
            project.name
              .toLowerCase()
              .includes(query) ||

            project.description
              .toLowerCase()
              .includes(query)
          );

        }
      );

    }, [
      projects,
      search,
    ]);

  return (

    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        <DashboardHero
          onCreateProject={() =>
            setIsModalOpen(true)
          }
        />

        <DashboardStats
          projects={projects}
        />

        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <section className="mt-12">

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h2 className="text-3xl font-bold">
                Projects
              </h2>

              <p className="mt-2 text-zinc-500">

                {filteredProjects.length}

                {" "}project

                {filteredProjects.length !== 1
                  ? "s"
                  : ""}

                {" "}available

              </p>

            </div>

            <div className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">

              Developer Workspace

            </div>

          </div>

                    {filteredProjects.length === 0 ? (

            <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/30 px-8 py-20 text-center">

              <div className="mx-auto max-w-xl">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 text-4xl">
                  📂
                </div>

                <h3 className="mt-8 text-3xl font-bold">
                  {search
                    ? "No matching projects"
                    : "No projects yet"}
                </h3>

                <p className="mt-4 leading-7 text-zinc-500">

                  {search
                    ? "Try a different search term."
                    : "Create your first project to start organizing documentation, screenshots and notes."}

                </p>

                {!search && (

                  <button
                    onClick={() =>
                      setIsModalOpen(true)
                    }
                    className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
                  >
                    Create First Project
                  </button>

                )}

              </div>

            </div>

          ) : (

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {filteredProjects.map(
                (project) => (

                  <ProjectCard
                    key={project.id}
                    project={project}
                  />

                )
              )}

            </div>

          )}

        </section>

      </div>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onCreate={
          handleCreateProject
        }
      />

    </main>

  );

}