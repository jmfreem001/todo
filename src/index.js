let createTask = require('./tasks.js');
let createProject = require('./projects')
// import {format} from 'date-fns'
let loader = require('./loader')
import './app.css';

let projectList = []

let defaultProject = createProject('General');
projectList.push(defaultProject)
console.log(projectList);

defaultProject.addTask(createTask('Bob', 'Bob things','tomorrow','High'));
console.log(defaultProject.taskList);

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
  projectList.push(newProject);
  renderProjectList()
}

/* TEMPORARY LOCATION OF ELEMENT GENERATORS   */

// function newTask() {
//   let 
// }


// new task

function render(){
  renderProjectList()
}
/* Project List functions   */

function renderProjectList() {
  let list = document.querySelector('.project-list');
  clearChildren(list)
  let count = 0
  for (let project of projectList){
    // Renders each project listing as a list item. 
    projectListing(project, list, count);
    count++
  }
}

function projectListing(project, list, count){
  let item = document.createElement('li');
  item.textContent = project.name;
  item.dataset.pid = count;
  item.classList.add('project')
  list.appendChild(item);
}
/* Task List functions   */

let projItems = document.querySelectorAll('.project')
projItems.forEach(item => item.addEventListener('click',renderTaskList))

function renderTaskList(e){
  // console.log(e.target.dataset.pid)
  // Get the item form the array that aligns with the pid selected. 
  let selected = projectList[e.target.dataset.pid]
  let subheading = document.getElementById('subheading');
  subheading.textContent = selected.name;
  let list = document.querySelector('.task-list');
  clearChildren(list);
  let count = 0;
  for (let task of selected.taskList){
    //
    taskListing(description, list, count)
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