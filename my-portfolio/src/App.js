import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    // Determine the active section based on scroll position
    if (scrollPosition < 300) setActiveSection('home');
    else if (scrollPosition < 700) setActiveSection('education');
    else if (scrollPosition < 1200) setActiveSection('skills');
    else if (scrollPosition < 1800) setActiveSection('experience');
    else setActiveSection('projects');

    setSidebarVisible(scrollPosition < 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`app-container ${isSidebarVisible ? 'sidebar-visible' : ''}`}>
      <header className="navbar">
        <img src="/images/Aishani.jpg" alt="Aishani" className="profile-image" />
        <h1>Your Name</h1>
      </header>

      <nav className="sidebar">
        <img src="/images/Aishani.jpg" alt="Aishani" className="profile-image-sidebar" />
        <button
          onClick={() => {
            scrollToSection('home');
            setActiveSection('home');
          }}
          className={activeSection === 'home' ? 'active' : ''}
        >
          About
        </button>
        <button
          onClick={() => {
            scrollToSection('education');
            setActiveSection('education');
          }}
          className={activeSection === 'education' ? 'active' : ''}
        >
          Education
        </button>
        <button
          onClick={() => {
            scrollToSection('skills');
            setActiveSection('skills');
          }}
          className={activeSection === 'skills' ? 'active' : ''}
        >
          Skills
        </button>
        <button
          onClick={() => {
            scrollToSection('experience');
            setActiveSection('experience');
          }}
          className={activeSection === 'experience' ? 'active' : ''}
        >
          Experience
        </button>
        <button
          onClick={() => {
            scrollToSection('projects');
            setActiveSection('projects');
          }}
          className={activeSection === 'projects' ? 'active' : ''}
        >
          Projects
        </button>
      </nav>

      <div className="content">
        <section id="home">
          <Home />
        </section>

        <section id="education">
          <Education />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="projects">
          <Projects />
        </section>
      </div>
    </div>
  );
}

export default App;
