'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation' // For fetching dynamic params in the app directory
import { fetchProjectById } from '../../../utils/api' // Adjust this path to your API function
import { DataItem } from '../../../utils/dataTypes' // Assuming this represents your project type
import Image from 'next/image'
import Link from 'next/link'

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams() // Get the `id` from the URL parameters
  const [project, setProject] = useState<DataItem | null>(null) // State to hold project data
  const [error, setError] = useState<string | null>(null) // State to hold error messages

  useEffect(() => {
    const loadProject = async () => {
      if (typeof id === 'string') {
        // Ensure id is a string
        try {
          const data = await fetchProjectById(id)
          setProject(data) // Store fetched data in state
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message) // Handle errors
          } else {
            setError('An unexpected error occured')
          }
        }
      }
    }

    loadProject() // Call the loadProject function
  }, [id]) // Run effect when id changes

  if (error) {
    return <div>Error: {error}</div> // Display error if it exists
  }

  if (!project) {
    return <div>Loading...</div> // Show loading state while fetching
  }
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-4 text-4xl font-bold'>{project.title}</h1>
      {project.thumbnailUrl && (
        <div className='relative mb-6 h-96 w-full'>
          {' '}
          {/* Set a fixed height for the image container */}
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            layout='fill' // This allows the image to cover the parent div
            objectFit='contain' // This keeps the aspect ratio and covers the div without stretching
            className='transform rounded-lg transition-transform duration-300 '
            onError={(e) => {
              e.currentTarget.src =
                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/640px-No-Image-Placeholder.svg.png' // Fallback on error
            }}
          />
        </div>
      )}
      <div className='mb-4'>
        <h3 className='mb-2 text-xl font-semibold'>Tags</h3>
        <div className='flex flex-wrap gap-2'>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className='rounded-full bg-blue-200 px-3 py-1 text-sm text-blue-800'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className='mb-6'>
        <h3 className='mb-2 text-xl font-semibold'>Description</h3>
        <p className='leading-relaxed text-white'>{project.description}</p>
      </div>
      <div className='mb-6'>
        <h3 className='mb-2 text-xl font-semibold'>Project Details</h3>
        <ul className='list-inside list-disc'>
          <li>
            <strong>Date Added:</strong> {project.dateAdded || 'N/A'}
          </li>
          <li>
            <strong>Home Page:</strong>
            <Link
              href={project.projectHomeUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {project.projectHomeUrl}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProjectDetailPage
