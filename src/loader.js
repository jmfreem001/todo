function loader() {
  let container = document.createElement('div');
  container.classList = 'container';
  document.body.appendChild(container);

  // Add div components to initial load
  container.appendChild(header());
  container.appendChild(projects());
  container.appendChild(main());
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
  let input =  newTextInput('project', 'new-project-name');
  projects.appendChild(input);


  projects.appendChild(newButton('New Project', 'add-project'))


  return projects;
}

function main(){
  let main = newDiv('main')
  let header = document.createElement('h3');
  header.innerText = "Tasks";
  let subheading = document.createElement('h4');
  subheading.innerText = "Testing";
  subheading.id = 'subheading';
  let tasks = newDiv('tasks')
  let list = document.createElement('ul');
  list.classList.add('task-list')
  tasks.appendChild(list)
  main.appendChild(header);
  main.appendChild(subheading);
  main.appendChild(tasks);
  main.appendChild(newButton('New Task', 'add-task'))

  return main;
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

function newTextInput(name, id){
  let item = document.createElement('input');
  item.name = name;
  item.id = id;
  return item;
}

module.exports = loader

