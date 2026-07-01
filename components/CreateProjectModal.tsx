"use client";

import { useState } from "react";

type CreateProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
};

export default function CreateProjectModal({
  isOpen,
  onClose,
  onCreate,
}: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  function handleCreate() {
    if (!name.trim()) return;

    onCreate(name, description);

    setName("");
    setDescription("");

    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white">
          Create Project
        </h2>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Project Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="IoT Honeypot"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Description (Optional)
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe your project..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white outline-none focus:border-white"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-5 py-2 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="rounded-xl bg-white px-5 py-2 font-medium text-black"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}