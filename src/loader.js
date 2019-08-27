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

  projects.appendChild(list);
  projects.appendChild(newButton('+', 'add-project'))


  return projects;
}

function main(){
  let main = newDiv('main')
  let header = document.createElement('h2');
  header.innerText = "Main";
  main.appendChild(header);
  main.appendChild(newButton('+', 'add-task'))

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

module.exports = loader

