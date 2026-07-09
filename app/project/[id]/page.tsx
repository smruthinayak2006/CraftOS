import Link from "next/link";
import Image from "next/image";

import {
  getProject,
  getScreenshotUrl,
} from "@/app/lib/api";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectPage({
  params,
}: PageProps) {
  const { id } = await params;

  const project = await getProject(id);

  if (!project) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Project not found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-8 py-12">

        <Link
          href="/"
          className="text-zinc-400 hover:text-white"
        >
          ← Back
        </Link>

        <h1 className="mt-6 text-5xl font-bold">
          {project.name}
        </h1>

        <p className="mt-3 text-xl text-zinc-400">
          {project.description || "No description"}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="text-2xl font-semibold">
              README
            </h2>

            <p className="mt-4 text-zinc-500">
              {project.readme
                ? "README uploaded"
                : "Not uploaded"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="text-2xl font-semibold">
              Screenshots
            </h2>

            {project.screenshots.length === 0 ? (
              <p className="mt-4 text-zinc-500">
                No screenshots uploaded
              </p>
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-4">

                {project.screenshots.map(
                  (filename: string) => (
                    <a
                      key={filename}
                      href={getScreenshotUrl(filename)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={getScreenshotUrl(filename)}
                        alt={filename}
                        width={400}
                        height={240}
                        className="rounded-lg border border-zinc-700 object-cover transition hover:scale-105"
                      />
                    </a>
                  )
                )}

              </div>
            )}
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="text-2xl font-semibold">
              Notes
            </h2>

            <p className="mt-4 text-zinc-500">
              Empty
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="text-2xl font-semibold">
              Generated Content
            </h2>

            <p className="mt-4 text-zinc-500">
              0 drafts
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}