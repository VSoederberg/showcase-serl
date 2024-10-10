import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  thumbnailUrl: string; // Raw GitHub URL for the image
  projectHomeUrl: string;
}

const Project: React.FC<ProjectProps> = ({
  id,
  title,
  description,
  tags,
  thumbnailUrl,
  projectHomeUrl,
}) => {
  return (
    <li className="project-item bg-white rounded-lg shadow-md overflow-hidden p-4">
      <Link href={`/projects/${id}`}>
        <h2 className="project-title text-lg font-bold">{title}</h2>
      </Link>

      <div className="flex flex-col md:flex-row items-start mt-2"> {/* Flex container for image and description */}
        <div className="relative w-full md:w-1/3 h-48 md:max-w-xs min-w-[200px] overflow-hidden"> {/* Image container */}
          <Image
            src={thumbnailUrl}
            alt={`Thumbnail for ${title}`}
            fill // Use fill instead of layout="fill"
            style={{ objectFit: 'contain' }} // Directly use style for objectFit
            className="rounded-lg transition-transform duration-300 transform hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = '/path/to/placeholder-image.png'; // Fallback on error
            }}
          />
        </div>

        <div className="project-description text-gray-700 mt-2 md:mt-0 md:ml-4"> {/* Description container */}
          <p>{description}</p>
        </div>
      </div>

      <div className="project-tags flex flex-wrap mt-4"> {/* Tags container */}
        {tags.map((tag, index) => (
          <span
            key={index}
            className="project-tag bg-blue-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </li>
  );
};

export default Project;

