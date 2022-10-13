const createSpan = function(text = null) {
    const span = document.createElement("span");
    if(text) {
        span.textContent = text;
    }

    return span;
};

const createListItem = function(strs) {
    const li = document.createElement("li");
    strs.forEach(str => {
        li.appendChild(str);
    });

    return li;
};

const createListItemEl = function(el) {
    const li = document.createElement("li");
    li.appendChild(el);
    
    return li;
};

const createBtn = function(id, btnClassName, iconClassName = "") {
    const btn = document.createElement("button");
    btn.id = id;
    btn.setAttribute("class", btnClassName);
    if(iconClassName) addIcon(btn, iconClassName);

    return btn;
};

const createBtnGroup = function(id, btns) {
    const btnGroup = document.createElement("div");
    btnGroup.id = id;

    for(const btn of btns) {
	   btnGroup.appendChild(btn);
	}

    return btnGroup;
};

const createIcon = function(iconClasses) {
   const icon = document.createElement("i");
	
   const classes = iconClasses.split(" ");
   classes.forEach(item => {
	  icon.classList.add(item);
   });
	
   return icon;
};

const addIcon = function(context, name, className = false) {
   const icon = createIcon(`fa-solid fa-${name}`);
   context.appendChild(icon);
   if(className) context.classList.add(`${name}`);
};

const removeChildren = function(context) {
    while(context.firstChild) {
	    context.removeChild(context.lastChild);
	}
};

export { addIcon, createSpan, createListItem, createListItemEl, createBtn, createBtnGroup, removeChildren }; 
