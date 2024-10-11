"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Project from "./Project"; // Assuming you have a Project component
import { DataItem } from "../utils/dataTypes"; // Assuming your project data uses DataItem type

interface CarouselProps {
  projects: DataItem[];
}

const Carousel: React.FC<CarouselProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0); // State to track the current project
  const [isHovered, setIsHovered] = useState<boolean>(false); // State to track hover
  const carouselRef = useRef<HTMLDivElement>(null);

  // Show the previous project
  const prevSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  // Show the next project
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  // Auto-scroll logic
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000); // Auto-scroll every 3 seconds

      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovered]);

  // Handle mouse over and leave
  const handleMouseOver = (): void => setIsHovered(true);
  const handleMouseLeave = (): void => setIsHovered(false);

  return (
    <div className="relative w-full mx-auto mt-4">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative h-[460px] mx-12 group hover:-translate-y-2"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {/* Current Project Component */}
        <Project {...projects[currentIndex]} />
      </div>

      {/* Left Button */}
      <button
        className="absolute left-0 top-1/2 transform h-[459px] rounded-xl hover:bg-[#1a222f] mx-1 -mt-[10px] -translate-y-1/2 bg-[#111927] text-white p-2 group"
        onClick={prevSlide}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <ChevronLeft className="text-gray-400 group-hover:text-white" />
      </button>

      {/* Right Button */}
      <button
        className="absolute right-0 top-1/2 transform h-[459px] rounded-xl hover:bg-[#1a222f] mx-1 -mt-[10px] -translate-y-1/2 bg-[#111927] text-white p-2 group"
        onClick={nextSlide}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <ChevronRight className="text-gray-400 group-hover:text-white" />
      </button>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-4">
        {projects.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-10 mx-1 ${
              index === currentIndex
                ? "bg-[#beff46] rounded-xl"
                : "bg-gray-300 rounded-xl"
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

