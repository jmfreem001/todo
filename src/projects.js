
/**
 * Factory function to create a task
 * @param {string} name - Name for the project
 * @returns {object}
 */

const createProject = (name) => {
  let taskList = [];
  const changeProjectName = newName => {
    name = newName
  }

  const addTask = value => {
    taskList.push(value)
  }

  const removeTask = value => {
    let location = taskList.indexOf(value);
    taskList.splice(location, 1);
  }
  return {
    name,
    addTask,
    removeTask,
    taskList,
    changeProjectName
  }
}

module.exports = createProject;