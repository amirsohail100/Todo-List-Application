const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

const saved = localStorage.getItem("todos");
const todos = saved? JSON.parse(saved) :[];

function saveTodos(){
    localStorage.setItem("todos",JSON.stringify(todos));
}

function createTodoNode(todo,index){
    const li = document.createElement("li");
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change",()=>{
        todo.completed = checkbox.checked;
        textSpan.style.textDecoration = todo.completed? "line-through":"";
        saveTodos(); 
    })

    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = "0 8px";
    if(todo.completed){
        textSpan.style.textDecoration = "line-through";
    }
    textSpan.addEventListener("dblclick",()=>{
        const newText = prompt("Edit Todo",todo.text);
        if(newText !== null){
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    })
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click",()=>{
            todos.splice(index,1);
        render();
        saveTodos();
    })
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    return li;
}   

function render(){
    list.innerHTML = '';
    todos.forEach((todo,index) => {
        const node = createTodoNode(todo,index);
        list.appendChild(node);
    });
}

function addTodo(){
    const text = input.value.trim();
    if(!text){
        return;
    }
    // todos.pust({text:text,completed: false});
    todos.push({ text: text, completed: false });
    input.value = '';
    render();
    saveTodos();
}

addBtn.addEventListener("click",addTodo);
input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        addTodo();
    }
})
render();