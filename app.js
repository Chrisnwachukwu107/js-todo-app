const addTodoForm = document.querySelector("[data-add-todo-form]");
const addTodoInput = document.querySelector("[data-add-todo-input]");
const addTodoBtn = document.querySelector("[data-add-todo-btn]");
const addTodoP = document.querySelector("[data-add-todo-p]");
const remainingTodo = document.querySelector("[data-remaining-todo]");
const completedTodo = document.querySelector("[data-completed-todo]");
const totalTodo = document.querySelector("[data-total-todo]");
const completeTodoListBtn = document.querySelector("[data-complete-todo-list-btn]");
const deleteTodoListBtn = document.querySelector("[data-delete-todo-list-btn]");
const todoListUl = document.querySelector("[data-todo-list-ul]");

if (!(localStorage.getItem("todoArray"))) localStorage.setItem('todoArray', JSON.stringify([]));
const todoArray = JSON.parse(localStorage.getItem('todoArray'));
renderTodos(todoArray);

// Validate Task input
function validateTodoInput(input)
{
    if (input.value.trim().length === 0) return ([ false, null ]);
    return ([ true, input.value.trim() ]);
}

function validateTodo(array)
{
    const inputIsValid = validateTodoInput(addTodoInput);
    if (inputIsValid[0])
    {
        addTodoP.classList.remove("d-block");
        addTodoP.classList.add("d-none");
        const isTodoValid = addTodo(array, inputIsValid[1]);
        if (isTodoValid) addTodoInput.value = "";
    }
    else
    {
        addTodoP.firstChild.innerHTML = "Field cannot be empty!";
        addTodoP.classList.remove("d-none");
        addTodoP.classList.add("d-block");
    }
    renderTodos(array);
}

function clearTodos (ul)
{
    while (ul.firstChild) ul.removeChild(ul.firstChild);
}

function renderBtn(array)
{
    if (array.length === 0)
    {
        completeTodoListBtn.classList.remove("d-inline-block");
        deleteTodoListBtn.classList.remove("d-inline-block");
        completeTodoListBtn.classList.add("d-none");
        deleteTodoListBtn.classList.add("d-none");
        return;
    }

    completeTodoListBtn.classList.remove("d-none");
    deleteTodoListBtn.classList.remove("d-none");
    completeTodoListBtn.classList.add("d-inline-block");
    deleteTodoListBtn.classList.add("d-inline-block");

    if (array[0].completed && array.length === 1) completeTodoListBtn.innerHTML = "Uncheck All Tasks";
    else if (!(array[0].completed) && array.length === 1) completeTodoListBtn.innerHTML = "Check All Tasks";
}

function renderTodos(array)
{
    let remainingCount = 0, completedCount = 0;
    clearTodos(todoListUl);

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

    renderBtn(array);
    remainingTodo.firstChild.innerHTML = remainingCount;
    completedTodo.firstChild.innerHTML = completedCount;
    totalTodo.firstChild.innerHTML = array.length;
}

function addTodo(array, task)
{
    let flag = false;
    array.forEach(element =>
        {
            if (task.toLowerCase() === element.task.toLowerCase())
            {
                addTodoP.firstChild.innerHTML = "Task already exists!";
                addTodoP.classList.remove("d-none");
                addTodoP.classList.add("d-block");
                flag = true;
            }
        });

    if (flag) return (false);
    array.push({
        id: array.length,
        task: `${task[0].toUpperCase()}${task.slice(1)}`,
        completed: false,
    });

    localStorage.setItem('todoArray', JSON.stringify(array));
    renderTodos(array);
    return (true);
}

function deleteTodo(array, element)
{
    const task = element.innerHTML.split('input type="checkbox" class="todo-checkbox">')[1].split('>')[1].split("[a-zA-Z0-9]")[0].split("<")[0];
    const index = array.findIndex(obj => obj.task === task);
    array.splice(index, 1);
    localStorage.setItem('todoArray', JSON.stringify(array));
    renderTodos(array);
}

function deleteTodoList(array)
{
    array.splice(0, array.length);
    localStorage.setItem('todoArray', JSON.stringify(array));
    renderTodos(array);
}

function completeTodo(array, element)
{
    const task = element.innerHTML.split('input type="checkbox" class="todo-checkbox">')[1].split('>')[1].split("[a-zA-Z0-9]")[0].split("<")[0];
    const index = array.findIndex(obj => obj.task === task);

    if (array[index].completed) array[index].completed = false
    else array[index].completed = true;

    if (array.every(element => element.completed === true)) completeTodoListBtn.innerHTML = "Uncheck All Tasks";
    else completeTodoListBtn.innerHTML = "Check All Tasks";

    localStorage.setItem('todoArray', JSON.stringify(array));
    renderTodos(array);
}

function completeTodoList(array, btn)
{
    if (array.every(element => element.completed === true))
    {
        array.map(element => element.completed = false);
        btn.innerHTML = "Check All Tasks";
    }
    else
    {
        array.map(element => element.completed = true);
        btn.innerHTML = "Uncheck All Tasks";
    }

    localStorage.setItem('todoArray', JSON.stringify(array));
    renderTodos(array);
}

addTodoBtn.addEventListener("click", ()=> validateTodo(todoArray));
addTodoForm.addEventListener("submit", (e)=>
{
    e.preventDefault();
    validateTodo(todoArray);
});

completeTodoListBtn.addEventListener("click", ()=> completeTodoList(todoArray, completeTodoListBtn));
deleteTodoListBtn.addEventListener("click", (e)=> deleteTodoList(todoArray));

todoListUl.addEventListener("click", (e)=>
{
    if (e.target.className === "btn pt-0 todo-btn") deleteTodo(todoArray, e.target.parentElement)
    else if (e.target.parentElement.className === "btn pt-0 todo-btn") deleteTodo(todoArray, e.target.parentElement.parentElement)
    else if (e.target.className === "todo-checkbox") completeTodo(todoArray, e.target.parentElement);
});
