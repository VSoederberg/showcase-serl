import { cache } from 'react';
import { DataItem } from './dataTypes'; // Adjust the import path as necessary


// Create a cached version of the data-fetching function
export const fetchProjects = cache(async (): Promise<DataItem[]> => {
  const res = await fetch('/api/data', {
    next: { revalidate: 300 }, // Revalidate the cache every 5 minutes
  });

  if (!res.ok) {
    throw new Error('Failed to load data');
  }

  const data: DataItem[] = await res.json();
  return data;
});

export const fetchProjectById = cache(async (id: string): Promise<DataItem> => {
  const res = await fetch(`/api/projects/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to load project with ID: ${id}`);
  }

  const data: DataItem = await res.json();
  return data;
});

