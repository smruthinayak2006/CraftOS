"use client";

import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  initialName: string;
  initialDescription: string;
  onClose: () => void;
  onSave: (
    name: string,
    description: string
  ) => Promise<void>;
};

export default function EditProjectModal({
  isOpen,
  initialName,
  initialDescription,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] =
    useState(initialDescription);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    setName(initialName);
    setDescription(initialDescription);
  }, [
    initialName,
    initialDescription,
    isOpen,
  ]);

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setSaving(true);

      await onSave(
        name,
        description
      );

      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl bg-zinc-900 p-8"
      >

        <h2 className="text-2xl font-bold text-white">
          Edit Project
        </h2>

        <input
          className="mt-6 w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white outline-none"
          placeholder="Project name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <textarea
          className="mt-4 h-32 w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white outline-none"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <div className="mt-8 flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-zinc-700 px-5 py-2 text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </form>

    </div>
  );
}