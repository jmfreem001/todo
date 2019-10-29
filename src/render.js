import broker from './broker'
import createProject from './projects'
import createTask from './tasks'
import { formatDistance } from 'date-fns'
import { newDiv, newButton, newInput, newLabel, newBreak, newDynamicInput} from './utils'

const render = ( () => {
  const renderProjectList = (categoryList) => {
      // Renders project list. 
      let list = document.querySelector('.project-list');
      clearChildren(list)  
      // console.log(categoryList)
      let count = 0
      for (let project of categoryList){
        // Renders each project listing as a list item. 
        projectListing(project, list, count);
        count++
      }
      let projItems = document.querySelectorAll('.project')
      projItems.forEach(item => item.addEventListener('click', getSelected))
  }
  
  // Ensure Project List is re-rendered on changes. 
  broker.subscribe('updateProjectList', renderProjectList)
    
  const projectListing = (project, list, count) => {
      // Component for rendering project elements. 
      let item = document.createElement('li');
      item.textContent = project.name;
      item.dataset.pid = count;
      item.classList.add('project')
      list.appendChild(item);
  }
  
  // publishes selected object id to for eventual use in task list function.
  const getSelected = (e) => 
    broker.publish('activeProjectDomUpdate', e.target.dataset.pid)
    
    
  const  clearTaskDetails = () => {
      // clears task details whenever active Project Changes
      let details = document.querySelector('.detail')
      clearChildren(details)
  }
  
  // Ensure Task Details are hidden when active Project changes. 
  broker.subscribe('updateActiveProject', clearTaskDetails)   
    
  const domAddProject = () => {
  // Add Project to the project list
  
      let newProject = createProject(getNewProject());
      // Ensure Project name is unique. 
        
    //   if (store.getList().filter(proj => proj.name === newProject.name).length > 0){
    //       alert('Project Name already taken, please enter a different name')
    //       return 
    //   }

      broker.publish('projectListDomUpdate', newProject)
  }
    
  const getNewProject = () => {
  // Gets project Name from DOM
      let input = document.getElementById('new-project-name');
      let value = input.value;
      // reset input value
      input.value = "";
      return value
  }
 
// /* Task List functions   */
  const getActive = (e) => 
    broker.publish('activeTaskDomUpdate', e.target.dataset.tid)
  
  
  const renderTaskList = (selected) => {
    // Get the item from the array that aligns with the pid selected. 
    console.log('In render')
    console.log(selected);
    let subheading = document.getElementById('subheading');
    subheading.textContent = selected.name;
    let list = document.querySelector('.task-list');
    clearChildren(list);
    let count = 0;
    for (let task of selected.tasks){
      taskListing(task, list, count)
      count++
    }
    let taskItems = document.querySelectorAll('.task')
    taskItems.forEach(item => item.addEventListener('click', getActive))
  }
 
  // update taskList on task List publish
  broker.subscribe('updateTaskList', renderTaskList)

  const taskListing = (task, list, count) => {

    let table = document.querySelector('.task-list');

    if (table.children.length === 0) {
        // Create table headers if they don't exist.
      let headers = document.createElement('tr');
      let titleCol = document.createElement('th');
      titleCol.textContent = 'Task'
      headers.appendChild(titleCol);
      let dueCol = document.createElement('th');
      dueCol.textContent = 'Due';
      headers.appendChild(dueCol);
      table.appendChild(headers);
    }

    // add row of data
    let row = document.createElement('tr')
    let priority = priorityMarker(task)

    if (task.complete) {
      row.classList.add('completed-task')
    }

    // Add
    let title = document.createElement('td')
    title.textContent = task.title;
    title.dataset.tid = count;
    title.classList.add('task')
    title.classList.add(priority)


    row.appendChild(title);
    // display task due date
    let dueDate = document.createElement('td');
    let due = formatDistance(new Date(task.dueDate), new Date() , {addSuffix:true})
    dueDate.textContent = `Due ${due}`
    row.appendChild(dueDate)

    let removeTask = document.createElement('td');


    let button = document.createElement('button')
    button.textContent = 'Delete Task'
    button.dataset.tid = count;
    button.onclick = deleteHandler
    removeTask.appendChild(button)
    row.appendChild(removeTask)

    // Append to DOM
    table.appendChild(row);
  }

  const priorityMarker = task => {
    if (task.priority === 'Low'){
      return 'low-priority'
    } else if (task.priority === 'Medium'){
      return 'medium-priority'
    } else if(task.priority === 'High'){
      return 'high-priority'
    }
  }

  const deleteHandler = (e) => {
    let confirmed = confirm("Are you really, REALLY sure you want to do this? No seriously, it can't be undone.")
    if (confirmed){
      let { tid } = e.target.dataset;
      broker.publish('taskDeleteDomUpdate', tid) 
    }
}

  const taskIsValid = task => {
    // Perform form validation
  
    if (task.title === ''){
      alert('Title is required.')
      return false;
    } else if (task.description === ''){
      alert('Description is required.')
      return false;
    } else if (task.dueDate === ''){
      alert('Due Date is required')
      return false;
    } else {
      return true
    }      
  }

  const getTask = () => {
     // Get values from each form element. 
     let taskTitle = document.getElementById('task-title');
     let title = taskTitle.value;
     let taskDescription = document.getElementById('task-description');
     let description = taskDescription.value; 
     let taskDate = document.getElementById('due-date');
     let dueDate = taskDate.value;
     let taskPrioriy = document.getElementById('task-priority');
     let priority = taskPrioriy.value;

     // reset inputs
     taskTitle.value = ''
     taskDescription.value = ''
     taskDate.value = ''
     taskPrioriy.value = 'Medium'

     return [title, description, dueDate, priority]
  }

  const domAddTask = () => {
    // get task received from dom 
    let [title, description, dueDate, priority] = getTask()
    let task = createTask(title, description, dueDate, priority)
    // Perform form validation
    if (taskIsValid(task)){
      broker.publish('taskListDomUpdate', task)
    }
  }

  return {
      renderProjectList,
      renderTaskList,
      domAddProject,
      domAddTask
  }
})();

let tempStore = {}
let tid = null

function updateDetailTaskId(value){
  tid = value
  return tid
}
broker.subscribe('activeTaskDomUpdate', updateDetailTaskId) 

function handleChange(e){
  tempStore= {...tempStore, [e.target.name]: e.target.value }
  
}

function handleBlur(e){
  console.log(`Blurred. Temp store completed = ${tempStore.complete}`)
  console.log(e);
  broker.publish('updateTask', tempStore)
  broker.publish('activeTaskDomUpdate', tid)
}



function renderTaskDetail(active) {

  //TODO , changes in Mark complete showing updateare not maintaining an update
  //
  //
  tempStore = {...tempStore, ...active}
  
  
  let details = document.querySelector('.detail');
  details.addEventListener('blur', handleBlur, true)
  clearChildren(details);
  let heading = document.createElement('h2')
  heading.textContent = 'Task Detail';
  details.appendChild(heading)
  
  let inputTitle = newDynamicInput('title', 'active-title', 'text', active.title, handleChange)
  inputTitle.onblur= "handleBlur()"

  details.appendChild(inputTitle)

  let title = document.createElement('h3');
  title.textContent = active.title;
  details.appendChild(title)
  let desc = newPara(active.description);
  details.appendChild(desc)
  let due = newPara(`Due ${active.dueDate}`);
  details.appendChild(due)
  let priority = newPara(`${active.priority} priority`);
  details.appendChild(priority)
  let complete = newPara(`Task complete ${active.complete}`)
  details.appendChild(complete)
  
  // Add a toggle button for toggling completion status
  let completeButton = document.createElement('button')
  console.log(tempStore.complete);
  console.log(tempStore.complete? 'Mark Not Complete': 'Mark Complete');
   
  completeButton.textContent = (tempStore.complete)? 'Mark Not Complete': 'Mark Complete'
  completeButton.onclick = toggleComplete
  details.appendChild(completeButton)
  // let updateTaskButton = newButton('Save updates', 'update-task')
  // updateTaskButton.onclick = updateTask
  // details.appendChild(updateTaskButton)
  // input for text for title where with activetitle id and custom formatting
  //  input for text for desc where with activeDesc id and custom formatting
  // input for date for  with activeDue id and custom formatting
  // 
  // let priority = newPara(`${active.priority} priority`); Selector to change priority
  // 
  // button to toggle complete status
  // details.appendChild(complete)
}
// function updateTask(){
//   broker.publish('updateTask', tempStore)
  
//   // clog('published')
//   console.log('Published');
  
// }

function toggleComplete(e){
  console.log(`Before toggle ${tempStore.complete}`);
  tempStore.complete = !tempStore.complete
  console.log(`after toggle ${tempStore.complete}`);
  broker.publish('updateTask', tempStore)
  broker.publish('activeTaskDomUpdate', tid)
  // Need to figure out how to send the whole task when this knows nothing about it yet.( may have to implemetn inputs sooner than expected. )
  
}
// Ensure Task Detail is shown when task selected. 
broker.subscribe('updateActiveTask', renderTaskDetail)

// TODO Add a publish for updated task here/ (should send update task)

/* UTILITY FUNCTIONS */
function clearChildren(el){
  while(el.children.length >0){
    el.removeChild(el.children[0]);
  }
}

function newPara(text){
  let item = document.createElement('p');
  item.textContent = text;

  return item;
}

export default render