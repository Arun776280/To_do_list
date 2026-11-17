let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
function addTask() {

    let input = document.getElementById("taskInput");

    let taskValue = input.value.trim();

    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    let task = {
        id: Date.now(),
        text: taskValue,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    input.value = "";

    displayTasks();
}

// Display tasks
function displayTasks() {

    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if (currentFilter === "pending") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    if (filteredTasks.length === 0) {

        taskList.innerHTML =
            '<p class="empty-message">No tasks found!</p>';

    }

    filteredTasks.forEach(task => {

        let li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        let span = document.createElement("span");

        span.className = "task-text";
        span.textContent = task.text;

        // Complete task
        span.onclick = function() {
            toggleTask(task.id);
        };

        let actions = document.createElement("div");

        actions.className = "actions";

        // Edit button
        let editBtn = document.createElement("button");

        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        editBtn.onclick = function() {
            editTask(task.id);
        };

        // Delete button
        let deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.onclick = function() {
            deleteTask(task.id);
        };

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);

    });

    updateCount();
}

// Complete / Pending
function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();

    displayTasks();
}

// Delete task
function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    displayTasks();
}

// Edit task
function editTask(id) {

    let task = tasks.find(task => task.id === id);

    let newText = prompt("Edit your task:", task.text);

    if (newText !== null && newText.trim() !== "") {

        task.text = newText.trim();

        saveTasks();

        displayTasks();
    }
}

// Filter tasks
function filterTasks(filter) {

    currentFilter = filter;

    document.querySelectorAll(".filter-buttons button")
        .forEach(button => button.classList.remove("active"));

    event.target.classList.add("active");

    displayTasks();
}

// Update task count
function updateCount() {

    let total = tasks.length;

    let pending = tasks.filter(task => !task.completed).length;

    let completed = tasks.filter(task => task.completed).length;

    document.getElementById("taskCount").textContent =
        `${total} Total Tasks | ${pending} Pending | ${completed} Completed`;
}

// Enter key support
document.getElementById("taskInput").addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});

// Initial display
displayTasks();