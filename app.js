//Llamamos a los elementos
const input = document.querySelector(".input-text");
const addForm = document.querySelector(".add-form");
const taskList = document.querySelector(".tasks-list");
const deleteBtn = document.querySelector(".deleteAll-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 


//funcion para guardar la lista en el localStorage
const saveOnLocalStorage = (taskList) => {
    localStorage.setItem("tasks", JSON.stringify(taskList)); 
}

//Funcion para crear un elemento de tarea
const createTask = (task) => {
    return `<li>${task.name} <img class="delete-btn" src="./img/delete.svg" alt="boton de borrar" data-name=${task.name}></li>`;
}

//Funcion para renderizar la lista de tareas
const renderTasksList = (todoList) => {
    taskList.innerHTML = todoList.map((task) => createTask(task)).join("");
}

const hideDeletAll = (tasksList) => {
    if (!tasksList.length) {
        deleteBtn.classList.add("hidden");
        return;
    }
    deleteBtn.classList.remove("hidden");
}

const addTask = (e) => {
    e.preventDefault();
    const taskname = input.value.trim();
    if (!taskname.length) {
        alert("Ingrese una tarea");
        return;
    } else if (tasks.some((task) => task.name.toLowerCase() === taskname.toLowerCase())) {
        alert("Ya existe una tarea con ese nombre");
        return;
    }

    tasks = [...tasks, { name: taskname }];
    input.value = "";
    updateViews(tasks);
}

const removeTask = (e) => {
    if (!e.target.classList.contains("delete-btn")) {
        return;
    }
    const filterName = e.target.dataset.name;

    tasks = tasks.filter((task) => task.name !== filterName);
    updateViews(tasks);
}

const removeAll = () => {
    tasks = [];
    updateViews(tasks);
}

const updateViews = (tasks) => {
    renderTasksList(tasks);
    saveOnLocalStorage(tasks);
    hideDeletAll(tasks);
}

const init = () => {
    renderTasksList(tasks);
    addForm.addEventListener("submit", addTask);
    taskList.addEventListener("click", removeTask);
    deleteBtn.addEventListener("click", removeAll);
}

init();
