"use client";

import Link from "next/link";

type Project = {
  id: string;
  name: string;
  description: string;
  readme: string | null;
  screenshots: string[];
};

type Props = {
  project: Project;
};

export default function ProjectCard({
  project,
}: Props) {
  return (
    <Link
      href={`/project/${project.id}`}
      className="group"
    >
      <article className="h-full rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-zinc-900">

        <div className="flex items-start justify-between">

          <div>

            <h3 className="text-xl font-semibold text-white transition group-hover:text-blue-400">
              {project.name}
            </h3>

            <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-400">
              {project.description || "No description provided."}
            </p>

          </div>

          <div className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
            Project
          </div>

        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              README
            </p>

            <p className="mt-2 text-lg font-semibold">

              {project.readme
                ? "Available"
                : "Missing"}

            </p>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Screenshots
            </p>

            <p className="mt-2 text-lg font-semibold">
              {project.screenshots.length}
            </p>

          </div>

        </div>

        <div className="mt-8 flex items-center justify-between border-t border-zinc-800 pt-5">

          <span className="text-sm text-zinc-500">
            Open Workspace
          </span>

          <span className="text-lg transition group-hover:translate-x-1">
            →
          </span>

        </div>

      </article>
    </Link>
  );
}