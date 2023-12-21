const addTodoForm = document.querySelector("[data-add-todo-form]");
const addTodoInput = document.querySelector("[data-add-todo-input]");
const addTodoBtn = document.querySelector("[data-add-todo-btn]");
const addTodoP = document.querySelector("[data-add-todo-p]");
const remainingTodo = document.querySelector("[data-remaining-todo]");
const completedTodo = document.querySelector("[data-completed-todo]");
const totalTodo = document.querySelector("[data-total-todo]");
const todoListUl = document.querySelector("[data-todo-list-ul]");
const todoArray = [
    // {
    //     id: 0,
    //     task: 'Chris',
    //     completed: false,
    // },
    // {
    //     id: 1,
    //     task: 'James',
    //     completed: true,
    // },
];

// Validate Task input
function validateTodoInput(input)
{
    if (input.value.trim().length === 0) return ([ false, null ]);
    return ([ true, input.value.trim() ]);
}

function validateTodo()
{
    const inputIsValid = validateTodoInput(addTodoInput);
    if (inputIsValid[0])
    {
        addTodoP.classList.remove("d-block");
        addTodoP.classList.add("d-none");
        addTodo(todoArray, inputIsValid[1]);
        addTodoInput.value = "";
    }
    else
    {
        addTodoP.classList.remove("d-none");
        addTodoP.classList.add("d-block");
    }
}

const clearTodos = ul => {
    while (ul.firstChild) ul.removeChild(ul.firstChild);
}

function renderTodos(array)
{
    clearTodos(todoListUl);
    let remainingCount = 0, completedCount = 0;

    array.forEach(element => {
        const todo = document.createElement("li");
        const todoCheckbox = document.createElement("input");
        const todoP = document.createElement("p");
        const todoBtn = document.createElement("button");

        todoCheckbox.type = "checkbox";
        todoCheckbox.checked = element.completed;
        todoCheckbox.classList.add("todo-checkbox");
        todoP.innerHTML = element.task;
        todoP.classList.add("todo-p");
        todoP.style.textDecoration = element.completed ? "line-through" : "none";
        todoBtn.innerHTML = `<ion-icon name="close-outline" size="large"></ion-icon>`;
        todoBtn.classList = "btn pt-0 todo-btn";
        todo.classList = "bg-white p-3 pt-4 pb-2 mb-3 d-flex justify-content-between";

        if (element.completed) completedCount++;
        else remainingCount++;

        todo.appendChild(todoCheckbox);
        todo.appendChild(todoP);
        todo.appendChild(todoBtn);
        todoListUl.appendChild(todo);
    });

    remainingTodo.innerHTML = remainingCount;
    completedTodo.innerHTML = completedCount;
    totalTodo.innerHTML = array.length;
}

function addTodo(array, task)
{
    array.push({
        id: array.length,
        task: task,
        completed: false,
    });
    renderTodos(array);
}

function deleteTodo(array, element)
{
    const task = element.innerHTML.split('input type="checkbox" class="todo-checkbox">')[1].split('>')[1].split("[a-zA-Z0-9]")[0].split("<")[0];
    const index = array.findIndex(obj => obj.task === task);
    array.splice(index, 1);
    renderTodos(array);
}

function completeTodo(array, element)
{
    const task = element.innerHTML.split('input type="checkbox" class="todo-checkbox">')[1].split('>')[1].split("[a-zA-Z0-9]")[0].split("<")[0];
    const index = array.findIndex(obj => obj.task === task);

    if (array[index].completed) array[index].completed = false
    else array[index].completed = true;
    renderTodos(array);
}

addTodoBtn.addEventListener("click", ()=> validateTodo());
addTodoForm.addEventListener("submit", (e)=>
{
    e.preventDefault();
    validateTodo();
});

todoListUl.addEventListener("click", (e)=>
{
    if (e.target.className === "btn pt-0 todo-btn") deleteTodo(todoArray, e.target.parentElement)
    else if (e.target.parentElement.className === "btn pt-0 todo-btn") deleteTodo(todoArray, e.target.parentElement.parentElement)
    else if (e.target.className === "todo-checkbox") completeTodo(todoArray, e.target.parentElement);
});

document.addEventListener("load", renderTodos(todoArray));
