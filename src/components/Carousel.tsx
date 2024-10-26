import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Project from './Project'
import { DataItem } from '../utils/dataTypes'

interface CarouselProps {
  projects: DataItem[]
}

const Carousel: React.FC<CarouselProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState<boolean>(false) // State to track hover
  const carouselRef = useRef<HTMLDivElement>(null)

  /*  const goToNextProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };
*/

  // Show the previous project
  const prevSlide = useCallback((): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    )
  }, [projects.length]) // Add projects.length as a dependency

  // Show the next project
  const nextSlide = useCallback((): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }, [projects.length]) // Add projects.length as a dependency

  // Auto-scroll logic
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide()
      }, 5000) // Auto-scroll every 5 seconds

      return () => {
        clearInterval(interval)
      }
    }
  }, [isHovered, nextSlide]) // Add nextSlide to the dependency array

  // Handle mouse over and leave
  const handleMouseOver = (): void => setIsHovered(true)
  const handleMouseLeave = (): void => setIsHovered(false)

  return (
    <div className='mx auto relative mt-4 w-full'>
      <div
        ref={carouselRef}
        className='group relative mx-12 h-[460px] hover:-translate-y-2'
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {/* Current Project component */}
        <Project dataItem={projects[currentIndex]} />
      </div>

      {/* Left Button */}
      <button
        className='group absolute left-0 top-1/2 mx-1 -mt-[10px] h-[459px] -translate-y-1/2 transform rounded-xl bg-[#111927] p-2 text-white hover:bg-[#1a222f]'
        onClick={prevSlide}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <ChevronLeft className='text-gray-400 group-hover:text-white' />
      </button>

      {/* Right Button */}
      <button
        className='group absolute right-0 top-1/2 mx-1 -mt-[10px] h-[459px] -translate-y-1/2 transform rounded-xl bg-[#111927] p-2 text-white hover:bg-[#1a222f]'
        onClick={nextSlide}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <ChevronRight className='text-gray-400 group-hover:text-white' />
      </button>

      {/* Dots Navigation */}
      <div className='mt-4 flex justify-center'>
        {projects.map((_, index) => (
          <div
            key={index}
            className={`mx-1 h-1 w-10 ${
              index === currentIndex
                ? 'rounded-xl bg-[#beff46]'
                : 'rounded-xl bg-gray-300'
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
