'use client';
import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../../utils/api'; // Fetching the data
import { DataItem } from '../../utils/dataTypes';
import ProjectList from '../../components/ProjectList';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<DataItem[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // State to store the search query

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
        setFilteredProjects(data); // Initialize with all projects
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    // Filter projects based on the search query in real time
    const filtered = projects.filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) // Filter logic
    );
    setFilteredProjects(filtered);
  }, [searchQuery, projects]); // Re-run filtering when search query or projects change

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search projects by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        className="border border-gray-300 p-2 mb-4 w-[500px] rounded-lg"
      />

      {/* Render filtered projects */}
      <ProjectList projects={filteredProjects} />
    </div>
  );
};

export default ProjectsPage;

