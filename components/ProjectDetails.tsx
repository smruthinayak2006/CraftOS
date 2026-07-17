"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import {
  getScreenshotUrl,
  getReadmeUrl,
  uploadReadme,
  uploadScreenshot,
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

  const readmeInputRef =
    useRef<HTMLInputElement>(null);

  const screenshotInputRef =
    useRef<HTMLInputElement>(null);

  const [uploadingReadme, setUploadingReadme] =
    useState(false);

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

  async function handleReadmeUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploadingReadme(true);

      await uploadReadme(
        project.id,
        file
      );

      router.refresh();

      alert("README uploaded successfully.");
    } catch {
      alert("Failed to upload README.");
    } finally {
      setUploadingReadme(false);

      event.target.value = "";
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

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-semibold">
                README
              </h2>

              <button
                onClick={() => readmeInputRef.current?.click()}
                disabled={uploadingReadme}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium transition hover:bg-emerald-700 disabled:opacity-60"
              >
                {uploadingReadme
                  ? "Uploading..."
                  : project.readme
                    ? "Replace"
                    : "Upload"}
              </button>

            </div>

            {!project.readme ? (

              <p className="mt-6 text-zinc-500">
                No README uploaded.
              </p>

            ) : (

              <div className="mt-6 space-y-4">

                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="font-medium">
                    📄 README.md
                  </p>

                  <p className="mt-2 text-sm text-zinc-500">
                    Stored successfully.
                  </p>
                </div>

                <button
                  onClick={() =>
                    window.open(
                      getReadmeUrl(project.id),
                      "_blank"
                    )
                  }
                  className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition hover:bg-blue-700"
                >
                  View README
                </button>

              </div>

            )}

          </div>

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
                  <a
                    key={filename}
                    href={getScreenshotUrl(filename)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition hover:border-blue-500"
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
                ))}

              </div>

            )}

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

            <h2 className="text-2xl font-semibold">
              Notes
            </h2>

            <p className="mt-5 text-zinc-500">
              Coming in the next update.
            </p>

          </div>

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
          ref={readmeInputRef}
          type="file"
          accept=".md,.txt"
          className="hidden"
          onChange={handleReadmeUpload}
        />

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