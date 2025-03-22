import { createContext, useState, useContext } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState({
    personalInfo: {
      name: '',
      shortBio: '',
      profilePicture: '',
      skills: [],
      interests: [],
      detailedDescription: '',
    },
    projects: [],
    socialMedia: [],
    darkMode: false,
  });

  const updatePersonalInfo = (data) => {
    setPortfolioData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data }
    }));
  };

  const addProject = (project) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, project]
    }));
  };

  const updateProjects = (projects) => {
    setPortfolioData(prev => ({
      ...prev,
      projects
    }));
  };

  const addSocialMedia = (socialMedia) => {
    setPortfolioData(prev => ({
      ...prev,
      socialMedia: [...prev.socialMedia, socialMedia]
    }));
  };

  const removeSocialMedia = (index) => {
    setPortfolioData(prev => ({
      ...prev,
      socialMedia: prev.socialMedia.filter((_, i) => i !== index)
    }));
  };

  const toggleDarkMode = () => {
    setPortfolioData(prev => ({
      ...prev,
      darkMode: !prev.darkMode
    }));
  };

  return (
    <PortfolioContext.Provider value={{
      portfolioData,
      setPortfolioData,
      updatePersonalInfo,
      addProject,
      updateProjects,
      addSocialMedia,
      removeSocialMedia,
      toggleDarkMode
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}; 