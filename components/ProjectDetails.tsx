"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReadmeViewer from "./ReadmeViewer";
import EditProjectModal from "./EditProjectModal";
import NotesCard from "./NotesCard";
import GeneratedContent from "./GeneratedContent";
import ProjectHeader from "./ProjectHeader";
import ScreenshotGallery from "./ScreenshotGallery";
import {
  deleteProject,
  updateProject,
} from "@/app/lib/api";


type Project = {
  id: string;
  name: string;
  description: string;
  readme: string | null;
  screenshots: string[];
};

type Props = {
  project: Project;
};

export default function ProjectDetails({
  project,
}: Props) {
  const router = useRouter();

  const [isEditOpen, setIsEditOpen] =
    useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this project?\n\nThis will permanently remove:\n• Project\n• README\n• All screenshots"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject(project.id);

      alert("Project deleted successfully.");

      router.push("/");
      router.refresh();
    } catch {
      alert("Failed to delete project.");
    }
  }

  async function handleEditProject(
    name: string,
    description: string
  ) {
    try {
      await updateProject(
        project.id,
        name,
        description
      );

      router.refresh();

      alert("Project updated successfully.");
    } catch {
      alert("Failed to update project.");
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-8 py-12">

        <ProjectHeader
          name={project.name}
          description={project.description}
          hasReadme={!!project.readme}
          screenshotCount={project.screenshots.length}
          onEdit={() => setIsEditOpen(true)}
          onDelete={handleDelete}
        />

        <div className="mt-10 space-y-6">

          <ReadmeViewer
            projectId={project.id}
            hasReadme={!!project.readme}
          />

          <ScreenshotGallery
            projectId={project.id}
            screenshots={project.screenshots}
            onRefresh={() => router.refresh()}
          />

          <NotesCard
            projectId={project.id}
          />

          <GeneratedContent />

        </div>

      </div>

      <EditProjectModal
        isOpen={isEditOpen}
        initialName={project.name}
        initialDescription={project.description}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditProject}
      />      

    </main>
  );
}