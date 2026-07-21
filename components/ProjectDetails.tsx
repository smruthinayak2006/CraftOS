"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import ReadmeViewer from "./ReadmeViewer";
import NotesCard from "./NotesCard";

import {
  getScreenshotUrl,
  uploadScreenshot,
  deleteScreenshot,
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

  const screenshotInputRef =
    useRef<HTMLInputElement>(null);

  const [
    uploadingScreenshot,
    setUploadingScreenshot,
  ] = useState(false);

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

  async function handleScreenshotUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploadingScreenshot(true);

      await uploadScreenshot(
        project.id,
        file
      );

      router.refresh();

      alert("Screenshot uploaded successfully.");
    } catch {
      alert("Failed to upload screenshot.");
    } finally {
      setUploadingScreenshot(false);

      event.target.value = "";
    }
  }
  async function handleDeleteScreenshot(
    filename: string
  ) {
    const confirmed = window.confirm(
      "Delete this screenshot?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteScreenshot(filename);

      router.refresh();

      alert("Screenshot deleted successfully.");
    } catch {
      alert("Failed to delete screenshot.");
    }
  }
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-8 py-12">

        <div className="flex items-center justify-between">

          <Link
            href="/"
            className="text-zinc-400 transition hover:text-white"
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

          <ReadmeViewer
            projectId={project.id}
            hasReadme={!!project.readme}
          />

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-semibold">
                Screenshots
              </h2>

              <button
                onClick={() =>
                  screenshotInputRef.current?.click()
                }
                disabled={uploadingScreenshot}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium transition hover:bg-emerald-700 disabled:opacity-60"
              >
                {uploadingScreenshot
                  ? "Uploading..."
                  : "Upload"}
              </button>

            </div>

            {project.screenshots.length === 0 ? (

              <p className="mt-6 text-zinc-500">
                No screenshots uploaded.
              </p>

            ) : (

              <div className="mt-6 grid grid-cols-2 gap-4">

                {project.screenshots.map((filename) => (
                  <div
                    key={filename}
                    className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition hover:border-blue-500"
                  >

                    <button
                      onClick={() =>
                        handleDeleteScreenshot(filename)
                      }
                      className="absolute right-2 top-2 z-10 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-700"
                    >
                      🗑
                    </button>

                    <a
                      href={getScreenshotUrl(filename)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="relative aspect-video w-full overflow-hidden">

                        <Image
                          src={getScreenshotUrl(filename)}
                          alt="Project Screenshot"
                          fill
                          unoptimized
                          className="object-cover transition duration-300 group-hover:scale-105"
                        />

                      </div>
                    </a>

                  </div>
                ))}

              </div>

            )}

          </div>

          <NotesCard
            projectId={project.id}
          />

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

            <h2 className="text-2xl font-semibold">
              Generated Content
            </h2>

            <div className="mt-5 space-y-3">

              <button className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-left transition hover:border-blue-500">
                Generate README
              </button>

              <button className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-left transition hover:border-blue-500">
                Generate LinkedIn Post
              </button>

              <button className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-left transition hover:border-blue-500">
                Generate Release Notes
              </button>

            </div>

          </div>

        </div>

        <input
          ref={screenshotInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleScreenshotUpload}
        />

      </div>
    </main>
  );
}