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
        expect(store.addTask({title:'Buy trebuchet'}).length)
            .toBe(listLength + 1)
    })

    it('stores currently selected todo', () => {

        store.addTask({title:'Bob', complete: false})
        store.addTask({title:'Lion', complete: false})
        expect(store.updateActiveTask(1).title).toBe('Bob')

    })

    it('updates currently selected todo', () => {
        let listLength = store.getActiveProject().tasks.length
        store.replaceTask({title: 'Bob', complete: true})
        expect(store.updateActiveTask(1).complete).toBe(true)
        //listLength should not change
        expect(store.getActiveProject().tasks.length).toBe(listLength)
    })

    it('deletes todos', () => {
        const projectList = store.getList()
        const taskList = projectList[0]['tasks']
        let listLength = taskList.length
        const newLength = store.removeTask('Buy trebuchet').length
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
        expect(store.getActiveProject()).not.toBeUndefined()
    })
    it('updates currently selected project', () => {
        store.addProject({name:'Grocery List'})
        store.addProject({name:'Hobby List'})
        expect(store.updateActiveProject(2).name).toBe('Hobby List')    
    })
})