export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-8 py-12">

        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">CraftOS</h1>

            <p className="mt-2 text-zinc-400">
              What are you building today?
            </p>
          </div>

          <button className="rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200">
            + Create Project
          </button>
        </header>

        {/* Recent Projects */}
        <section className="mt-16">

          <h2 className="text-2xl font-semibold">
            Recent Projects
          </h2>

          <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 p-16 text-center">

            <h3 className="text-xl font-semibold">
              No projects yet
            </h3>

            <p className="mt-3 text-zinc-500">
              Start by creating your first project.
              Every project stores your README,
              screenshots, notes and generated content.
            </p>

          </div>

        </section>

      </div>
    </main>
  );
}