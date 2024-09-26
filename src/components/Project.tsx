import React from 'react';
import Link from 'next/link';

interface ProjectProps {
  id: number; //use incrementing id
  title: string;
  description: string;
  tags: string[];
  thumbnailUrl: string;
  projectHomeUrl: string;
}

const Project: React.FC<ProjectProps> = ({id, title, description, tags, thumbnailUrl, projectHomeUrl }) =>{
  return(
    <li className="project-item">
      <Link href={`/projects/${title}`}>
        <h2 className="project-title">{title}</h2>
        <p className="porject-description">{description}</p>
      </Link>
      <div className="project-tags">
        {tags.map((tag, index) => (
          <span key={index} className="project-tag">
            {tag}
          </span>
        ))}
      </div>
    </li>
  );
};

export default Project;
