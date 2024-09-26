import React from 'react';
import Project from './Project';

interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  thumbnailUrl: string;
  projectHomeUrl: string;
}

interface ProjectListProps {
  projects: ProjectData[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <ul className="projectList">
      {projects.map((project, index) => (
        <Project
          key={index} // Using index as a key
          id={index + 1} //Create a simple incrementing ID
          title={project.title}
          description={project.description}
          tags={project.tags}
          thumbnailUrl={project.thumbnailUrl}
          projectHomeUrl={project.projectHomeUrl}
        />
      ))}
    </ul>
  );
};

export default ProjectList; 
