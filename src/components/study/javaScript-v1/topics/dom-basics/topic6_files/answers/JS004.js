// Interactive To-Do List
// HTML: <input id="taskInput" type="text" placeholder="New task">
// <button id="addBtn">Add</button>
// <ul id="taskList"></ul>

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    // Create new list item
    const li = document.createElement('li');
    li.textContent = text;

    // Complete button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = '✔';
    completeBtn.style.marginLeft = '10px';
    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.style.marginLeft = '5px';
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = '';
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
