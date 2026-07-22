"use client";

type Project = {
  id: string;
  name: string;
  description: string;
  readme: string | null;
  screenshots: string[];
};

type Props = {
  projects: Project[];
};

export default function DashboardStats({
  projects,
}: Props) {

  const totalProjects = projects.length;

  const totalReadmes = projects.filter(
    (project) => project.readme
  ).length;

  const totalScreenshots = projects.reduce(
    (total, project) =>
      total + project.screenshots.length,
    0
  );

  return (
    <section className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Projects"
        value={totalProjects}
        color="blue"
      />

      <StatCard
        title="READMEs"
        value={totalReadmes}
        color="emerald"
      />

      <StatCard
        title="Screenshots"
        value={totalScreenshots}
        color="purple"
      />

      <StatCard
        title="Completion"
        value={`${Math.round(
          totalProjects === 0
            ? 0
            : (totalReadmes / totalProjects) * 100
        )}%`}
        color="orange"
      />

    </section>
  );
}

type CardProps = {
  title: string;
  value: number | string;
  color:
    | "blue"
    | "emerald"
    | "purple"
    | "orange";
};

function StatCard({
  title,
  value,
  color,
}: CardProps) {

  const colors = {
    blue:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",
    emerald:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    purple:
      "border-purple-500/20 bg-purple-500/10 text-purple-400",
    orange:
      "border-orange-500/20 bg-orange-500/10 text-orange-400",
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <div
        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${colors[color]}`}
      >
        {title}
      </div>

      <p className="mt-6 text-4xl font-bold">
        {value}
      </p>

    </div>
  );
}