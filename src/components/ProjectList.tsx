import React from 'react';
import { DataItem } from '../utils/dataTypes';
import Project from './Project';

interface ProjectListProps {
  projects: DataItem[]; // Expecting a list of projects as a prop
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className='w-11/12 m-auto md:grid mt-10 gap-10 md:grid-cols-2 flex flex-col'>
      {projects.map((project) => (
        <Project key={project.id} {...project}
         /*  id={project.id}
           title={project.title}
           description={project.description}
           tags = {project.tags}
           thumbnailUrl={project.thumbnailUrl} 
           projectHomeUrl={project.projectHomeUrl}
         */ 
         />
      ))}
    </div>
  );
};

export default ProjectList;

