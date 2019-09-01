let createTask = require('./tasks.js');
let createProject = require('./projects')
// import {format} from 'date-fns'
let loader = require('./loader')
import './app.css';



const controller  = ( () => {
  let list = []

  let starter = createProject('General');
  list.push(starter)
  
  starter.addTask(createTask('Bob', 'Bob things','tomorrow','High'));
  
  // Set up default Project to store tasks
  let selected = starter

  // Initial render
  const render = () => {
    renderProjectList(list)
    renderTaskList(selected)
  }

  const addTask = () => {
    let taskTitle = document.getElementById('task-title');
    let title = taskTitle.value;
    let taskDescription = document.getElementById('task-description');
    let description = taskDescription.value;
  
    // Get values from each form element. 
    let taskDate = document.getElementById('due-date');
    let dueDate = taskDate.value;
    let taskPrioriy = document.getElementById('task-priority');
    let priority = taskPrioriy.value;
  
    // Perform form validation
    let output;
    // console.log(description.value)
    if (title === ''){
      alert('Title is required.')
      return;
    } else if (description === ''){
      alert('Description is required.')
      return;
    } else if (dueDate === ''){
      alert('Due Date is required')
      return;
    } else {
      output = createTask(title, description, dueDate, priority)
    }
  
    selected.taskList.push(output);
    renderTaskList(selected)
  }

  const updateSelected = (e) => {
    // Handles clicks and redirects selected object to the render task list function. 
    selected = list[e.target.dataset.pid]
    renderTaskList(selected);
    // Clear task details. 
    let details = document.querySelector('.detail')
    clearChildren(details)
  }

  const updateActive = (e) => {
    let choice = e.target.dataset.tid;
    let active = selected.taskList[choice];
    // TODO call update to active task display once it is created
    renderTaskDetail(active)
  }

  const addProject = () => {
    // Add Project to the project list
    let input = document.getElementById('new-project-name');
    let value = input.value;
    input.value = "";
    let newProject = createProject(value);
    list.push(newProject);
    renderProjectList(list)

  }

  return {
    addTask,
    addProject,
    updateActive,
    updateSelected,
    render

  }

})();

loader()
controller.render()

/* Button listeners */
let projButton = document.getElementById('add-project');
projButton.addEventListener('click', controller.addProject);

// Tasks adding listener
let taskButton = document.getElementById('add-task');
taskButton.addEventListener('click', controller.addTask);


/* Project List functions   */

function renderProjectList(catList) {
  // Renders project list. 
  let list = document.querySelector('.project-list');
  clearChildren(list)  
  let count = 0
  for (let project of catList){
    // Renders each project listing as a list item. 
    projectListing(project, list, count);
    count++
  }
  let projItems = document.querySelectorAll('.project')
  projItems.forEach(item => item.addEventListener('click', controller.updateSelected))
}

function projectListing(project, list, count){
  // Component for rendering project elements. 
  let item = document.createElement('li');
  item.textContent = project.name;
  item.dataset.pid = count;
  item.classList.add('project')
  list.appendChild(item);
}




/* Task List functions   */

function renderTaskList(selected){
  // Get the item from the array that aligns with the pid selected. 
  console.log(selected);
  let subheading = document.getElementById('subheading');
  subheading.textContent = selected.name;
  let list = document.querySelector('.task-list');
  clearChildren(list);
  let count = 0;
  for (let task of selected.taskList){
    taskListing(task, list, count)
    count++
  }
  let taskItems = document.querySelectorAll('.task')
  taskItems.forEach(item => item.addEventListener('click', controller.updateActive))
}



function taskListing(task, list, count){

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
  let item1 = document.createElement('td')
  item1.textContent = task.title;
  item1.dataset.tid = count;
  item1.classList.add('task')
  row.appendChild(item1);
  let item2 = document.createElement('td');
  item2.textContent = task.dueDate;
  row.appendChild(item2)

  // Append to DOM
  table.appendChild(row);
}

/* Detail task function */
function renderTaskDetail(active) {
  let details = document.querySelector('.detail');
  clearChildren(details);
  let heading = document.createElement('h3')
  heading.textContent = 'Task Detail';
  details.appendChild(heading)
  let title = document.createElement('h5');
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



}

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
