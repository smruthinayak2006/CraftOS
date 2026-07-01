interface PageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: PageProps) {
  return (
    <main className="min-h-screen bg-zinc-950 p-10 text-white">
      <h1 className="text-4xl font-bold">Project Workspace</h1>

      <p className="mt-4 text-zinc-400">
        Project ID: {params.id}
      </p>
    </main>
  );
}