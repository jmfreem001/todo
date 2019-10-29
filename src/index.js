import broker from './broker'
import store from './store'
import render from './render'
// import {format} from 'date-fns'
import loader from './loader'
import './app.css';

/* SUBSCRIPTIONS */
// Listen for DOM updates
broker.subscribe('activeProjectDomUpdate', store.updateActiveProject)
broker.subscribe('projectListDomUpdate', store.addProject)
broker.subscribe('taskListDomUpdate', store.addTask)
broker.subscribe('activeTaskDomUpdate', store.updateActiveTask)
broker.subscribe('taskDelete', store.removeTask)

broker.subscribe('updateTask', store.replaceTask)

const getDeletedTask = (tid) => {
  console.log('get Delete task called');
  
  let project = store.getActiveProject()
  let task = project.tasks[tid]
  console.log(`Task name = is ${task.title}`);
  
  broker.publish('taskDelete', task.title )
}

// Get the Id number from the DOM and pass to the store
broker.subscribe('taskDeleteDomUpdate', getDeletedTask)


//Publish updated list when dom Clicked
const publishProjectList = () => {
  let updatedList = store.getList()
  broker.publish('updateProjectList', updatedList)
}

// Listen for dom update and route for re-rendering
broker.subscribe('projectListDomUpdate', publishProjectList)

// listen for taskList update and rebublish project list to ensure local storage up to date. 
broker.subscribe('updateTaskList', publishProjectList)

// Publish updated task list when dom updated
const publishTaskList = () => {
  let activeProject = store.getActiveProject()
  broker.publish('updateTaskList', activeProject)
}

//Listen for added projects, updated active Project, or deleted task and route for re-rendering
broker.subscribe('taskListDomUpdate', publishTaskList)
broker.subscribe('updateActiveProject', publishTaskList)
broker.subscribe('taskDelete', publishTaskList)
broker.subscribe('updateTask', publishTaskList)

// publishing active Project Data
const updateSelected = () => {
  broker.publish('updateActiveProject', store.getActiveProject())
}

// Listen for dom update and route for re-rendering
broker.subscribe('activeProjectDomUpdate', updateSelected)

// publishing active task Data
const updateActive = (e) => {
  broker.publish('updateActiveTask', store.getActiveTask())
}

// Listen for dom update and route for re-rendering
broker.subscribe('activeTaskDomUpdate', updateActive)
broker.subscribe('updateTask', updateActive)

const controller  = ( () => {
  // Initial render
  const render = () => {
    broker.publish('updateProjectList', store.getList())
    broker.publish('updateTaskList', store.getActiveProject())
  }

  // window.localStorage.clear()
  return {
    render
  }
})();

loader()
controller.render()

/* Button listeners */
let projButton = document.getElementById('add-project');
projButton.addEventListener('click', render.domAddProject);

// Tasks adding listener
let taskButton = document.getElementById('add-task');
taskButton.addEventListener('click', render.domAddTask);

const updateLocalStore = (list) =>{
  
  window.localStorage.setItem('general', JSON.stringify(list))
} 
broker.subscribe('updateProjectList', updateLocalStore)
// broker.subscribe('updateTaskList', updateLocalStore)
