
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

  // const addTask = value => {
  //   taskList = taskList.concat(value)
  // }

  // const removeTask = value => {
  //   let location = taskList.indexOf(value);
  //   taskList = taskList.filter(location, 1);
  // }
  return {
    name,
    // addTask,
    // removeTask,
    tasks,
    changeProjectName
  }
}

module.exports = createProject;