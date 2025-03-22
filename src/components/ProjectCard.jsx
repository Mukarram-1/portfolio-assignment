import { motion } from 'framer-motion';
import '../styles/ProjectCard.css';

const ProjectCard = ({ title, description, image, githubLink, demoLink, stars, forks, language }) => {
  return (
    <motion.div 
      className="project-card"
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="project-image">
        <img src={image || 'https://source.unsplash.com/random/400x250?tech'} alt={title} />
      </div>
      <div className="project-content">
        <h3>{title || 'Project Title'}</h3>
        <p>{description || 'Project description goes here. This is a brief overview of what the project does and what technologies were used.'}</p>
        
        {/* Show GitHub stats if available */}
        {(stars !== undefined || forks !== undefined || language) && (
          <div className="project-stats">
            {language && <span className="project-language">{language}</span>}
            {stars !== undefined && <span className="project-stars">⭐ {stars}</span>}
            {forks !== undefined && <span className="project-forks">🍴 {forks}</span>}
          </div>
        )}
        
        <div className="project-links">
          {githubLink && (
            <a href={githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
              GitHub
            </a>
          )}
          {demoLink && (
            <a href={demoLink} target="_blank" rel="noopener noreferrer" className="project-link">
              Live Demo
            </a>
          )}
        </div>
      </div>
      <div className="project-drag-handle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 