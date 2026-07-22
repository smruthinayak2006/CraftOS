"use client";

type Props = {
  onCreateProject: () => void;
};

export default function DashboardHero({
  onCreateProject,
}: Props) {
  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-blue-950/30">

      <div className="flex flex-col gap-10 px-10 py-12 lg:flex-row lg:items-center lg:justify-between">

        <div className="max-w-3xl">

          <div className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            AI-powered Developer Workspace
          </div>

          <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight">

            CraftOS

          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">

            Organize projects, manage documentation,
            store screenshots, write notes, and
            prepare content for publishing —
            all from one unified workspace.

          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <button
              onClick={onCreateProject}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
            >
              + New Project
            </button>

            <div className="rounded-xl border border-zinc-700 px-6 py-3 text-zinc-300">
              FastAPI • Next.js • SQLite
            </div>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6">

            <p className="text-sm text-zinc-500">
              Workspace
            </p>

            <p className="mt-3 text-2xl font-bold">
              Projects
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6">

            <p className="text-sm text-zinc-500">
              Documentation
            </p>

            <p className="mt-3 text-2xl font-bold">
              README
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6">

            <p className="text-sm text-zinc-500">
              Assets
            </p>

            <p className="mt-3 text-2xl font-bold">
              Screenshots
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6">

            <p className="text-sm text-zinc-500">
              Knowledge
            </p>

            <p className="mt-3 text-2xl font-bold">
              Notes
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}