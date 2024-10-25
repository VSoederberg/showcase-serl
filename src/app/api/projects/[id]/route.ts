// /app/api/projects/[id]/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// The GET method to fetch project by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Extract the id from the parameters

  try {
    // Define the path to your data.json file
    const filePath = path.join(process.cwd(), 'src', 'data', 'data.json');

    // Read the data.json file
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData); // Parse the JSON data

    // Find the project by ID
    const project = data.find((item: { id: string }) => item.id === id);

    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    // Return the project as a JSON response
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error reading data:', error);
    return NextResponse.error(); // Return an error response
  }
}

