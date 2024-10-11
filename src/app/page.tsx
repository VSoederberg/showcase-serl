'use client'
import React, { useEffect, useState } from 'react'; // Add useState and useEffect
import Carousel from '../components/Carousel';
import { fetchProjects } from '../utils/api'; // Assuming you have an API function to fetch the projects
import { DataItem } from '../utils/dataTypes'; // Make sure this matches your DataItem type

const HomePage: React.FC = () => {
  const [projects, setProjects] = useState<DataItem[]>([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track any error

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects(); // Fetch projects
        setProjects(data); // Set projects to the fetched data
      } catch (err) {
        setError('Failed to load projects'); // Handle error
      } finally {
        setLoading(false); // Always stop loading once data is fetched
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Recent Projects</h1>
      {/* Only render the carousel if projects exist */}
      {projects.length > 0 ? (
        <Carousel projects={projects} />
      ) : (
        <div>No projects available</div>
      )}
    </div>
  );
};

export default HomePage;

