import { getProject } from "@/app/lib/api";
import ProjectDetails from "@/components/ProjectDetails";

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

  return <ProjectDetails project={project} />;
}