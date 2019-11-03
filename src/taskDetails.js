import broker from './broker'
import { clearChildren,  newButton, newBreak, newDynamicInput} from './utils'

 
let taskDetails = (() => {
    let tempStore = {}
    let tid = null

    function updateDetailTaskId(value){
        tid = value
        return tid
    }
    broker.subscribe('activeTaskDomUpdate', updateDetailTaskId) 

    function handleChange(e){
        tempStore= {...tempStore, [e.target.name]: e.target.value }
    }

    function handleBlur(e){

    broker.publish('updateTask', tempStore)
    broker.publish('activeTaskDomUpdate', tid)
    }

    function renderTaskDetail(active) {
        // Renders and allows changes to task details 

        // update temp store with active task. 
        tempStore = {...tempStore, ...active}       
        
        let details = document.querySelector('.detail');
        details.addEventListener('blur', handleBlur, true)
        clearChildren(details);
        // Heading
        let heading = document.createElement('h2')
        heading.textContent = 'Task Detail';
        details.appendChild(heading)
        // Subheading
        let subheading = document.createElement('p');
        let emphasizedHeading = document.createElement('em')
        emphasizedHeading.textContent = 'Review and update your todo.';
        subheading.appendChild(emphasizedHeading)
        details.appendChild(subheading)
        // Task Title        
        let inputTitle = newDynamicInput('title', 'active-title', 'text', active.title, handleChange)
        inputTitle.onblur= "handleBlur()"
        details.appendChild(inputTitle)
        // Task Description
        let inputDesc = document.createElement('textarea')
        inputDesc.name = 'description'
        inputDesc.value = active.description
        inputDesc.oninput = handleChange
        inputDesc.id = 'active-description'
        inputDesc.onblur= "handleBlur()"
        details.appendChild(inputDesc)
        // Task Due Date
        let inputDueDate = newDynamicInput('dueDate', 'active-due-date', 'date', active.dueDate, handleChange)
        inputDueDate.onblur= "handleBlur()"
        details.appendChild(inputDueDate)

        newBreak(details)
        
        // Changes button
        let changesButton = newButton('Click after Change')
        details.appendChild(changesButton)

        newBreak(details)
        
        // Task Priority
        let priorityText = document.createElement('p')
        priorityText.textContent = `Adjust Priority (${active.priority}): `
        details.appendChild(priorityText)
        // Arrows paragraph
        let arrows = document.createElement('p');
        arrows.classList.add('arrows')
        // Increase priority arrow
        let upArrow = document.createElement('span');
        upArrow.id = 'up-arrow'
        upArrow.textContent = '↑'
        upArrow.onclick = priorityHandler
        arrows.appendChild(upArrow)
        details.appendChild(arrows)
        // Decrease priority arrow
        let downArrow = document.createElement('span');
        downArrow.id = 'down-arrow'
        downArrow.textContent = '↓'
        downArrow.onclick = priorityHandler
        arrows.appendChild(downArrow)
        details.appendChild(arrows)

        newBreak(details)

        // Toggle Completion button
        let completeButton = document.createElement('button')
        completeButton.textContent = (tempStore.complete)? 'Mark Incomplete': 'Mark Complete'
        completeButton.onclick = toggleComplete
        details.appendChild(completeButton)
    }


    function priorityHandler(e){
        let direction = '' 
        if (e.target.id === 'up-arrow') direction = 'up'
        else direction = 'down'
        changePriority(direction)
    }

    function changePriority(direction){
        let priorities = ['Low', 'Medium', 'High']

        let start = priorities.indexOf(tempStore.priority)
        let index = start;
        // Increment and decrement logic
        if (direction === 'up' && start < (priorities.length - 1)){  
            index++
        }else if (direction === 'down' && start > 0){
            index--
        } else {
            alert(`Priority can not be ${(direction==='up')? 'raised':'lowered'} any further.`)
            return
        } 
        tempStore.priority = priorities[index]
        // update through broker.
        broker.publish('updateTask', tempStore)
        broker.publish('activeTaskDomUpdate', tid)
    }

    function toggleComplete(e){
        // Toggles complete/Incomplete
        tempStore.complete = !tempStore.complete
        broker.publish('updateTask', tempStore)
        broker.publish('activeTaskDomUpdate', tid)
        
        }
        // Ensure Task Detail is shown when task selected. 
        broker.subscribe('updateActiveTask', renderTaskDetail)

    return { renderTaskDetail}
})();

export default taskDetails