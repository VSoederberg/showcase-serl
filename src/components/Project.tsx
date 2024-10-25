'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/navigation'

interface ProjectProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  type: string;
  thumbnailUrl: string;
  projectHomeUrl: string;
}

const Project: React.FC<ProjectProps> = ({
  id,
  title,
  description,
  tags,
  type,
  thumbnailUrl,
  projectHomeUrl,
}) => {

//  const router = useRouter();
//  function handleClick(){
//    router.push(`/projects/${id}`)
//  }
  // Function to get the first two sentences of the description
  const getFirstTwoSentences = (text: string): string => {
    const sentences = text.match(/[^.!?]+[.!?]+/g); // Split by sentence-ending punctuation
    return sentences ? sentences.slice(0, 2).join(' ') : text; // Take the first two sentences
  };

  return (
    <li className="project-item bg-white rounded-lg shadow-md overflow-hidden p-4">
       <h2 /*onClick={handleClick}*/ className="project-title text-lg font-bold"><Link href={`/projects/${id}`}>{title}</Link></h2>

      <div className="flex flex-col md:flex-row items-start mt-2">
        {/* Image container */}
        <div className="relative w-full md:w-1/3 h-48 md:max-w-xs min-w-[200px] overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={`Thumbnail for ${title}`}
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-lg transition-transform duration-300 transform hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/640px-No-Image-Placeholder.svg.png'; // Fallback on error
            }}
          />
        </div>

        {/* Limited description container */}
        <div className="project-description text-gray-700 mt-2 md:mt-0 md:ml-4">
          <p>{getFirstTwoSentences(description)}</p> {/* Show first two sentences */}
        </div>
      </div>

      {/* Tags container */}
      <div className="project-tags flex flex-wrap mt-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="project-tag bg-blue-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
        <p className="project-tag bg-blue-900 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
          {type}
        </p>
      </div>
    </li>
  );
};

export default Project;

