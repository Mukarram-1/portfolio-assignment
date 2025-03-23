import { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import PortfolioForms from './components/PortfolioForms';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const PortfolioContent = ({ initialData }) => {
  const { portfolioData, toggleDarkMode } = usePortfolio();
  
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
        <Contact name={portfolioData.personalInfo.name} email={portfolioData.personalInfo.email} phone={portfolioData.personalInfo.phone} city={portfolioData.personalInfo.city} country={portfolioData.personalInfo.country} />
        <Footer socialMediaLinks={portfolioData.socialMedia} />
      </main>
    </>
  );
};

function App() {
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  
  const handleFormSubmit = (data) => {
    setPortfolioData(data);
    setDataSubmitted(true);
  };

  return (
    <PortfolioProvider initialData={portfolioData}>
      {!dataSubmitted ? (
        <PortfolioForms onSubmit={handleFormSubmit} />
      ) : (
        <PortfolioContent initialData={portfolioData} />
      )}
    </PortfolioProvider>
  );
}

export default App;
