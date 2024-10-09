import React from 'react';
import { DataItem } from '../utils/dataTypes';
import Project from './Project';

interface ProjectListProps {
  projects: DataItem[]; // Expecting a list of projects as a prop
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <ul>
      {projects.map((project) => (
        <Project
           key={project.id}
           id={project.id}
           title={project.title}
           description={project.description}
           tags = {project.tags}
           thumbnailUrl={project.thumbnailUrl} 
           projectHomeUrl={project.projectHomeUrl} 
         />
      ))}
    </ul>
  );
};

export default ProjectList;

