import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import '../styles/DataEntryForm.css';

const DataEntryForm = ({ onSubmit }) => {
  const { setPortfolioData } = usePortfolio();
  
  const [formData, setFormData] = useState({
    name: '',
    shortBio: '',
    profilePicture: '',
    skills: '',
    interests: '',
    detailedDescription: '',
    projects: [
      { id: 'project-1', title: '', description: '', image: '', githubLink: '' }
    ],
    socialMedia: [
      { name: 'LinkedIn', url: '' }
    ]
  });
  
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [projectImageFiles, setProjectImageFiles] = useState([null]);
  
  // Handle input changes for general fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle project input changes
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      projects: updatedProjects
    }));
  };
  
  // Add a new project field
  const addProject = () => {
    const newProjectId = `project-${formData.projects.length + 1}`;
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: newProjectId, title: '', description: '', image: '', githubLink: '' }]
    }));
    setProjectImageFiles([...projectImageFiles, null]);
  };
  
  // Remove a project
  const removeProject = (index) => {
    if (formData.projects.length <= 1) return;
    
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      projects: updatedProjects
    }));
    
    const updatedProjectImageFiles = projectImageFiles.filter((_, i) => i !== index);
    setProjectImageFiles(updatedProjectImageFiles);
  };
  
  // Handle social media input changes
  const handleSocialChange = (index, field, value) => {
    const updatedSocialMedia = [...formData.socialMedia];
    updatedSocialMedia[index] = {
      ...updatedSocialMedia[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      socialMedia: updatedSocialMedia
    }));
  };
  
  // Add a new social media field
  const addSocialMedia = () => {
    setFormData(prev => ({
      ...prev,
      socialMedia: [...prev.socialMedia, { name: '', url: '' }]
    }));
  };
  
  // Remove a social media field
  const removeSocialMedia = (index) => {
    if (formData.socialMedia.length <= 1) return;
    
    const updatedSocialMedia = formData.socialMedia.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      socialMedia: updatedSocialMedia
    }));
  };
  
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfileImageFile(file);
    
    // Create a temporary URL for the file
    const imageUrl = URL.createObjectURL(file);
    setFormData({
      ...formData,
      profilePicture: imageUrl
    });
  };
  
  const handleProjectImageChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedProjectImageFiles = [...projectImageFiles];
    updatedProjectImageFiles[index] = file;
    setProjectImageFiles(updatedProjectImageFiles);
    
    // Create a temporary URL for the file
    const imageUrl = URL.createObjectURL(file);
    handleProjectChange(index, 'image', imageUrl);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process data for submission
    const processedData = {
      personalInfo: {
        name: formData.name,
        shortBio: formData.shortBio,
        profilePicture: formData.profilePicture,
        skills: formData.skills.split(',').map(skill => skill.trim()),
        interests: formData.interests.split(',').map(interest => interest.trim()),
        detailedDescription: formData.detailedDescription
      },
      projects: formData.projects,
      socialMedia: formData.socialMedia.filter(social => social.name && social.url),
      darkMode: false
    };
    
    // Update context with form data
    setPortfolioData(processedData);
    
    // Call the onSubmit callback
    if (onSubmit) {
      onSubmit(processedData);
    }
  };

  return (
    <div className="data-entry">
      <div className="container">
        <motion.div 
          className="form-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Create Your Portfolio</h1>
          <p>Please fill in the details below to generate your portfolio.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Personal Information</h2>
              
              <div className="form-group">
                <label htmlFor="name">Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="shortBio">Short Bio* (One-liner about yourself)</label>
                <input
                  type="text"
                  id="shortBio"
                  name="shortBio"
                  value={formData.shortBio}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Web Developer passionate about creating modern websites"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="profilePicture">Profile Picture</label>
                <div className="file-input-container">
                  <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="file-input"
                  />
                  <div className="file-input-label">
                    {profileImageFile ? profileImageFile.name : 'Choose File'}
                  </div>
                </div>
                {formData.profilePicture && (
                  <div className="image-preview">
                    <img src={formData.profilePicture} alt="Profile preview" />
                  </div>
                )}
                <div className="form-hint">
                  <span>Or enter an image URL:</span>
                  <input
                    type="text"
                    name="profilePicture"
                    value={profileImageFile ? '' : formData.profilePicture}
                    onChange={handleChange}
                    placeholder="https://example.com/profile.jpg"
                    disabled={profileImageFile !== null}
                  />
                  {profileImageFile && (
                    <button 
                      type="button" 
                      className="reset-file-button"
                      onClick={() => {
                        setProfileImageFile(null);
                        setFormData({
                          ...formData,
                          profilePicture: ''
                        });
                      }}
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="skills">Skills* (comma-separated)</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                  placeholder="e.g., HTML, CSS, JavaScript, React"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="interests">Interests (comma-separated)</label>
                <input
                  type="text"
                  id="interests"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  placeholder="e.g., Web Design, UI/UX, Mobile Development"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="detailedDescription">About Me (Detailed description)*</label>
                <textarea
                  id="detailedDescription"
                  name="detailedDescription"
                  value={formData.detailedDescription}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Write a detailed description about yourself, your background, experience, etc."
                ></textarea>
              </div>
            </div>
            
            <div className="form-section">
              <h2>Projects</h2>
              <p>Enter at least one project. You must add a minimum of 3 projects to enable the draggable feature.</p>
              
              {formData.projects.map((project, index) => (
                <div key={index} className="project-form">
                  <div className="social-form-header">
                    <h3>Project {index + 1}</h3>
                    {formData.projects.length > 1 && (
                      <button 
                        type="button" 
                        className="remove-btn"
                        onClick={() => removeProject(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`project-title-${index}`}>Title*</label>
                    <input
                      type="text"
                      id={`project-title-${index}`}
                      value={project.title}
                      onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                      required
                      placeholder="Project title"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`project-description-${index}`}>Description*</label>
                    <textarea
                      id={`project-description-${index}`}
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                      required
                      rows="3"
                      placeholder="Brief description of the project"
                    ></textarea>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`project-image-${index}`}>Image</label>
                    <div className="file-input-container">
                      <input
                        type="file"
                        id={`project-image-${index}`}
                        name={`project-image-${index}`}
                        accept="image/*"
                        onChange={(e) => handleProjectImageChange(index, e)}
                        className="file-input"
                      />
                      <div className="file-input-label">
                        {projectImageFiles[index] ? projectImageFiles[index].name : 'Choose File'}
                      </div>
                    </div>
                    {project.image && (
                      <div className="image-preview">
                        <img src={project.image} alt={`${project.title} preview`} />
                      </div>
                    )}
                    <div className="form-hint">
                      <span>Or enter an image URL:</span>
                      <input
                        type="text"
                        value={projectImageFiles[index] ? '' : project.image}
                        onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                        placeholder="https://example.com/project.jpg"
                        disabled={projectImageFiles[index] !== null}
                      />
                      {projectImageFiles[index] && (
                        <button 
                          type="button" 
                          className="reset-file-button"
                          onClick={() => {
                            const updatedFiles = [...projectImageFiles];
                            updatedFiles[index] = null;
                            setProjectImageFiles(updatedFiles);
                            
                            handleProjectChange(index, 'image', '');
                          }}
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`project-github-${index}`}>GitHub Link*</label>
                    <input
                      type="url"
                      id={`project-github-${index}`}
                      value={project.githubLink}
                      onChange={(e) => handleProjectChange(index, 'githubLink', e.target.value)}
                      required
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                </div>
              ))}
              
              <button 
                type="button" 
                className="add-social-btn"
                onClick={addProject}
              >
                + Add Project
              </button>
            </div>
            
            <div className="form-section">
              <h2>Social Media Links</h2>
              
              {formData.socialMedia.map((social, index) => (
                <div key={index} className="social-form">
                  <div className="social-form-header">
                    <h3>Social Media {index + 1}</h3>
                    {formData.socialMedia.length > 1 && (
                      <button 
                        type="button" 
                        className="remove-btn"
                        onClick={() => removeSocialMedia(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor={`social-name-${index}`}>Platform*</label>
                      <input
                        type="text"
                        id={`social-name-${index}`}
                        value={social.name}
                        onChange={(e) => handleSocialChange(index, 'name', e.target.value)}
                        required
                        placeholder="e.g., LinkedIn, GitHub, Twitter"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor={`social-url-${index}`}>URL*</label>
                      <input
                        type="url"
                        id={`social-url-${index}`}
                        value={social.url}
                        onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                        required
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                type="button" 
                className="add-social-btn"
                onClick={addSocialMedia}
              >
                + Add Social Media
              </button>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="generate-btn">
                Generate Portfolio
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default DataEntryForm; 