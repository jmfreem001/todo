let createTask = require('./tasks.js');
let createProject = require('./projects')
// import {format} from 'date-fns'
let loader = require('./loader')
import './app.css';

/* TODO: 


  1. Need to clean up render and loader. 
    a. for projects
    b. for tasks. 



*/
const Category  = ( () => {
  let list = []

  let starter = createProject('General');
  list.push(starter)
  console.log(list);
  
  starter.addTask(createTask('Bob', 'Bob things','tomorrow','High'));
  console.log(starter.taskList);
  
  // Set up default Project to store tasks
  let selected = starter

  return {
    list,
    selected
  }

})();



loader()
render()


let projButton = document.getElementById('add-project');
projButton.addEventListener('click', addProject);



function addProject() {
  // Add Project to the project list
  let input = document.getElementById('new-project-name');

  let value = input.value;
  input.value = "";
  let newProject = createProject(value);
  Category.list.push(newProject);
  renderProjectList()
}

/* TEMPORARY LOCATION OF ELEMENT GENERATORS   */






function render(){
  renderProjectList()
  renderTaskList()
}
/* Project List functions   */

function renderProjectList() {
  // Renders project list. 
  let list = document.querySelector('.project-list');
  clearChildren(list)
  let count = 0
  for (let project of Category.list){
    // Renders each project listing as a list item. 
    projectListing(project, list, count);
    count++
  }
  let projItems = document.querySelectorAll('.project')
  projItems.forEach(item => item.addEventListener('click',updateSelected))
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

// Tasks adding listener
let taskButton = document.getElementById('add-task');
taskButton.addEventListener('click', addTask);

function addTask() {
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

  console.log(output)

  // TODO: Add output to currently selected projects task list and then render tasks

  Category.selected.taskList.push(output);
  renderTaskList()
}


function updateSelected(e){
  // Handles clicks and redirects selected object to the render task list function. 
  let selected = Category.list[e.target.dataset.pid]
  Category.selected = selected;
  renderTaskList();
}

function renderTaskList(selected=Category.selected){
  // Get the item from the array that aligns with the pid selected. 
  console.log(selected);
  let subheading = document.getElementById('subheading');
  subheading.textContent = selected.name;
  let list = document.querySelector('.task-list');
  clearChildren(list);
  let count = 0;
  for (let task of selected.taskList){
    //
    // taskListing(description, list, count)
    count++
  }
}

function taskListing(task, list, count){
  //TODO

  // Need info for : title, description, dueDate, priority
}



/* UTILITY FUNCTIONS */
function clearChildren(el){
  while(el.children.length >0){
    el.removeChild(el.children[0]);
  }
}