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
function createTodo(isValid)
{
    if (isValid[0])
    {
        const todoObject = {
            id: todoArray.length,
            task: isValid[1],
            completed: false,
            line: this.completed ? 'line-through' : 'none',
        }
        totalTask.innerHTML++;
        remainingTask.innerHTML++;
        todoArray.push(todoObject);
        return (todoObject);
    }
    return (null); // display an error is !isValid
}

// Display Task on webpage
function displayTodo(task, ul)
{
    const todo = document.createElement("li");
    const todoCheckbox = document.createElement("input");
    const todoP = document.createElement("p");
    const todoBtn = document.createElement("button");
    const index = todoArray.findIndex((obj => obj.task === task));

    todoCheckbox.type = "checkbox";
    todoCheckbox.checked = todoArray[index].completed;
    todoCheckbox.classList = "todo-checkbox";
    todoP.innerHTML = todoArray[index].task;
    todoP.classList = 'todo-p';
    todoP.style.textDecoration = todoArray[index].line;
    todoBtn.innerHTML = `<ion-icon name="close-outline" size="large"></ion-icon>`;
    todoBtn.classList = "btn pt-0 todo-btn";
    todo.classList = "bg-white p-3 pt-4 pb-2 mb-3 d-flex justify-content-between";

    todo.appendChild(todoCheckbox);
    todo.appendChild(todoP);
    todo.appendChild(todoBtn);
    ul.appendChild(todo);
}

// Complete Task in List
function completeTodo(li)
{
    let task = '';
    const array = li.innerHTML.split('<p class="todo-p" style="text-decoration: none;">');
    console.log(array[1]);
    for (let i = 0 ; i < array[1].length ; i++)
    {
        if (array[1][i] !== '<') task += array[0][i];
        else break;
    }
    console.log(task);
    const index = todoArray.findIndex((obj => obj.task === task));
    console.log(index);
    todoArray[index].completed = true;
    todoArray[index].line = 'line-through';
}

// Delete Task from List
function deleteTodo()
{
}

addTaskBtn.addEventListener("click", ()=>
{
    const inputIsValid = validateTaskInput(addTaskInput);
    const todoObject = createTodo(inputIsValid);
    displayTodo(todoObject.task, todoListUl);
    addTaskInput.value = "";
    console.log(todoArray);
});

todoListUl.addEventListener("click", (e)=>
{
    if (e.target.classList[e.target.classList.length - 1] === 'todo-checkbox')
    {
        completeTodo(e.target.parentElement);
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
