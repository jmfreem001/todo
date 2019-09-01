function loader() {





  let container = document.createElement('div');
  container.classList = 'container';
  document.body.appendChild(container);

  // Add div components to initial load
  container.appendChild(header());
  container.appendChild(projects());
  container.appendChild(main());
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
  header.innerText = "Project List";
  projects.appendChild(header);
  let list = document.createElement('ul');
  list.classList.add('project-list')
  projects.appendChild(list);
  let input =  newInput('project', 'new-project-name');
  projects.appendChild(input);


  projects.appendChild(newButton('New Project', 'add-project'))


  return projects;
}

function main(){
  let main = newDiv('main')
  // Add main header.
  let header = document.createElement('h3');
  header.innerText = "Tasks";
  // Add subheading of Project Name
  let subheading = document.createElement('h4');
  subheading.innerText = "Testing";
  subheading.id = 'subheading';
  let tasks = newDiv('tasks')

  // create table;
  let table = document.createElement('table');
  table.classList.add('task-list') 

   tasks.appendChild(table)

  // Add components to div.
  main.appendChild(header);
  main.appendChild(subheading);
  main.appendChild(tasks);
  main.appendChild(taskAdder())



  return main;
}


function taskAdder(){
  let adder = newDiv('adder');
  // Add a subheader.
  let taskSubheading = document.createElement('h3');
  taskSubheading.textContent = 'What do you need to do?';
  adder.appendChild(taskSubheading);
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
  adder.appendChild(newButton('New Task', 'add-task'))
  return adder;
}

function taskDetail() {
//TODO Add an initially hidden div that shows up when a task is clicked that shows:
  let detail = newDiv('detail')


  return detail;
}

/* HELPER FUNCTIONS */
function newDiv(value) {
  // helper function for quickly creating new div elements. 
  let div = document.createElement('div');
  div.classList = value;

  return div;
}

function newButton(text, id){
  let button = document.createElement('button')
  button.textContent = text;
  button.id = id;
  return button;
}

function newInput(name, id){
  let item = document.createElement('input');
  item.name = name;
  item.id = id;
  return item;
}

function newLabel(text, id, div){
  //adds a new label for named element and add its it to a div.
  let label = document.createElement('label');
  label.for = id;
  label.textContent = text;
  div.appendChild(label)
}

function newBreak(div){
  let elem = document.createElement('br');
  div.appendChild(elem);
}

module.exports = loader

