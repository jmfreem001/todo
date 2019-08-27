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

module.exports = createTask;