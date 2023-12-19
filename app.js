const addTaskInput = document.querySelector("[data-bs-todo-add-task-input]");
const addTaskBtn = document.querySelector("[data-bs-todo-add-task-btn]");
const remainingTask = document.querySelector("[data-bs-todo-remaining-task]");
const completedTask = document.querySelector("[data-bs-todo-completed-task]");
const totalTask = document.querySelector("[data-bs-todo-total-task]");
const todoListUl = document.querySelector("[data-bs-todo-list-ul]");
const todoArray = [];

// Validate Task input
function validateTaskInput(input)
{
    if (input.value.trim().length === 0) return ([ false, null ]);
    return ([ true, input.value.trim() ]);
}

// Create new Task
function createTodo(task)
{
    const todo = document.createElement("li");
    const todoCheckbox = document.createElement("input");
    const todoP = document.createElement("p");
    const todoBtn = document.createElement("button");
    const todoObject = {
        id: todoArray.length + 1,
        checked: false,
        task: task,
        line: 'none',
        completed: false,
    }
    
    todoCheckbox.type = "checkbox";
    todoCheckbox.checked = false;
    todoCheckbox.classList = "todo-checkbox";
    todoP.innerHTML = task;
    todoP.classList = 'todo-p';
    // todoP.style.textDecoration = 'line-through';
    todoBtn.innerHTML = `<ion-icon name="close-outline" size="large"></ion-icon>`;
    todoBtn.classList = "btn pt-0 todo-btn";
    todo.classList = "bg-white p-3 pt-4 pb-2 mb-3 d-flex justify-content-between";
    
    todo.appendChild(todoCheckbox);
    todo.appendChild(todoP);
    todo.appendChild(todoBtn);
    todoArray.push(todoObject);
    return (todo);
}

// Add Task to List
function addTodo(isValid, ul)
{
    if (isValid[0])
    {
        const todo = createTodo(isValid[1]);
        ul.appendChild(todo);
        totalTask.innerHTML++;
        remainingTask.innerHTML++;
    }
}

// Complete Task in List
function completeTodo()
{}

// Delete Task from List
function deleteTodo()
{
}

addTaskBtn.addEventListener("click", ()=>
{
    const inputIsValid = validateTaskInput(addTaskInput);
    addTodo(inputIsValid, todoListUl);
    addTaskInput.value = "";
    console.log(todoArray);
});

todoListUl.addEventListener("click", (e)=>
{
    if (e.target.classList[e.target.classList.length - 1] === 'todo-checkbox')
    {
        completeTodo();
    }
    else if (e.target.classList[e.target.classList.length - 1] === 'todo-btn') 
    {
        deleteTodo();
    }
    else if (e.target.parentElement.classList[e.target.parentElement.classList.length - 1] === 'todo-btn')
    {
        deleteTodo();
    }
});
