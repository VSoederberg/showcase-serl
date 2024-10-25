'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // For fetching dynamic params in the app directory
import { fetchProjectById } from '../../../utils/api'; // Adjust this path to your API function
import { DataItem } from '../../../utils/dataTypes'; // Assuming this represents your project type
import Image from 'next/image';
import Link from 'next/link';

const ProjectDetailPage: React.FC = () => {
  const [project, setProject] = useState<DataItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Use the `useParams` hook to get the dynamic `id` from the route
  const router = useRouter();
  const { id } = useParams();

  // Fetch the project when the component mounts
  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await fetchProjectById(id); // Call your API function to fetch project by id
        
        if(!data) {
          router.push('/projects');
          return;
        }
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        router.push('/projects');
      } finally {
        setLoading(false);
      }
    };

    if (id) { // Only fetch if `id` exists
      loadProject();
    }
  }, [id]); // Dependency array to re-fetch if `id` changes

  // Handle loading and error states
  if (loading) {
    return <div>Loading project details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      {project.thumbnailUrl && (
        <div className="relative w-full h-96 mb-6"> {/* Set a fixed height for the image container */}
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            layout="fill" // This allows the image to cover the parent div
            objectFit="contain" // This keeps the aspect ratio and covers the div without stretching
            className="rounded-lg transition-transform duration-300 transform "
            onError={(e) => {
              e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/640px-No-Image-Placeholder.svg.png'; // Fallback on error
            }}
          />
        </div>
      )}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Description</h3>
        <p className="text-white leading-relaxed">{project.description}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Project Details</h3>
        <ul className="list-disc list-inside">
          <li><strong>Date Added:</strong> {project.dateAdded || 'N/A'}</li>
          <li>
            <strong>Home Page:</strong>
            <Link href={project.projectHomeUrl} target="_blank" rel="noopener noreferrer">
              {project.projectHomeUrl}
            </Link></li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectDetailPage;

