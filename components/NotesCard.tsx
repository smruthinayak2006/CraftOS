"use client";

import { useEffect, useState } from "react";

import {
  getNote,
  saveNote,
  deleteNote,
} from "@/app/lib/api";

type Props = {
  projectId: string;
};

export default function NotesCard({
  projectId,
}: Props) {
  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  async function loadNote() {
    try {
      const data = await getNote(projectId);

      setContent(data.content);
    } catch {
      alert("Failed to load notes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNote();
  }, []);

  async function handleSave() {
    try {
      setSaving(true);

      await saveNote(
        projectId,
        content
      );

      alert("Notes saved.");
    } catch {
      alert("Failed to save notes.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete all notes?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteNote(projectId);

      setContent("");

      alert("Notes deleted.");
    } catch {
      alert("Failed to delete notes.");
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-semibold">
          Notes
        </h2>

        <div className="flex gap-2">

          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium transition hover:bg-emerald-700 disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : "Save"}
          </button>

          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium transition hover:bg-red-700"
          >
            Clear
          </button>

        </div>

      </div>

      {loading ? (

        <p className="mt-6 text-zinc-500">
          Loading...
        </p>

      ) : (

        <textarea
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          placeholder="Write project notes..."
          className="mt-6 h-64 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-sm outline-none transition focus:border-blue-500"
        />

      )}

    </div>
  );
}