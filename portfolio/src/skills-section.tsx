// Skills section with FlowingMenu component
import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import FlowingMenu from './components/FlowingMenu';

interface IntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
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

const SkillsSection: React.FC = () => {
  const { t } = useTranslation();
  const [ref, isInView] = useIntersectionObserver({ threshold: 0.1 });

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Tech skills data based on portfolio projects
  const techSkills = [
    { 
      link: "#", 
      text: "React", 
      image: "⚛️"
    },
    { 
      link: "#", 
      text: "React Native", 
      image: "📱"
    },
    { 
      link: "#", 
      text: "TypeScript", 
      image: "🔷"
    },
    { 
      link: "#", 
      text: "Python", 
      image: "🐍"
    },
    { 
      link: "#", 
      text: "JavaScript", 
      image: "⚡"
    },
    { 
      link: "#", 
      text: ".NET", 
      image: "🟣"
    },
    { 
      link: "#", 
      text: "C", 
      image: "🔵"
    },
    { 
      link: "#", 
      text: "C++", 
      image: "💙"
    },
    { 
      link: "#", 
      text: "Expo Go", 
      image: "🚀"
    },
    { 
      link: "#", 
      text: "Tailwind CSS", 
      image: "🎨"
    },
    { 
      link: "#", 
      text: "Firebase", 
      image: "🔥"
    },
    { 
      link: "#", 
      text: "Git", 
      image: "🌿"
    },
    { 
      link: "#", 
      text: "HTML5", 
      image: "🏗️"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-slate-100 dark:bg-slate-800">
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
            {t('skillsTitle')}
          </h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mb-6"></div>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t('skillsDescription')}
          </p>
        </motion.div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center">
            Tech Skills & Technologies
          </h3>
          
          <FlowingMenu items={techSkills} />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;