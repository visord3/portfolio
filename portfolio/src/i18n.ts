import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      "home": "Home",
      "about": "About",
      "skills": "Skills",
      "projects": "Projects",
      "experience": "Experience",
      "contact": "Contact",
      "cv": "CV",
      "downloadCV": "Download CV",
      
      // Landing Page
      "name": "Evan Belal",
      "title": "Software Engineer | Full-Stack Developer | Ready to learn!",
      "discoverWork": "Discover My Work",
      "getInTouch": "Get In Touch",
      
      // About Section
      "aboutTitle": "About Me",
      "aboutMe": "About Me",
      "aboutDescription1": "I'm an aspiring software engineer currently studying at the University of Agder in Grimstad, Norway, with an expected graduation in June 2026. My passion lies in building scalable, user-friendly applications that solve real-world problems.",
      "aboutDescription2": "With hands-on experience in full-stack development, mobile apps, and game programming, I enjoy tackling complex challenges and continuously improving through real-world projects and collaboration.",
      "aboutLocation": "Location",
      "aboutEmail": "Email", 
      "aboutEducation": "Education",
      "aboutEducationDetail": "Bachelor's in Software Engineering",
      "aboutCurrentRole": "Current Role",
      "aboutCurrentRoleDetail": "Operations Assistant at Elkjøp Arendal",
      "location": "Location",
      "grimstadNorway": "Grimstad, Norway",
      "email": "Email",
      "currentRole": "Current Role",
      "operationsAssistant": "Operations Assistant at Elkjøp Arendal",
      
      // Skills Section
      "skillsTitle": "Technical Skills",
      "skillsDescription": "A comprehensive overview of my technical expertise and the tools I use to bring ideas to life.",
      "skillReactTitle": "React & React Native",
      "skillReactDescription": "Building responsive web and mobile applications with React ecosystem.",
      "skillDotNetTitle": ".NET (C#)",
      "skillDotNetDescription": "Developing backend systems and applications with .NET framework.",
      "skillPythonTitle": "Python & Pygame", 
      "skillPythonDescription": "Creating applications and games with Python programming language.",
      "skillCppTitle": "C++ Programming",
      "skillCppDescription": "Solving algorithmic problems and developing applications with C++.",
      "skillGitTitle": "Git & Version Control",
      "skillGitDescription": "Managing code changes and collaborating with version control systems.",
      "skillFirebaseTitle": "Firebase",
      "skillFirebaseDescription": "Building applications with Google's Firebase platform for backend services.",
      
      // Projects Section
      "projectsTitle": "My Projects",
      "projectsDescription": "Here are some of the projects I've worked on. Each one has helped me grow as a developer and solve real-world problems through code.",
      "projectsAll": "All Projects",
      "projectsWeb": "Web Development", 
      "projectsMobile": "Mobile Apps",
      "projectsGame": "Game Development",
      "allProjects": "All Projects",
      "webDevelopment": "Web Development",
      "mobileApps": "Mobile Apps",
      "gameDevelopment": "Game Development",
      "github": "GitHub",
      "liveDemo": "Live Demo",
      "seeMoreGithub": "See More on GitHub",
      
      // Project Descriptions
      "project1Title": "Shift Management App",
      "project1Description": "A cross-platform mobile application for managing work shifts, featuring intuitive navigation, secure user authentication, and real-time updates.",
      "project2Title": "Tetris Clone",
      "project2Description": "A functional Tetris game built with Python and Pygame, featuring smooth gameplay, scoring system, collision detection, and responsive controls.",
      "project3Title": "Clipboard History Extension", 
      "project3Description": "A browser extension that saves citation history for research, allowing users to quickly access and organize copied text from various sources.",
      "project4Title": "Portfolio Website",
      "project4Description": "This modern, responsive portfolio website showcasing my skills, projects, and experience. Built with React and Tailwind CSS.",
      
      "shiftAppDescription": "A cross-platform mobile application for managing work shifts, featuring intuitive navigation, secure user authentication, and real-time updates.",
      "tetrisDescription": "A functional Tetris game built with Python and Pygame, featuring smooth gameplay, scoring system, collision detection, and responsive controls.",
      "clipboardDescription": "A browser extension that saves citation history for research, allowing users to quickly access and organize copied text from various sources.",
      "portfolioDescription": "This modern, responsive portfolio website showcasing my skills, projects, and experience. Built with React and Tailwind CSS.",
      
      // Experience Section
      "experienceTitle": "Experience & Education",
      "experienceDescription": "My professional journey, education, and key project milestones that have shaped my development as a software engineer.",
      "experienceAll": "All",
      "experienceWork": "Work Experience", 
      "experienceEducation": "Education",
      "experienceProjects": "Key Projects",
      "all": "All",
      "workExperience": "Work Experience",
      "education": "Education",
      "personalProjects": "Personal Projects",
      
      // Experience Items
      "internTitle": "Intern",
      "internOrg": "Varde",
      "internDate": "June 2025 - August 2025",
      "internDescription": "Hands-on experience in a fast-paced startup environment with tight deadlines and challenging tasks. As part of a small team, I owned complex features end-to-end and grew immensely by shipping real value.",
      "internBullet1": "React Native (Expo), TypeScript, Firebase, SQL — daily production use",
      "internBullet2": "Apple platform work: Apple Watch integration and HealthKit data flows",
      "internBullet3": "Designed UX and UI for key journeys with accessible, responsive patterns",
      "internBullet4": "Built interactive graphs for health metrics and insights",
      "internBullet5": "Implemented insulin registration and food intake features to optimize BGL and insulin",
      "internBullet6": "Owned features under tight deadlines in a small company setting",
      "internBullet7": "Collaborated across disciplines; planned, implemented, and iterated using Git workflows",
      "internBullet8": "Learned rapidly from hard problems and shipped robust solutions",
      
      "bachelorTitle": "Bachelor's in Software Engineering",
      "bachelorOrg": "University of Agder, Grimstad, NO",
      "bachelorDate": "2023 - 2026",
      "bachelorDescription": "Pursuing a comprehensive software engineering degree with focus on full-stack development, algorithms, and software design principles.",
      
      "elkjopTitle": "Operations Assistant",
      "elkjopOrg": "Elkjøp Arendal, Norway",
      "elkjopDate": "August 2023 - Present",
      "elkjopDescription": "Enhancing store operations and customer experience in Norway's largest electronics retailer.",
      "elkjopBullet1": "Optimized store operations and enhanced customer experience",
      "elkjopBullet2": "Managed customer inquiries, contributing to high satisfaction scores",
      
      "mcdonaldsTitle": "Shift Leader",
      "mcdonaldsOrg": "McDonald's, Norway",
      "mcdonaldsDate": "June 2022 - June 2023",
      "mcdonaldsDescription": "Led team operations and provided excellent customer service in a fast-paced environment.",
      "mcdonaldsBullet1": "Supervised daily operations and trained new team members",
      "mcdonaldsBullet2": "Promoted a positive and productive work environment",
      
      "shiftProjectTitle": "Personal Project: Shift Management App",
      "shiftProjectOrg": "Self-initiated",
      "shiftProjectDate": "2024",
      "shiftProjectDescription": "Developed a cross-platform mobile app for managing work shifts using React Native and Firebase.",
      "shiftProjectBullet1": "Implemented user authentication and real-time updates",
      "shiftProjectBullet2": "Created intuitive navigation and responsive UI",
      
      "tetrisProjectTitle": "Personal Project: Tetris Clone",
      "tetrisProjectOrg": "Self-initiated",
      "tetrisProjectDate": "2024",
      "tetrisProjectDescription": "Designed a functional Tetris game using Python and Pygame framework.",
      "tetrisProjectBullet1": "Implemented scoring, collision detection, and responsive controls",
      "tetrisProjectBullet2": "Applied object-oriented programming principles",
      
      // Contact Section
      "contactTitle": "Get in Touch",
      "contactDescription": "I'd love to hear from you! Feel free to reach out through email or connect with me on social media.",
      "sendEmail": "Send me an email",
      
      // A11y / tooltips
      "toggleLanguageAria": "Toggle Language",
      "toggleLanguageTitle": "Switch language",
      "toggleDarkModeAria": "Toggle Dark Mode"
    }
  },
  no: {
    translation: {
      // Navigation
      "home": "Hjem",
      "about": "Om Meg",
      "skills": "Ferdigheter",
      "projects": "Prosjekter",
      "experience": "Erfaring",
      "contact": "Kontakt",
      "cv": "CV",
      
      // Landing Page
      "name": "Evan Belal",
      "title": "Programvareutvikler | Full-Stack Utvikler | Klar til å lære!",
      "discoverWork": "Oppdag Mitt Arbeid",
      "getInTouch": "Ta Kontakt",
      
      // About Section
      "aboutMe": "Om Meg",
      "aboutDescription1": "Jeg er en aspirerende programvareutvikler som for øyeblikket studerer ved Universitetet i Agder i Grimstad, Norge, med forventet uteksaminering i juni 2026. Min lidenskap ligger i å bygge skalerbare, brukervennlige applikasjoner som løser virkelige problemer.",
      "aboutDescription2": "Med praktisk erfaring innen full-stack utvikling, mobilapper og spillprogrammering, liker jeg å takle komplekse utfordringer og kontinuerlig forbedre meg gjennom virkelige prosjekter og samarbeid.",
      "location": "Plassering",
      "grimstadNorway": "Grimstad, Norge",
      "email": "E-post",
      "currentRole": "Nåværende Rolle",
      "operationsAssistant": "Driftsassistent ved Elkjøp Arendal",
      
      // Skills Section
      "skillsTitle": "Tekniske Ferdigheter",
      "skillsDescription": "En omfattende oversikt over min tekniske ekspertise og verktøyene jeg bruker for å bringe ideer til live.",
      "reactDescription": "Bygger responsive web- og mobilapplikasjoner med React-økosystemet.",
      "dotnetDescription": "Utvikler backend-systemer og applikasjoner med .NET-rammeverket.",
      "pythonDescription": "Lager applikasjoner og spill med Python-programmeringsspråket.",
      "cppDescription": "Løser algoritmiske problemer og utvikler applikasjoner med C++.",
      "gitDescription": "Håndterer kodeendringer og samarbeider med versjonskontrollsystemer.",
      "firebaseDescription": "Bygger applikasjoner med Googles Firebase-plattform for backend-tjenester.",
      
      // Projects Section
      "projectsTitle": "Mine Prosjekter",
      "projectsDescription": "Her er noen av prosjektene jeg har jobbet med. Hvert enkelt har hjulpet meg å vokse som utvikler og løse virkelige problemer gjennom kode.",
      "projectsAll": "Alle Prosjekter",
      "projectsWeb": "Webutvikling",
      "projectsMobile": "Mobilapper", 
      "projectsGame": "Spillutvikling",
      "allProjects": "Alle Prosjekter",
      "webDevelopment": "Webutvikling",
      "mobileApps": "Mobilapper",
      "gameDevelopment": "Spillutvikling",
      "github": "GitHub",
      "liveDemo": "Live Demo",
      "seeMoreGithub": "Se Mer på GitHub",
      
      // Project Descriptions
      "shiftAppDescription": "En kryssplattform mobilapplikasjon for å administrere arbeidsskift, med intuitiv navigasjon, sikker brukerautentisering og sanntidsoppdateringer.",
      "tetrisDescription": "Et funksjonelt Tetris-spill bygget med Python og Pygame, med smidig gameplay, poengssystem, kollisjonsdeteksjon og responsive kontroller.",
      "clipboardDescription": "En nettleserutvidelse som lagrer sitathistorikk for forskning, som lar brukere raskt få tilgang til og organisere kopiert tekst fra ulike kilder.",
      "portfolioDescription": "Denne moderne, responsive porteføljenettstedet som viser mine ferdigheter, prosjekter og erfaring. Bygget med React og Tailwind CSS.",
      
      // Experience Section
      "experienceTitle": "Erfaring & Utdanning",
      "experienceDescription": "Min faglige reise, utdanning og viktige prosjektmilepæler som har formet min utvikling som programvareutvikler.",
      "experienceAll": "Alle",
      "experienceWork": "Arbeidserfaring",
      "experienceEducation": "Utdanning", 
      "experienceProjects": "Nøkkelprosjekter",
      "all": "Alle",
      "workExperience": "Arbeidserfaring",
      "education": "Utdanning",
      "personalProjects": "Personlige Prosjekter",
      
      // Experience Items
      "internTitle": "Praktikant",
      "internOrg": "Varde",
      "internDate": "Juni 2025 - August 2025",
      "internDescription": "Fikk praktisk erfaring i et raskt og krevende miljø med korte frister og utfordrende oppgaver. Som del av et lite team fikk jeg ansvar for komplekse funksjoner fra idé til levering og vokste enormt ved å levere reell verdi.",
      "internBullet1": "Daglig bruk av React Native (Expo), TypeScript, Firebase og SQL",
      "internBullet2": "Arbeid på Apple-plattformen: Apple Watch-integrasjon og HealthKit-dataproser",
      "internBullet3": "Designet UX og UI for viktige brukerreiser med tilgjengelige, responsive mønstre",
      "internBullet4": "Bygget interaktive grafer for helsedata og innsikt",
      "internBullet5": "Implementerte insulinregistrering og matinntak for å optimalisere BGL og insulin",
      "internBullet6": "Eide funksjoner med korte frister i et lite selskap",
      "internBullet7": "Tverrfaglig samarbeid: planla, implementerte og itererte med Git-arbeidsflyter",
      "internBullet8": "Lærte raskt av krevende problemer og leverte robuste løsninger",
      
      "bachelorTitle": "Bachelor i Programvareteknikk",
      "bachelorOrg": "Universitetet i Agder, Grimstad, Norge",
      "bachelorDate": "2023 - 2026",
      "bachelorDescription": "Følger en omfattende programvareteknikk-grad med fokus på full-stack utvikling, algoritmer og programvaredesignprinsipper.",
      
      "elkjopTitle": "Driftsassistent",
      "elkjopOrg": "Elkjøp Arendal, Norge",
      "elkjopDate": "August 2023 - Nåværende",
      "elkjopDescription": "Forbedrer butikkdrift og kundeopplevelse i Norges største elektronikkforhandler.",
      "elkjopBullet1": "Optimaliserte butikkdrift og forbedret kundeopplevelse",
      "elkjopBullet2": "Håndterte kundehenvendelser og bidro til høye tilfredshetsskårer",
      
      "mcdonaldsTitle": "Skiftleder",
      "mcdonaldsOrg": "McDonald's, Norge",
      "mcdonaldsDate": "Juni 2022 - Juni 2023",
      "mcdonaldsDescription": "Ledet teamoperasjoner og ga utmerket kundeservice i et hektisk miljø.",
      "mcdonaldsBullet1": "Overvåket daglig drift og trente nye teammedlemmer",
      "mcdonaldsBullet2": "Fremmet et positivt og produktivt arbeidsmiljø",
      
      "shiftProjectTitle": "Personlig Prosjekt: Skiftadministrasjonsapp",
      "shiftProjectOrg": "Selvinitiert",
      "shiftProjectDate": "2024",
      "shiftProjectDescription": "Utviklet en kryssplattform mobilapp for å administrere arbeidsskift ved hjelp av React Native og Firebase.",
      "shiftProjectBullet1": "Implementerte brukerautentisering og sanntidsoppdateringer",
      "shiftProjectBullet2": "Laget intuitiv navigasjon og responsivt brukergrensesnitt",
      
      "tetrisProjectTitle": "Personlig Prosjekt: Tetris-klon",
      "tetrisProjectOrg": "Selvinitiert",
      "tetrisProjectDate": "2024",
      "tetrisProjectDescription": "Designet et funksjonelt Tetris-spill ved hjelp av Python og Pygame-rammeverket.",
      "tetrisProjectBullet1": "Implementerte poenggiving, kollisjonsdeteksjon og responsive kontroller",
      "tetrisProjectBullet2": "Anvendte objektorienterte programmeringsprinsipper",
      
      // Contact Section
      "contactTitle": "Ta Kontakt",
      "contactDescription": "Jeg vil gjerne høre fra deg! Ta gjerne kontakt via e-post eller koble deg til meg på sosiale medier.",
      "sendEmail": "Send meg en e-post",
      
      // A11y / tooltips
      "toggleLanguageAria": "Bytt språk",
      "toggleLanguageTitle": "Bytt språk",
      "toggleDarkModeAria": "Bytt mørk modus"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
