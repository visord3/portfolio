import React, { useEffect } from 'react';
import './App.css';
import './i18n'; // Initialize i18n
import Navbar from './navbar-component';
import PortfolioLanding from './portfolio-landing';
import AboutSection from './about-section';
import SkillsSection from './skills-section';
import ProjectsSection from './projects-section';
import ExperienceSection from './experienceSection';
import ContactSection from './contact-section';
import { useVisitorTracking } from './api/api_hook';

const App: React.FC = () => {
  useVisitorTracking();

  useEffect(() => {
    // Track visitor when page loads
    const trackVisitor = async () => {
      try {
        const response = await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log('Visitor tracked:', data);
      } catch (error) {
        console.error('Tracking failed:', error);
      }
    };

    trackVisitor();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <PortfolioLanding />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
};

export default App;
