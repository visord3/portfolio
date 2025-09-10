import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';

interface IntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

interface TimelineItemData {
  title: string;
  organization: string;
  date: string;
  description: string;
  badgeColor: string;
  category: 'education' | 'experience' | 'project';
  bullets?: string[];
}

interface TimelineItemProps {
  data: TimelineItemData;
  index: number;
  isLeft: boolean;
}

// Custom hook for intersection observer
const useIntersectionObserver = (options: IntersectionObserverOptions = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);
    const node = ref.current;
    if (node) {
      observer.observe(node);
    }
    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [options]);

  return [ref, isIntersecting] as const;
};

// Timeline Item Component
const TimelineItem: React.FC<TimelineItemProps> = ({ data, index, isLeft }) => {
  const [ref, isInView] = useIntersectionObserver({ threshold: 0.2 });
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: isLeft ? -50 : 50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariants}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-center ${isLeft ? 'md:flex-row-reverse' : ''} mb-6 sm:mb-8`}
    >
      <div className={`w-full md:w-1/2 px-2 sm:px-4 ${isLeft ? 'md:text-right' : ''}`}>
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <span className={`inline-block px-3 py-1 sm:px-4 sm:py-2 rounded text-white text-xs sm:text-sm font-semibold mb-2 sm:mb-3 ${data.badgeColor}`}>
            {data.date}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-2">
            {data.title}
          </h3>
          <h4 className="text-base sm:text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-2 sm:mb-3">
            {data.organization}
          </h4>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {data.description}
          </p>
          {data.bullets && (
            <ul className={`mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 ${isLeft ? 'md:text-right md:list-none' : 'list-disc pl-4 sm:pl-5'}`}>
              {data.bullets.map((bullet, i) => (
                <li key={i} className="mb-1">
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center hidden md:flex">
        <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${data.badgeColor} z-10`}></div>
        <div className="w-1 h-full bg-indigo-200 dark:bg-indigo-900 absolute"></div>
      </div>
      
      <div className="w-1/2 hidden md:block"></div>
    </motion.div>
  );
};

const ExperienceSection: React.FC = () => {
  const [ref, isInView] = useIntersectionObserver({ threshold: 0.1 });
  
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const timelineData: TimelineItemData[] = [
    {
      title: "Intern",
      organization: "Varde",
      date: "June 2025 - August 2025",
      description: "Internship focused on React Native and TypeScript development, contributing to software infrastructure and engineering projects on-site in Kristiansand, Norway.",
      bullets: [
        "Worked with React Native and TypeScript on production apps",
        "Collaborated on software infrastructure and engineering tasks",
        "Utilized CSS and Firebase for front-end and back-end integration",
        "Gained experience in professional software development environment"
      ],
      badgeColor: "bg-red-500",
      category: "experience"
    },
    {
      title: "Bachelor's in Software Engineering",
      organization: "University of Agder, Grimstad, NO",
      date: "2023 - 2026",
      description: "Pursuing a comprehensive software engineering degree with focus on full-stack development, algorithms, and software design principles.",
      badgeColor: "bg-blue-600",
      category: "education"
    },
    {
      title: "Operations Assistant",
      organization: "Elkjøp Arendal, Norway",
      date: "August 2023 - Present",
      description: "Enhancing store operations and customer experience in Norway's largest electronics retailer.",
      bullets: [
        "Optimized store operations and enhanced customer experience",
        "Managed customer inquiries, contributing to high satisfaction scores"
      ],
      badgeColor: "bg-green-600",
      category: "experience"
    },
    {
      title: "Shift Leader",
      organization: "McDonald's, Norway",
      date: "June 2022 - June 2023",
      description: "Led team operations and provided excellent customer service in a fast-paced environment.",
      bullets: [
        "Supervised daily operations and trained new team members",
        "Promoted a positive and productive work environment"
      ],
      badgeColor: "bg-green-600",
      category: "experience"
    },
    {
      title: "Personal Project: Shift Management App",
      organization: "Self-initiated",
      date: "2024",
      description: "Developed a cross-platform mobile app for managing work shifts using React Native and Firebase.",
      bullets: [
        "Implemented user authentication and real-time updates",
        "Created intuitive navigation and responsive UI"
      ],
      badgeColor: "bg-purple-600",
      category: "project"
    },
    {
      title: "Personal Project: Tetris Clone",
      organization: "Self-initiated",
      date: "2024",
      description: "Designed a functional Tetris game using Python and Pygame framework.",
      bullets: [
        "Implemented scoring, collision detection, and responsive controls",
        "Applied object-oriented programming principles"
      ],
      badgeColor: "bg-purple-600",
      category: "project"
    }
  ];

  // Filter options
  const [activeFilter, setActiveFilter] = useState<'all' | 'education' | 'experience' | 'project'>('all');
  const filteredTimeline = activeFilter === 'all' 
    ? timelineData 
    : timelineData.filter(item => item.category === activeFilter);

  return (
    <section id="experience" className="py-20 bg-slate-100 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionVariants}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Experience & Education
          </h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mb-6"></div>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            My professional journey, education, and key project milestones that have shaped
            my development as a software engineer.
          </p>
        </motion.div>
        
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              activeFilter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('experience')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              activeFilter === 'experience'
                ? 'bg-green-600 text-white'
                : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            Work Experience
          </button>
          <button
            onClick={() => setActiveFilter('education')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              activeFilter === 'education'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveFilter('project')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              activeFilter === 'project'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            Key Projects
          </button>
        </div>
        
        <div className="relative">
          {/* Central line for desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-indigo-200 dark:bg-indigo-900 h-full"></div>
          
          {/* Timeline items */}
          <div className="relative z-10">
            {filteredTimeline.map((item, index) => (
              <TimelineItem 
                key={index} 
                data={item} 
                index={index} 
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;