
const taskInput = document.getElementById("task");
const addBtn = document.getElementById("add");
const taskList = document.getElementById("taskList");


const tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function updateTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task}</span>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(li);

        
        li.querySelector(".edit").addEventListener("click", () => {
            const updatedTask = prompt("Edit task:", task);
            if (updatedTask !== null) {
                tasks[index] = updatedTask;
                updateTasks();
                displayTasks();
            }
        });

        li.querySelector(".delete").addEventListener("click", () => {
            tasks.splice(index, 1);
            updateTasks();
            displayTasks();
        });
    });
}

// Add task
addBtn.addEventListener("click", () => {
    const newTask = taskInput.value.trim();
    if (newTask !== "") {
        tasks.push(newTask);
        updateTasks();
        displayTasks();
        taskInput.value = "";
    }
});


displayTasks();