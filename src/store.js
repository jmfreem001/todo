import Project from './projects'
const store = ( () => {
    let list =  [Project('General')]
    let activeProject = list[0]

    const updateActiveProject = (num) => {
        activeProject = list[num]
        return activeProject
    }

    //getter for private variable.
    const getList = () => list

    const addProject = (item) => {
        list = list.concat(item)
        return list
    }

    const removeProject = (string) => {
         list = list.filter(proj => proj.name !== string)
         return list
    }

    const addTask = (projectName, newTaskString) => {
        const project = list.find(item => item.name === projectName)
        project.tasks = project.tasks.concat({name: newTaskString})
        return project.tasks
    }
 
    const removeTask = (projectName, taskName) => {
        const project = list.find(item => item.name === projectName)
        project.tasks = project.tasks.filter(
            (task => task.name !== taskName))
        return project.tasks
    }
    return {
        getList,
        addProject,
        removeProject,
        addTask, 
        removeTask,
        activeProject,
        updateActiveProject
    }
})()

export default store
