let taskCount = 1;

function addTask() {
  let taskInput = document.getElementById('taskInput');
  let taskList = document.getElementById('taskList');
  let taskText = taskInput.value;
  if (taskText.trim() !== '') {
    let newTask = document.createElement('div');
    newTask.className = 'todo-item';
    newTask.innerHTML = `
                      
      <div class="task-number">${taskCount}</div>
      <div>${taskText}</div>
      <div class="tick" onclick="completeTask(this, ${taskCount})">✓</div>
      <div class="not-interested" onclick="notInterestedTask(this, ${taskCount})">❌</div>
      <div class="delete" onclick="deleteTask(this, ${taskCount})">🗑️</div>
          `;
    taskList.appendChild(newTask);
    taskInput.value = '';
    logAction(`→ Task ${taskCount} added at: ${new Date().toLocaleString()}`);
    taskCount++;
  } else {
    alert('Please enter a task!');
  }
}
// Function to handle "Enter" key press
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    addTask();
  }
}

function completeTask(button, taskId) {
  let taskItem = button.parentElement;
  if (!taskItem.classList.contains('deleted-task')) {
    taskItem.style.backgroundColor = 'lightgreen';
    button.style.color = 'green';
    logAction(`✓ Task ${taskId} completed at: ${new Date().toLocaleString()}`);
  }
}

function notInterestedTask(button, taskId) {
  let taskItem = button.parentElement;
  if (!taskItem.classList.contains('deleted-task')) {
    taskItem.style.backgroundColor = 'lightcoral';
    button.style.color = 'red';
    logAction(`❌ Task ${taskId} marked as not interested at: ${new Date().toLocaleString()}`);
  }
}

function deleteTask(button, taskId) {
  let taskItem = button.parentElement;
  if (!taskItem.classList.contains('deleted-task')) {
    taskItem.remove();
    logAction(`Task ${taskId} deleted at: ${new Date().toLocaleString()}`);
    // Move the deleted task to the deleted tasks column
    moveDeletedTaskToColumn(taskItem.innerHTML);
  }
}

function moveDeletedTaskToColumn(taskHtml) {
  let deletedTasks = document.getElementById('deletedTasks');
  let newDeletedTask = document.createElement('div');
  newDeletedTask.className = 'deleted-task';
  newDeletedTask.innerHTML = taskHtml;
  //deletedTasks.appendChild(newDeletedTask);
  deletedTasks.insertBefore(newDeletedTask, deletedTasks.firstChild);
}

function logAction(message) {
  let logContainer = document.getElementById('logContainer');
  let logEntry = document.createElement('div');
  logEntry.textContent = message;
  logContainer.appendChild(logEntry);
  // Prepend the log entry to the log container
  logContainer.insertBefore(logEntry, logContainer.firstChild);
}
