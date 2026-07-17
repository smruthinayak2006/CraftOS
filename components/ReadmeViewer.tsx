"use client";

import { useEffect, useState } from "react";

import {
  getReadmeContent,
  uploadReadme,
} from "@/app/lib/api";

type Props = {
  projectId: string;
  hasReadme: boolean;
};

export default function ReadmeViewer({
  projectId,
  hasReadme,
}: Props) {
  const [content, setContent] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  useEffect(() => {
    if (!hasReadme) {
      return;
    }

    loadReadme();
  }, [hasReadme]);

  async function loadReadme() {
    try {
      setLoading(true);

      const data =
        await getReadmeContent(projectId);

      setContent(data.content);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploading(true);

      await uploadReadme(
        projectId,
        file
      );

      await loadReadme();

      location.reload();
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-semibold">
          README
        </h2>

        <label className="cursor-pointer rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium transition hover:bg-emerald-700">

          {uploading
            ? "Uploading..."
            : hasReadme
              ? "Replace"
              : "Upload"}

          <input
            hidden
            type="file"
            accept=".md,.txt"
            onChange={handleUpload}
          />

        </label>

      </div>

      {!hasReadme && (

        <p className="mt-6 text-zinc-500">
          No README uploaded.
        </p>

      )}

      {loading && (

        <p className="mt-6 text-zinc-500">
          Loading README...
        </p>

      )}

      {hasReadme && !loading && (

        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-5">

          <pre className="whitespace-pre-wrap break-words text-sm leading-7 text-zinc-300">
            {content}
          </pre>

        </div>

      )}

    </div>
  );
}