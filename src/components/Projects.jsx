import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import "../styles/Projects.css";
import Draggable from "react-draggable";

const Projects = ({ initialProjects = [] }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        //fetching projects from API
        try {
          const response = await fetch(
            `https://api.github.com/users/Mukarram-1/repos?sort=updated&per_page=${5}`
          );

          if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
          }

          const repos = await response.json();
          const fetchedProjects = repos.map((repo) => ({
            id: `github-${repo.id}`,
            title: repo.name,
            description: repo.description || "No description available",
            image: `https://opengraph.githubassets.com/1/Mukarram-1/${repo.name}`,
            githubLink: repo.html_url,
            demoLink: repo.homepage || "",
          }));
          setProjects(fetchedProjects);
          console.log(fetchedProjects);
        } catch (error) {
          console.error("Error fetching GitHub projects:", error);
          setError("Failed to load projects, using fallback projects instead.");
          setProjects(initialProjects);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error in fetchProjects:", err);
        setError("Failed to load projects.");
        setProjects(initialProjects);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [initialProjects]);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-title">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            My Projects
          </motion.h2>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading projects...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <Draggable key={project.id} nodeRef={projectsRef}>
                  <div className="project-item" ref={projectsRef}>
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      image={project.image}
                      githubLink={project.githubLink}
                    />
                  </div>
                </Draggable>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <Draggable key={project.id} nodeRef={projectsRef}>
                  <div className="project-item" ref={projectsRef}>
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      image={project.image}
                      githubLink={project.githubLink}
                    />
                  </div>
                </Draggable>
              ))}
            </div>
            <motion.div
              className="draggable-hint"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p>Tip: You can drag and rearrange the project cards!</p>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
