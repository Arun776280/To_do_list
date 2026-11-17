# Ex03 To-Do List using JavaScript
# Date:17.11.2026
# AIM
To create a To-do Application with all features using JavaScript.

# ALGORITHM
# STEP 1
Build the HTML structure (index.html).

# STEP 2
Style the App (style.css).

# STEP 3
Plan the features the To-Do App should have.

# STEP 4
Create a To-do application using Javascript.

# STEP 5
Add functionalities.

# STEP 6
Test the App.

# STEP 7
Open the HTML file in a browser to check layout and functionality.

# STEP 8
Fix styling issues and refine content placement.

# STEP 9
Deploy the website.

# STEP 10
Upload to GitHub Pages for free hosting.

# PROGRAM
# html 
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My To-Do List</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">

        <h1>My To-Do List</h1>
        <p class="subtitle">Organize your daily tasks</p>

        <div class="input-section">
            <input type="text" id="taskInput" placeholder="Enter your task...">
            <button id="addBtn" onclick="addTask()">Add</button>
        </div>

        <div class="filter-buttons">
            <button onclick="filterTasks('all')" class="active">All</button>
            <button onclick="filterTasks('pending')">Pending</button>
            <button onclick="filterTasks('completed')">Completed</button>
        </div>

        <ul id="taskList"></ul>

        <div class="task-count" id="taskCount">
            0 Total Tasks | 0 Pending
        </div>

    </div>

    <script src="script.js"></script>
</body>
</html>
```
# style.css
```
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: linear-gradient(135deg, #667eea, #764ba2);
    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background: white;
    width: 450px;
    padding: 30px;
    border-radius: 18px;

    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

h1 {
    text-align: center;
    color: #333;
    font-size: 30px;
    margin-bottom: 5px;
}

.subtitle {
    text-align: center;
    color: gray;
    margin-bottom: 25px;
}

.input-section {
    display: flex;
    gap: 10px;
}

input {
    flex: 1;
    padding: 13px;
    border: 1px solid #ddd;
    border-radius: 7px;
    font-size: 14px;
    outline: none;
}

input:focus {
    border-color: #667eea;
}

button {
    border: none;
    padding: 12px 16px;
    border-radius: 7px;
    cursor: pointer;
    color: white;
    font-size: 14px;
    transition: 0.3s;
}

#addBtn {
    background: #667eea;
}

#addBtn:hover {
    background: #4c5ed0;
}

.filter-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
}

.filter-buttons button {
    background: #667eea;
}

.filter-buttons button:hover,
.filter-buttons button.active {
    background: #4b55bd;
}

ul {
    list-style: none;
}

li {
    background: #f1f2f5;
    padding: 13px;
    margin-bottom: 10px;
    border-radius: 7px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

.task-text {
    flex: 1;
    cursor: pointer;
    overflow-wrap: anywhere;
    color: #333;
}

li.completed .task-text {
    text-decoration: line-through;
    color: gray;
}

.actions {
    display: flex;
    gap: 6px;
}

.edit-btn {
    background: #f0ad4e;
}

.edit-btn:hover {
    background: #d99432;
}

.delete-btn {
    background: #e74c3c;
}

.delete-btn:hover {
    background: #c0392b;
}

.task-count {
    text-align: center;
    margin-top: 20px;
    color: gray;
    font-size: 14px;
}

.empty-message {
    text-align: center;
    color: gray;
    padding: 15px;
}

@media (max-width: 500px) {
    .container {
        width: 90%;
        padding: 20px;
    }

    h1 {
        font-size: 25px;
    }
}
```
# script.js
```
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
```
# OUTPUT
![alt text](<Screenshot 2026-11-17 214006.png>)
# RESULT
The program for creating To-do list using JavaScript is executed successfully.