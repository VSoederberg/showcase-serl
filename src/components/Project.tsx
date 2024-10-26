'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { DataItem } from '../utils/dataTypes'

interface ProjectProps {
  dataItem: DataItem
}

const Project: React.FC<ProjectProps> = ({ dataItem }) => {
  const router = useRouter()
  function handleClick() {
    router.push(`/projects/${dataItem.id}`)
  }
  // Function to get the first two sentences of the description
  const getFirstTwoSentences = (text: string): string => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) // Split by sentence-ending punctuation
    return sentences ? sentences.slice(0, 2).join(' ') : text // Take the first two sentences
  }

  return (
    <li className='project-item overflow-hidden rounded-lg bg-white p-4 shadow-md'>
      <h2 onClick={handleClick} className='project-title text-lg font-bold'>
        <Link href={`/projects/${dataItem.id}`}>{dataItem.title}</Link>
      </h2>

      <div className='mt-2 flex flex-col items-start md:flex-row'>
        {/* Image container */}
        <div className='relative h-48 w-full min-w-[200px] overflow-hidden md:w-1/3 md:max-w-xs'>
          <Image
            src={dataItem.thumbnailUrl}
            alt={`Thumbnail for ${dataItem.title}`}
            fill
            style={{ objectFit: 'contain' }}
            className='transform rounded-lg transition-transform duration-300 hover:scale-105'
            onError={(e) => {
              e.currentTarget.src =
                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/640px-No-Image-Placeholder.svg.png' // Fallback on error
            }}
          />
        </div>

        {/* Limited description container */}
        <div className='project-description mt-2 text-gray-700 md:ml-4 md:mt-0'>
          <p>{getFirstTwoSentences(dataItem.description)}</p>{' '}
          {/* Show first two sentences */}
        </div>
      </div>

      {/* Tags container */}
      <div className='project-tags mt-4 flex flex-wrap'>
        {dataItem.tags.map((tag, index) => (
          <span
            key={index}
            className='project-tag mr-2 rounded bg-blue-500 px-2.5 py-0.5 text-xs font-semibold text-white'
          >
            {tag}
          </span>
        ))}
        <p className='project-tag mr-2 rounded bg-blue-900 px-2.5 py-0.5 text-xs font-semibold text-white'>
          {dataItem.type}
        </p>
      </div>
    </li>
  )
}

export default Project
