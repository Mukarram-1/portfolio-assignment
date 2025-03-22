/**
 * GitHub API service for fetching repositories and converting them to project format
 */

/**
 * Fetches repositories for a specified GitHub username
 * @param {string} username - GitHub username
 * @param {number} limit - Maximum number of repos to fetch (default: 6)
 * @returns {Array} Array of formatted project objects
 */
export const fetchGitHubProjects = async (username, limit = 6) => {
  try {
    // GitHub API endpoint for user repositories
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos = await response.json();
    
    // Map GitHub repositories to project format
    return repos.map(repo => ({
      id: `github-${repo.id}`,
      title: repo.name,
      description: repo.description || 'No description available',
      // Use GitHub repository's OpenGraph image as project image
      image: `https://opengraph.githubassets.com/1/${username}/${repo.name}`,
      githubLink: repo.html_url,
      demoLink: repo.homepage || '',
      // Add additional metadata
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      updatedAt: repo.updated_at
    }));
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    // Return empty array to allow graceful fallback
    return [];
  }
};

/**
 * Gets languages used in a specific repository
 * @param {string} username - GitHub username
 * @param {string} repo - Repository name
 * @returns {Object} Object containing language data
 */
export const fetchRepoLanguages = async (username, repo) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/languages`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching languages for ${repo}:`, error);
    return {};
  }
}; 