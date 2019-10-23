import Project from './projects'

const store = ( () => {
    let list =  [Project('General')]
    let activeProject = list[0]
    let activeTask = null

    const updateActiveProject = num => {
        activeProject = list[num]
        console.log('In store')
        console.log(activeProject)
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
    return {
        getList,
        addProject,
        removeProject,
        addTask, 
        removeTask,
        getActiveProject,
        getActiveTask,
        updateActiveProject,
        updateActiveTask
    }
})()

export default store
