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

/* TEMPORARY LOCATION OF ELEMENT GENERATORS   */

// function newTask() {
//   let 
// }


// new task