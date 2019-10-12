import store from './store'


describe('Store function', ()=> {

    it('has an initial project', () => {
        const list = store.getList()
        expect(list.length).not.toBe(0)
    })

    // it('stores initial todos', () => {
    //     const projectList = store.getList()
    //     const taskList = projectList[0]['tasks']
    //     expect(taskList.length).not.toBe(0)
    // })

    it('saves todos', ()=> {
        const projectList = store.getList()
        const taskList = projectList[0]['tasks']
        let listLength = taskList.length
        expect(store.addTask('General', 'Buy trebuchet').length)
            .toBe(listLength + 1)
    })

    it('deletes todos', () => {
        const projectList = store.getList()
        const taskList = projectList[0]['tasks']
        let listLength = taskList.length
        const newLength = store.removeTask('General', 'Buy trebuchet').length
        expect(newLength).toBe(listLength - 1)
    })

    it('saves projects', () => {
        const projectList = store.getList()
        let listLength = projectList.length
        let newProject =  {name:'Grocery List'}
        store.addProject(newProject)
        expect(store.getList().length).toBe(listLength + 1)
    })

    it('removes projects',() => {
        const projectList = store.getList()
        let listLength = projectList.length
        store.removeProject('Grocery List')
        expect(store.getList().length).toBe(listLength - 1)
    })
    it('holds the currently selected project', () => {
        expect(store.activeProject).not.toBeUndefined()
    })
    it('updates currently selected project', () => {
        store.addProject({name:'Grocery List'})
        store.addProject({name:'Hobby List'})
        expect(store.updateActiveProject(2).name).toBe('Hobby List')    
    })
})