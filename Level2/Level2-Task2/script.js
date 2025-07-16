const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach((task) => renderTask(task.text, task.completed));
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    renderTask(taskText, false);
    saveTaskToLocalStorage(taskText, false);
    taskInput.value = '';
}

function renderTask(text, completed) {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed');

    li.innerHTML = `
    <span>${text}</span>
    <div class="actions">
        <button class="complete" onclick="toggleComplete(this)">✔️</button>
        <button class="deleteTask" onclick="deleteTask(this)">❌</button>
    </div>
    `;

    taskList.appendChild(li);
}

function toggleComplete(button) {
    const li = button.parentElement.parentElement;
    li.classList.toggle('completed');
    updateLocalStorage();
}

function deleteTask(button) {
    const li = button.parentElement.parentElement;
    li.remove();
    updateLocalStorage();
}

function getTasksFromLocalStorage(text, completed) {
    const tasks = getTasksFromLocalStorage();
    tasks.push({ text, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocalStorage() {
    const updateTasks = [];
    document.querySelectorAll('#task-list li').forEach((li) => {
        const text = li.querySelector('span').innerText;
        const completed = li.classList.contains('completed');
        updateTasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(updateTasks));
}
