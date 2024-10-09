'use client'
import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../../utils/api';
import { DataItem } from '../../utils/dataTypes';
import ProjectList from '../../components/ProjectList'; // Import your ProjectList component

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    loadProjects();
  }, []);

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render project list if data is fetched successfully
  return (
    <div>
      <h1>Projects</h1>
      <ProjectList projects={projects} /> {/* Pass projects to your ProjectList component */}
    </div>
  );
};

export default ProjectsPage;

