import React from 'react';
import { motion, Variants } from 'framer-motion';

interface IntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

// Custom hook for intersection observer
const useIntersectionObserver = (options: IntersectionObserverOptions = {}) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
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

const ContactSection: React.FC = () => {
  const [ref, isInView] = useIntersectionObserver({ threshold: 0.1 });

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:ivanbilal156@gmail.com';
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900">
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
            Get in Touch
          </h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mb-6"></div>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
            I'd love to hear from you! Feel free to reach out through email or connect with me on social media.
          </p>
          
          <button
            onClick={handleEmailClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send me an email
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;