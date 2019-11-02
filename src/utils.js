/* HELPER FUNCTIONS */

export function newDiv(value) {
    // helper function for quickly creating new div elements. 
    let div = document.createElement('div');
    div.classList = value;
  
    return div;
  }
  
  export function newButton(text, id){
    let button = document.createElement('button')
    button.textContent = text;
    button.id = id;
  
    return button;
  }
  
  export function newInput(name, id){
    let item = document.createElement('input');
    item.name = name;
    item.id = id;
  
    return item;
  }
  
  export function newLabel(text, id, div){
    //adds a new label for named element and add its it to a div.
    let label = document.createElement('label');
    label.for = id;
    label.textContent = text;
    div.appendChild(label)
  }
  
  export function newBreak(div){
    let elem = document.createElement('br');
    div.appendChild(elem);
  }

  export function newDynamicInput(text, id, type, value, changeHandler, disabled=false){
    let div = newDiv('dynamic-input')
    let item = document.createElement('input');
    item.name = text;
    item.id = id;
    item.type = type;
    item.value = value
    item.oninput = changeHandler
    item.disabled = disabled
    div.appendChild(item)

    return div

  }

  /* UTILITY FUNCTIONS */
export function clearChildren(el){
  while(el.children.length >0){
    el.removeChild(el.children[0]);
  }
}