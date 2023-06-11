let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const highlightBtn = document.createElement('button');
    highlightBtn.className = 'highlight-btn';
    highlightBtn.innerText = 'H';
    highlightBtn.addEventListener('click', () => toggleTaskHighlight(index));
    li.appendChild(highlightBtn);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(index));
    li.appendChild(checkbox);

    const span = document.createElement('span');
    span.innerText = task.title;
    if (task.completed) {
      li.classList.add('completed');
    }
    if (task.highlighted) {
      li.classList.add('highlighted');
    }
    li.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerText = 'X';
    deleteBtn.addEventListener('click', () => deleteTask(index));
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskTitle = taskInput.value.trim();

  if (taskTitle !== '') {
    tasks.push({ title: taskTitle, completed: false, highlighted: false });
    saveTasks();
    taskInput.value = '';
    renderTasks();
  }
}

function toggleTaskHighlight(index) {
  tasks[index].highlighted = !tasks[index].highlighted;
  saveTasks();
  renderTasks();
}

function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function deleteCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

function deleteAllTasks() {
  tasks = [];
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

renderTasks();
