import broker from './broker'
import createProject from './projects'
import createTask from './tasks'
import { formatDistance } from 'date-fns'
import { clearChildren,  newButton, newBreak, newDynamicInput} from './utils'

const render = ( () => {
  const renderProjectList = (categoryList) => {
      //table
      let table = document.querySelector('.project-list');
      clearChildren(table)  
      let count = 0
      for (let project of categoryList){
        // Renders each project listing as a list item. 
        projectListing(project, table, count);
        count++
      }
      let projItems = document.querySelectorAll('.project')
      projItems.forEach(item => item.addEventListener('click', getSelected))
  }
  
  // Ensure Project List is re-rendered on changes. 
  broker.subscribe('updateProjectList', renderProjectList)
    
  const projectListing = (project, table, count) => {
          // Component for rendering project elements. 
       let row = document.createElement('tr')

      let item = document.createElement('td');
      item.textContent = project.name;
      item.dataset.pid = count;
      item.classList.add('project')
      row.appendChild(item)

      let item2 = document.createElement('td');
      let button = newButton('Remove', 'remove-project')
      button.dataset.name = project.name;
      button.onclick = removeCategory
      item2.appendChild(button)
      row.appendChild(item2)
      

      table.appendChild(row);
  }

  const removeCategory = (e )=>{
    const confirmed =confirm('Are you sure you want to remove? This will remove all associated tasks as well.')
    if (confirmed){
      broker.publish('projectDelete', e.target.dataset.name)
    }
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

      if (newProject.name !== ''){
        broker.publish('projectListDomUpdate', newProject)
        
      } else alert('Catgory must have a name')
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

// TODO Move Task Details to its own module. 

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

  broker.publish('updateTask', tempStore)
  broker.publish('activeTaskDomUpdate', tid)
}


function renderTaskDetail(active) {


  tempStore = {...tempStore, ...active}
  
  
  let details = document.querySelector('.detail');
  details.addEventListener('blur', handleBlur, true)
  clearChildren(details);
  let heading = document.createElement('h2')
  heading.textContent = 'Task Detail';
  details.appendChild(heading)

  let subheading = document.createElement('p');
  let emphasizedHeading = document.createElement('em')
  emphasizedHeading.textContent = 'Review and update your todo.';
  subheading.appendChild(emphasizedHeading)

  details.appendChild(subheading)
  
  let inputTitle = newDynamicInput('title', 'active-title', 'text', active.title, handleChange)
  inputTitle.onblur= "handleBlur()"

  details.appendChild(inputTitle)

  
  let inputDesc = newDynamicInput('description', 'active-description', 'text', active.description, handleChange)
  inputDesc.onblur= "handleBlur()"

  details.appendChild(inputDesc)

  let inputDueDate = newDynamicInput('dueDate', 'active-due-date', 'date', active.dueDate, handleChange)
  inputDueDate.onblur= "handleBlur()"
  details.appendChild(inputDueDate)

  newBreak(details)

  let changesButton = newButton('Click after Change')
  details.appendChild(changesButton)

  newBreak(details)

  let priorityText = document.createElement('p')
  priorityText.textContent = `Adjust Priority (${active.priority}): `

  details.appendChild(priorityText)

  let arrows = document.createElement('p');
  arrows.classList.add('arrows')
  
  let upArrow = document.createElement('span');
  upArrow.id = 'up-arrow'
  upArrow.textContent = '↑'
  upArrow.onclick = priorityHandler
  arrows.appendChild(upArrow)
  details.appendChild(arrows)

  let downArrow = document.createElement('span');
  downArrow.id = 'down-arrow'
  downArrow.textContent = '↓'
  downArrow.onclick = priorityHandler
  arrows.appendChild(downArrow)
  details.appendChild(arrows)

  newBreak(details)

  let completeButton = document.createElement('button')
  completeButton.textContent = (tempStore.complete)? 'Mark Incomplete': 'Mark Complete'
  completeButton.onclick = toggleComplete
  details.appendChild(completeButton)
}


function priorityHandler(e){
  let direction = '' 
  if (e.target.id === 'up-arrow') direction = 'up'
  else direction = 'down'
  changePriority(direction)
}
function changePriority(direction){
  let priorities = ['Low', 'Medium', 'High']

  let start = priorities.indexOf(tempStore.priority)
  let index = start;

  if (direction === 'up' && start < (priorities.length - 1)){  
    index++
  }else if (direction === 'down' && start > 0){
    index--
  } else {
    alert(`Priority can not be ${(direction==='up')? 'raised':'lowered'} any further.`)
    return
  } 
  tempStore.priority = priorities[index]

  broker.publish('updateTask', tempStore)
  broker.publish('activeTaskDomUpdate', tid)
}

function toggleComplete(e){
  // Toggles complete/Incomplete
  tempStore.complete = !tempStore.complete
  broker.publish('updateTask', tempStore)
  broker.publish('activeTaskDomUpdate', tid)
  
}
// Ensure Task Detail is shown when task selected. 
broker.subscribe('updateActiveTask', renderTaskDetail)




export default render