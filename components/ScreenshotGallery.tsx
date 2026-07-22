"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import {
  getScreenshotUrl,
  uploadScreenshot,
  deleteScreenshot,
} from "@/app/lib/api";

type Props = {
  projectId: string;
  screenshots: string[];
  onRefresh: () => void;
};

export default function ScreenshotGallery({
  projectId,
  screenshots,
  onRefresh,
}: Props) {

  const inputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {

    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {

      setUploading(true);

      await uploadScreenshot(
        projectId,
        file
      );

      onRefresh();

    } catch {

      alert("Failed to upload screenshot.");

    } finally {

      setUploading(false);

      event.target.value = "";

    }

  }

  async function handleDelete(
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

      onRefresh();

    } catch {

      alert("Failed to delete screenshot.");

    }

  }

  return (

    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm uppercase tracking-widest text-purple-400">
            Assets
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Screenshot Gallery
          </h2>

        </div>

        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold transition hover:bg-emerald-700 disabled:opacity-60"
        >
          {uploading
            ? "Uploading..."
            : "Upload Screenshot"}
        </button>

      </div>

      <p className="mt-4 text-zinc-400">
        Store UI previews, diagrams, architecture images,
        and project screenshots in one place.
      </p>

      {screenshots.length === 0 ? (

        <div className="mt-10 rounded-2xl border border-dashed border-zinc-700 bg-zinc-950 p-16 text-center">

          <div className="text-6xl">
            🖼️
          </div>

          <h3 className="mt-6 text-2xl font-semibold">
            No screenshots yet
          </h3>

          <p className="mt-3 text-zinc-500">
            Upload your first screenshot to start building
            your project gallery.
          </p>

        </div>

      ) : (

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {screenshots.map((filename) => (

            <div
              key={filename}
              className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition hover:border-blue-500"
            >

              <a
                href={getScreenshotUrl(filename)}
                target="_blank"
                rel="noopener noreferrer"
              >

                <div className="relative aspect-video">

                  <Image
                    src={getScreenshotUrl(filename)}
                    alt="Project Screenshot"
                    fill
                    unoptimized
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                </div>

              </a>

              <div className="flex items-center justify-between border-t border-zinc-800 p-4">

                <p className="truncate text-sm text-zinc-400">
                  Screenshot
                </p>

                <button
                  onClick={() =>
                    handleDelete(filename)
                  }
                  className="rounded-lg bg-red-600 px-3 py-2 text-sm transition hover:bg-red-700"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />

    </section>

  );

}