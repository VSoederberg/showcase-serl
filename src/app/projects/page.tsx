"use client";
import React, { useEffect, useState } from "react";
import { fetchProjects } from '../../utils/api'; // Fetching the data
import { DataItem } from '../../utils/dataTypes';
import ProjectList from '../../components/ProjectList'; // Import your ProjectList component
import TagFilter from '../../components/TagFilter'; // Import your TagFilter component

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<DataItem[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<{ name: string; selected: boolean }[]>([]); // Store tags with selected state
  const [searchQuery, setSearchQuery] = useState<string>(''); // State to store the search query

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
        setFilteredProjects(data); // Initialize with all projects
        // Set unique tags based on the project data
        const uniqueTags = Array.from(
          new Set(data.flatMap(project => project.tags))
        ).map(tag => ({ name: tag, selected: false }));
        setTags(uniqueTags);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    // Filter projects based on selected tags and search query
    const selectedTags = tags.filter(tag => tag.selected).map(tag => tag.name);
    const filtered = projects.filter(project => {
      const matchesTags = selectedTags.length === 0 || project.tags.some(tag => selectedTags.includes(tag));
      const matchesSearchQuery = project.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTags && matchesSearchQuery; // Return true if it matches both conditions
    });
    setFilteredProjects(filtered);
  }, [tags, searchQuery, projects]); // Re-run filtering when tags, search query, or projects change

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
          className="border border-gray-300 p-2 mb-4 w-[500px] rounded-lg mr-2 text-black"
        />

      {/* Tag Filter Dropdown */}
      <TagFilter tags={tags} onChange={setTags} />

      {/* Render filtered projects */}
      <ProjectList projects={filteredProjects} />
    </div>
  );
};

export default ProjectsPage;

