import { motion } from 'framer-motion';
import '../styles/About.css';

const About = ({ profilePicture, skills, interests, detailedDescription }) => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-title">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
        </div>
        
        <div className="about-content">
          <motion.div 
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src={profilePicture || 'https://via.placeholder.com/300'} alt="Profile" />
          </motion.div>
          
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p>{detailedDescription || 'No description available yet.'}</p>
            
            <motion.div 
              className="about-skills"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3>Skills</h3>
              <div className="skills-container">
                {skills && skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <motion.span 
                      key={index} 
                      className="skill-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      {skill}
                    </motion.span>
                  ))
                ) : (
                  <p>No skills listed yet.</p>
                )}
              </div>
            </motion.div>
            
            <motion.div 
              className="about-interests"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3>Interests</h3>
              <div className="interests-container">
                {interests && interests.length > 0 ? (
                  interests.map((interest, index) => (
                    <motion.span 
                      key={index} 
                      className="interest-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      {interest}
                    </motion.span>
                  ))
                ) : (
                  <p>No interests listed yet.</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 