import Project from './projects'

const store = ( () => {
    let list = JSON.parse(window.localStorage.getItem('general')) || [Project('General')]
    let activeProject = list[0]
    let activeTask = null

    const updateActiveProject = num => {
        activeProject = list[num]
        return activeProject
    }

    const updateActiveTask = num => {
        activeTask = activeProject.tasks[num]
        return activeTask
    }

    //getter for private variables.
    const getList = () => list
    const getActiveProject = () => activeProject
    const getActiveTask = () => activeTask

    const addProject = (item) => {
        list = list.concat(item)
        return list
    }

    const removeProject = (string) => {
         list = list.filter(proj => proj.name !== string)
         return list
    }

    const addTask = (task) => {
        activeProject.tasks = activeProject.tasks.concat(task)
        return activeProject.tasks
    }
 
    const removeTask = (taskTitle) => {
        
        activeProject.tasks = activeProject.tasks.filter(
            (task => task.title !== taskTitle))
        return activeProject.tasks
    }

    const replaceTask = (newTask) => {
        let locIndex= activeProject.tasks.indexOf(activeTask)
          
        activeProject.tasks = activeProject.tasks
            .map( (item, index) => 
                (index === locIndex)? newTask: item)
       
        return activeProject.tasks 
    }
    

    return {
        getList,
        addProject,
        removeProject,
        addTask, 
        removeTask,
        replaceTask,
        getActiveProject,
        getActiveTask,
        updateActiveProject,
        updateActiveTask
    }
})()

export default store
