
/**
 * Factory function to create a task
 * @param {string} name - Name for the project
 * @returns {object}
 */

const createProject = (name) => {
  let tasks = [];
  const changeProjectName = newName => {
    name = newName
  }

  return {
    name,
    tasks,
    changeProjectName
  }
}

export default createProject;