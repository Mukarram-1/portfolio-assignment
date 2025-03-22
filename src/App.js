import { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import DataEntryForm from './components/DataEntryForm';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

// Create a wrapper component to access the context
const PortfolioContent = ({ initialData }) => {
  const { portfolioData, toggleDarkMode } = usePortfolio();
  
  // Sync the dark mode state with the body attribute on initial render only
  useEffect(() => {
    if (portfolioData.darkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [portfolioData.darkMode]);
  
  return (
    <>
      <Navbar onDarkModeToggle={toggleDarkMode} />
      <main className="portfolio-content">
        <Hero props={portfolioData.personalInfo} />
        <About 
          profilePicture={portfolioData.personalInfo.profilePicture}
          skills={portfolioData.personalInfo.skills}
          interests={portfolioData.personalInfo.interests}
          detailedDescription={portfolioData.personalInfo.detailedDescription}
        />
        <Projects initialProjects={portfolioData.projects} />
        <Contact />
        <Footer socialMediaLinks={portfolioData.socialMedia} />
      </main>
    </>
  );
};

function App() {
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  
  // Handle the form submission
  const handleFormSubmit = (data) => {
    setPortfolioData(data);
    setDataSubmitted(true);
  };

  return (
    <PortfolioProvider initialData={portfolioData}>
      {!dataSubmitted ? (
        <DataEntryForm onSubmit={handleFormSubmit} />
      ) : (
        <PortfolioContent initialData={portfolioData} />
      )}
    </PortfolioProvider>
  );
}

export default App;
