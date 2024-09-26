'use client'; 

import React, { useEffect, useState } from 'react';
import ProjectList from '../../components/ProjectList';


export default function Page() {
  const [projectList, setProjectList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // To manage loading state

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/data.txt');
      if(!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const text = await res.text();
      const projects = JSON.parse(text);
      setProjectList(projects)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 5 minutes (300000 ms)
    }, 300000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <div>
      <h1>Projects List</h1>
      <ProjectList projects={projectList}/>
    </div>
  );
};
