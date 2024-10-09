// app/projects/[id]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnailUrl: string;
  projectHomeUrl: string;
}

async function fetchProjects() {
  const res = await fetch('/data.txt'); // Relative URL to fetch the data.txt
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  return await res.json();
}

export async function generateStaticParams() {
  const projects: Project[] = await fetchProjects();

  return projects.map((project) => ({
    id: project.id,
  }));
}

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const projects: Project[] = await fetchProjects();
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound(); // Return 404 if project is not found
  }

  return (
    <div className="project-detail p-4">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <img
        src={project.thumbnailUrl}
        alt={`Thumbnail for ${project.title}`}
        className="rounded-lg mt-4"
      />
      <p className="mt-4">{project.description}</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Tags</h2>
        <div className="flex flex-wrap">
          {project.tags.map((tag, index) => (
            <span key={index} className="bg-blue-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <a href={project.projectHomeUrl} className="text-blue-600 underline">
          View Project Repository
        </a>
      </div>
    </div>
  );
};

export default ProjectPage;

