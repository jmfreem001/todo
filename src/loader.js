import { newDiv, newButton, newInput, newLabel, newBreak } from './utils'

/*DOM Manipulation module. */

function loader() {
  let container = document.createElement('div');
  container.classList = 'container';
  document.body.appendChild(container);

  // Add div components to initial load
  container.appendChild(header());
  container.appendChild(projects());
  // container.appendChild(main());
  container.appendChild(taskAdder())
  container.appendChild(taskDetail());
}

/* MAJOR DIV COMPONENTS*/

function header() {
  let header = newDiv('header');
  let title = document.createElement('h1')
  title.textContent = "To-Dooly"
  header.appendChild(title);

  return header;
}

function projects() {
  let projects = newDiv('projects');
  let header = document.createElement('h3');
  header.innerText = "Categories";
  projects.appendChild(header);
  let list = document.createElement('ul');
  list.classList.add('project-list')
  projects.appendChild(list);
  let input =  newInput('project', 'new-project-name');
  projects.appendChild(tasks());
  projects.appendChild(input);
  projects.appendChild(newButton('New Category', 'add-project'))

  return projects;
}

function tasks(){
  let main = newDiv('main')
  
  // Add main header.
  let taskHeader = document.createElement('h4')

  // let header = document.createElement('h4');
  taskHeader.innerText = "Selected Category: ";
  // taskHeader.appendChild(header);

  // Add subheading of Project Name
  let subheading = document.createElement('span');
  subheading.innerText = "Testing";
  subheading.id = 'subheading';
  taskHeader.appendChild(subheading);
  let tasks = newDiv('tasks')

  // create table;
  let table = document.createElement('table');
  table.classList.add('task-list') 
  tasks.appendChild(table)

  // Add components to div.
  main.appendChild(taskHeader);
  // main.appendChild(subheading);
  main.appendChild(tasks);
  // main.appendChild(taskAdder())

  return main;
}


function taskAdder(){
  let adder = newDiv('adder');
  
  // Add a subheader.
  let taskSubheading = document.createElement('h2');
  taskSubheading.textContent = 'Add New Task';
  
  let taskTag = document.createElement('p');
  let emphasizedTag = document.createElement('em')
  emphasizedTag.textContent = 'What do you need to do?';
  taskTag.appendChild(emphasizedTag)
  
  adder.appendChild(taskSubheading);
  adder.appendChild(taskTag)
  newBreak(adder)

  // add text box for title
  let title = newInput('title', 'task-title')
  newLabel('Title', 'task-title', adder)
  adder.appendChild(title)

  // add text for description
  newBreak(adder)
  let description = document.createElement('textarea')
  description.name = description;
  description.id = 'task-description'

  newLabel('Description', 'task-description', adder)
  adder.appendChild(description)

  // add date input
  newBreak(adder)
  let dueDate = newInput('due', 'due-date');
  dueDate.type = 'date';
  newLabel('Due Date', 'due-date', adder)
  adder.appendChild(dueDate)

  //select box for priority
  newBreak(adder)
  newLabel('Priority', 'task-priority', adder)
  let priority = document.createElement('select');
  priority.id = 'task-priority';
  
  // Create options for drop down. 
  let low = document.createElement('option');
  low.value = 'Low'
  low.textContent = "Low"
  let medium = document.createElement('option');
  medium.value = 'Medium';
  medium.textContent = 'Medium';
  medium.selected = true;
  let high = document.createElement('option');
  high.value = 'High';
  high.textContent = 'High';

  priority.appendChild(low)
  priority.appendChild(medium)
  priority.appendChild(high)

  adder.appendChild(priority)
  newBreak(adder)
  adder.appendChild(newButton('Submit', 'add-task'))

  return adder;
}

function taskDetail() {
  let detail = newDiv('detail')

  return detail;
}


export default loader

