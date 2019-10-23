import broker from './broker'
import createProject from './projects'
import createTask from './tasks'


const render = ( () => {
  const renderProjectList = (categoryList) => {
      // Renders project list. 
      let list = document.querySelector('.project-list');
      clearChildren(list)  
      console.log(categoryList)
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


// /* Detail task function */
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

// Ensure Task Detail is shown when task selected. 
broker.subscribe('updateActiveTask', renderTaskDetail)

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