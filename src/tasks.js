/**
 * Factory Function to crete tasks
 * @param {string} title - Title of task
 * @param {string} description - More detailed description of what should be done
 * @param {Date} dueDate - Date the at the task is due
 * @param {string} priority - Priority low, medium, or high
 * @return {object}
 */

const createTask = (title, description, dueDate, priority) => {
  let complete = false;

  const toggleComplete = () => {
    complete = !complete
  }
  const changePriority = (value) =>{
    priority = value;
  }

  return {
    title, 
    description,
    dueDate,
    priority,
    changePriority,
    // notes,
    // checklist,
    complete,
    toggleComplete
  }
}

export default createTask;