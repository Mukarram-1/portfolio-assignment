import { motion } from 'framer-motion';

const Footer = ({ socialMediaLinks = [] }) => {
  const currentYear = new Date().getFullYear();
  
  // Default social media links if none are provided
  const defaultSocialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'Twitter', url: 'https://twitter.com' }
  ];
  
  const links = socialMediaLinks.length > 0 ? socialMediaLinks : defaultSocialLinks;
  
  // Get social media icon based on name
  const getSocialIcon = (name) => {
    const lowerCaseName = name.toLowerCase();
    
    if (lowerCaseName.includes('linkedin')) return 'fab fa-linkedin';
    if (lowerCaseName.includes('github')) return 'fab fa-github';
    if (lowerCaseName.includes('twitter') || lowerCaseName.includes('x')) return 'fab fa-twitter';
    if (lowerCaseName.includes('facebook')) return 'fab fa-facebook';
    if (lowerCaseName.includes('instagram')) return 'fab fa-instagram';
    if (lowerCaseName.includes('youtube')) return 'fab fa-youtube';
    
    // Default icon if no match
    return 'fas fa-link';
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div 
            className="footer-logo"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>Portfolio</h2>
            <p>Showcasing my work and skills</p>
          </motion.div>
          
          <motion.div 
            className="footer-social"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>Connect With Me</h3>
            <div className="social-links">
              {links.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <i className={getSocialIcon(link.name)}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} My Portfolio. All Rights Reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 