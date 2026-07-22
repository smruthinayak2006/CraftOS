"use client";

import Link from "next/link";

type Props = {
  name: string;
  description: string;
  hasReadme: boolean;
  screenshotCount: number;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ProjectHeader({
  name,
  description,
  hasReadme,
  screenshotCount,
  onEdit,
  onDelete,
}: Props) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-blue-950/20 p-10">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

        <div className="max-w-3xl">

          <Link
            href="/"
            className="text-sm text-zinc-500 transition hover:text-white"
          >
            ← Back to Dashboard
          </Link>

          <h1 className="mt-5 text-5xl font-bold tracking-tight">
            {name}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
            {description || "No description provided."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            <StatusBadge
              label="README"
              value={
                hasReadme
                  ? "Available"
                  : "Missing"
              }
              color={
                hasReadme
                  ? "green"
                  : "red"
              }
            />

            <StatusBadge
              label="Screenshots"
              value={`${screenshotCount}`}
              color="blue"
            />

          </div>

        </div>

        <div className="flex flex-col gap-3">

          <button
            onClick={onEdit}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
          >
            Edit Project
          </button>

          <button
            onClick={onDelete}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
          >
            Delete Project
          </button>

        </div>

      </div>

    </section>
  );
}

type BadgeProps = {
  label: string;
  value: string;
  color: "green" | "red" | "blue";
};

function StatusBadge({
  label,
  value,
  color,
}: BadgeProps) {

  const colors = {
    green:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",

    red:
      "border-red-500/20 bg-red-500/10 text-red-400",

    blue:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",
  };

  return (
    <div
      className={`rounded-full border px-4 py-2 text-sm font-medium ${colors[color]}`}
    >
      {label}: {value}
    </div>
  );
}