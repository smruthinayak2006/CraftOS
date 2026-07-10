"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  getScreenshotUrl,
  deleteProject,
} from "@/app/lib/api";

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

export default function ProjectDetails({
  project,
}: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this project?\n\nThis will permanently remove:\n• Project\n• README\n• All screenshots"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject(project.id);

      alert("Project deleted successfully.");

      router.push("/");
      router.refresh();
    } catch {
      alert("Failed to delete project.");
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-8 py-12">

        <div className="flex items-center justify-between">

          <Link
            href="/"
            className="text-zinc-400 hover:text-white"
          >
            ← Back
          </Link>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-700"
          >
            Delete Project
          </button>

        </div>

        <h1 className="mt-6 text-5xl font-bold">
          {project.name}
        </h1>

        <p className="mt-3 text-xl text-zinc-400">
          {project.description || "No description"}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="text-2xl font-semibold">
              README
            </h2>

            <p className="mt-4 text-zinc-500">
              {project.readme
                ? "README uploaded"
                : "Not uploaded"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="text-2xl font-semibold">
              Screenshots
            </h2>

            {project.screenshots.length === 0 ? (
              <p className="mt-4 text-zinc-500">
                No screenshots uploaded
              </p>
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-4">

                {project.screenshots.map((filename) => (
                  <a
                    key={filename}
                    href={getScreenshotUrl(filename)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={getScreenshotUrl(filename)}
                      alt={filename}
                      width={400}
                      height={240}
                      className="rounded-lg border border-zinc-700 object-cover transition hover:scale-105"
                    />
                  </a>
                ))}

              </div>
            )}
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="text-2xl font-semibold">
              Notes
            </h2>

            <p className="mt-4 text-zinc-500">
              Empty
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="text-2xl font-semibold">
              Generated Content
            </h2>

            <p className="mt-4 text-zinc-500">
              0 drafts
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}