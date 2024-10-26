// /app/api/data/route.ts
import { NextResponse } from 'next/server'
import { promises as fs } from 'fs' // Import fs.promises
import path from 'path'

export async function GET() {
  // Define the path to your data.json file
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'data.json')

    // Read the data.json file asynchronously
    const jsonData = await fs.readFile(filePath, 'utf-8') // Asynchronous read
    const data = JSON.parse(jsonData) // Parse the JSON data

    // Return the data as JSON response
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading data:', error)
    return NextResponse.error() // Return an error response
  }
}
