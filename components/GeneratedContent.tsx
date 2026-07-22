"use client";

type Action = {
  title: string;
  description: string;
  icon: string;
};

const actions: Action[] = [
  {
    icon: "📝",
    title: "Generate README",
    description:
      "Create or regenerate professional project documentation.",
  },
  {
    icon: "💼",
    title: "Generate LinkedIn Post",
    description:
      "Prepare a polished announcement for your portfolio or LinkedIn.",
  },
  {
    icon: "🚀",
    title: "Generate Release Notes",
    description:
      "Summarize updates, features and improvements automatically.",
  },
];

export default function GeneratedContent() {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm uppercase tracking-widest text-blue-400">
            AI Workspace
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Generated Content
          </h2>

        </div>

        <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
          Coming Soon
        </div>

      </div>

      <p className="mt-4 max-w-2xl text-zinc-400">
        CraftOS will automatically generate developer content
        from your project so you can spend more time building
        and less time writing.
      </p>

      <div className="mt-8 space-y-5">

        {actions.map((action) => (

          <button
            key={action.title}
            disabled
            className="group flex w-full items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-left transition hover:border-blue-500 disabled:cursor-not-allowed"
          >

            <div className="flex items-start gap-5">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-3xl">
                {action.icon}
              </div>

              <div>

                <h3 className="text-lg font-semibold">
                  {action.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {action.description}
                </p>

              </div>

            </div>

            <span className="text-2xl text-zinc-600 transition group-hover:text-blue-400">
              →
            </span>

          </button>

        ))}

      </div>

    </section>
  );
}