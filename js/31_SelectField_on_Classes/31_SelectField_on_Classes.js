console.log('Module connected');

let customSelectFieldArea = document.querySelector('#customSelectFieldArea');
customSelectFieldArea.style.backgroundColor  = 'lightgreen'


/////////////////////////////////////////////////////////
const ListItem = function(parent, itemObj=''){
  let item = document.createElement('div');
  
  item.append(itemObj.label);
  item.setAttribute('id', itemObj.id);
  item.setAttribute('style', `
    cursor: default;
    padding: 3px;
    display: inline-block;
  `)
  document.querySelector('body').append(item);
  this.width = item.offsetWidth+25;
  item.setAttribute('style', `
    cursor: default;
    padding: 3px;
  `)
  parent.append(item)

  item.addEventListener('mouseover', ()=>{
    item.setAttribute('style', `
      cursor: default;
      padding: 3px;
      background-color: dodgerblue;
      color: white;
    `)
  });

  item.addEventListener('mouseout', ()=>{
    item.setAttribute('style', `
      cursor: default;
      padding: 3px;
      background-color: white;
      color: black;
    `)
  });

  item.addEventListener('mousedown', (e)=>{
    if (e.button === 0) {
      item.parentNode.parentNode.querySelector('input').value = itemObj.label;
    }
  });

  this.getWidth = ()=>this.width;
}


/////////////////////////////////////////////////////////
const DropdownList = function(parent, list=[]){
  let drop = document.createElement('div')
  drop.setAttribute('hidden', true);

  this.toggleVisible = ()=>{
    if (drop.hidden) {
      drop.removeAttribute('hidden');
    } else {
      drop.setAttribute('hidden', true)
    }
  }

  this.hide = ()=>{drop.setAttribute('hidden', true)}
  this.unHide = ()=>{drop.removeAttribute('hidden');}

  let maxWidth = 0;
  list.forEach(item=>{
    let menuItem = new ListItem(drop, item);
    if (maxWidth<menuItem.width) {
      maxWidth = menuItem.width
    };
  })

  drop.setAttribute('style', 
    `position: absolute;
    border: 1px solid black;
    min-height: 50px;
    width: ${maxWidth}px;
    box-shadow: 3px 3px 5px rgba(0,0,0,0.2);`
  );

  this.width = maxWidth
  parent.append(drop)
}


/////////////////////////////////////////////////////////
const Arrow = function (parent) {
  let arrow = document.createElement('i');
  arrow.setAttribute('style', 
    `border: solid black; 
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
    position: absolute;
    top: 50%;
    right: 3px;
    transform: translate(-50%, -50%)  rotate(45deg);
    z-index: 5`
  );

  this.addListener = (eventName, func)=>{arrow.addEventListener(eventName, func)};

  parent.append(arrow)
}



/////////////////////////////////////////////////////////
const Dropdown = function (parent, {items=[]}){

  const body = document.querySelector('body');
  parent = parent ? parent: body

  let inp = document.createElement('div');
  inp.setAttribute('style',
    `display: inline-block; 
    position: relative;
  `);

  let inputField = document.createElement('input');
  this.inputField = inputField;
  inputField.setAttribute('readonly', "readonly");

  this.inpFieldToggleFocus = ()=>{
    if (inputField == document.activeElement) {
      inputField.blur();
    } else {
      inputField.focus();
    }
  }

  let arrow = new Arrow(inp);
  
  inp.append(inputField)

  parent.append(inp);
  let dropdownList = new DropdownList(inp, items);

  inputField.value = items[0].label;
  inputField.setAttribute('style', `
    position: relative; 
    cursor: default;
    width: ${dropdownList.width-6}px;
  `);

  arrow.addListener('click',(e)=>{
    this.inpFieldToggleFocus()
  })
  inp.addEventListener('click' ,()=>{dropdownList.toggleVisible()});
  inp.addEventListener('focusout' ,()=>{dropdownList.hide()});

}






let dropDown = new Dropdown(customSelectFieldArea,{
  items: [
    {label: 'Kyiv', id:'ky'},
    {label: 'Kharkiv Kharkiv', id:'kh'},
    {label: 'Lviv', id:'lv'},
    {label: 'Lugansk', id:'lu'},
  ]
})

// customSelectFieldArea.append(dropDown);