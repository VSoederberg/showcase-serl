import React from 'react'
import { DataItem } from '../utils/dataTypes'
import Project from './Project'

interface ProjectListProps {
  projects: DataItem[] // Expecting a list of projects as a prop
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className='m-auto mt-10 flex w-11/12 flex-col gap-10 md:grid md:grid-cols-2'>
      {projects.map((project) => (
        <Project
          key={project.id}
          dataItem={project}
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
  )
}

export default ProjectList
