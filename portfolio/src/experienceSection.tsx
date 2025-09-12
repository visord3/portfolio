import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [ref, isInView] = useIntersectionObserver({ threshold: 0.1 });
  
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const timelineData: TimelineItemData[] = [
    {
      title: t('internTitle'),
      organization: t('internOrg'),
      date: t('internDate'),
      description: t('internDescription'),
      bullets: [
        t('internBullet1'),
        t('internBullet2'),
        t('internBullet3'),
        t('internBullet4'),
        t('internBullet5'),
        t('internBullet6'),
        t('internBullet7'),
        t('internBullet8')
      ],
      badgeColor: "bg-red-500",
      category: "experience"
    },
    {
      title: t('bachelorTitle'),
      organization: t('bachelorOrg'),
      date: t('bachelorDate'),
      description: t('bachelorDescription'),
      badgeColor: "bg-blue-600",
      category: "education"
    },
    {
      title: t('elkjopTitle'),
      organization: t('elkjopOrg'),
      date: t('elkjopDate'),
      description: t('elkjopDescription'),
      bullets: [
        t('elkjopBullet1'),
        t('elkjopBullet2')
      ],
      badgeColor: "bg-green-600",
      category: "experience"
    },
    {
      title: t('mcdonaldsTitle'),
      organization: t('mcdonaldsOrg'),
      date: t('mcdonaldsDate'),
      description: t('mcdonaldsDescription'),
      bullets: [
        t('mcdonaldsBullet1'),
        t('mcdonaldsBullet2')
      ],
      badgeColor: "bg-green-600",
      category: "experience"
    },
    {
      title: t('shiftProjectTitle'),
      organization: t('shiftProjectOrg'),
      date: t('shiftProjectDate'),
      description: t('shiftProjectDescription'),
      bullets: [
        t('shiftProjectBullet1'),
        t('shiftProjectBullet2')
      ],
      badgeColor: "bg-purple-600",
      category: "project"
    },
    {
      title: t('tetrisProjectTitle'),
      organization: t('tetrisProjectOrg'),
      date: t('tetrisProjectDate'),
      description: t('tetrisProjectDescription'),
      bullets: [
        t('tetrisProjectBullet1'),
        t('tetrisProjectBullet2')
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
            {t('experienceTitle')}
          </h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mb-6"></div>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t('experienceDescription')}
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
            {t('experienceAll')}
          </button>
          <button
            onClick={() => setActiveFilter('experience')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              activeFilter === 'experience'
                ? 'bg-green-600 text-white'
                : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            {t('experienceWork')}
          </button>
          <button
            onClick={() => setActiveFilter('education')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              activeFilter === 'education'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            {t('experienceEducation')}
          </button>
          <button
            onClick={() => setActiveFilter('project')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              activeFilter === 'project'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            {t('experienceProjects')}
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