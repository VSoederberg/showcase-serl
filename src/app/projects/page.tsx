"use client";
import React, { useEffect, useState } from "react";
import { fetchProjects } from '../../utils/api'; // Fetching the data
import { DataItem } from '../../utils/dataTypes';
import ProjectList from '../../components/ProjectList'; // Import your ProjectList component
import TagFilter from '../../components/TagFilter'; // Import your TagFilter component
import TypeFilter from '../../components/TypeFilter';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<DataItem[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<{ name: string; selected: boolean }[]>([]); // Store tags with selected state
  const [types, setTypes] = useState<{ name: string; selected: boolean }[]>([]); // Store tags with selected state
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
        ).map(tag => ({ name: tag, selected: false }))
		 .sort((a, b) => a.name.localeCompare(b.name));
        setTags(uniqueTags);
        const uniqueTypes = Array.from(
          new Set(data.flatMap(project => project.type))
        )
        .filter(type => type)
        .map(type => ({ name: type, selected: false }))
        .sort((a, b) => a.name.localeCompare(b.name));
        setTypes(uniqueTypes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // This useEffect will filter projects based on both selected tags and search query
  useEffect(() => {
    const selectedTags = tags.filter(tag => tag.selected).map(tag => tag.name);
    const selectedTypes = types.filter(type => type.selected).map(type => type.name);
    const filtered = projects.filter(project => {
      // Check if project matches all selected tags (or if no tags are selected)
      const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => project.tags.includes(tag));
      const matchesTypes = selectedTypes.length === 0 || selectedTypes.includes(project.type);
      // Check if the project title matches the search query
      const matchesSearchQuery = project.title.toLowerCase().includes(searchQuery.toLowerCase());

      // Return true only if the project matches both the selected tags and the search query
      return matchesTags && matchesSearchQuery && matchesTypes;
    });

    setFilteredProjects(filtered);
  }, [tags, searchQuery, types, projects]); // Re-run filtering when tags, search query, or projects change

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
      <h1 className="text-4xl font-bold mb-4">Projects</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search projects by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        className="border border-gray-300 p-2 mb-4 w-[500px] rounded-lg mr-2 text-black"
      />

      {/* Tag Filter Dropdown */}
      <TagFilter className="mr-r" tags={tags} onChange={setTags} />
      <TypeFilter className="mr-r" types={types} onChange={setTypes} />
      <p className="text-xl font-bold text-center"> {filteredProjects.length} Projects found</p>

      {/* Render filtered projects */}
      <ProjectList projects={filteredProjects} />
    </div>
  );
};

export default ProjectsPage;

