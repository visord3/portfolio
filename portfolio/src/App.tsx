import React from 'react';
import './App.css';
import './i18n'; // Initialize i18n
import Navbar from './navbar-component';
import PortfolioLanding from './portfolio-landing';
import AboutSection from './about-section';
import SkillsSection from './skills-section';
import ProjectsSection from './projects-section';
import ExperienceSection from './experienceSection';
import ContactSection from './contact-section';

const App: React.FC = () => {
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
