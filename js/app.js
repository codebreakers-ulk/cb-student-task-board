// Storage Key
const STORAGE_KEY = "cb_student_task_board";

// State
let tasks = [];

// DOM Elements
const todoContainer = document.getElementById("todoContainer");
const inProgressContainer = document.getElementById("inProgressContainer");
const doneContainer = document.getElementById("doneContainer");

const countTodo = document.getElementById("countTodo");
const countInProgress = document.getElementById("countInProgress");
const countDone = document.getElementById("countDone");

const toggleFormBtn = document.getElementById("toggleFormBtn");
const taskFormContainer = document.getElementById("taskFormContainer");
const newTaskForm = document.getElementById("newTaskForm");
const cancelFormBtn = document.getElementById("cancelFormBtn");

// 1. Load Tasks from LocalStorage or defaultTasks
function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      tasks = JSON.parse(stored);
    } catch (e) {
      tasks = [...defaultTasks];
    }
  } else {
    tasks = [...defaultTasks];
    saveTasks();
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// 2. Render Board
function renderBoard() {
  // Clear columns
  todoContainer.innerHTML = "";
  inProgressContainer.innerHTML = "";
  doneContainer.innerHTML = "";

  let todoCount = 0;
  let inProgressCount = 0;
  let doneCount = 0;

  tasks.forEach((task) => {
    const card = createTaskCardElement(task);

    if (task.status === "todo") {
      todoContainer.appendChild(card);
      todoCount++;
    } else if (task.status === "inprogress") {
      inProgressContainer.appendChild(card);
      inProgressCount++;
    } else if (task.status === "done") {
      doneContainer.appendChild(card);
      doneCount++;
    }
  });

  // Update counts
  countTodo.textContent = todoCount;
  countInProgress.textContent = inProgressCount;
  countDone.textContent = doneCount;
}

// 3. Create Task Card DOM Element
function createTaskCardElement(task) {
  const card = document.createElement("article");
  card.className = "task-card";

  card.innerHTML = `
    <div class="task-top">
      <span class="task-subject">${task.category}</span>
      <span class="priority-tag priority-${task.priority}">${task.priority}</span>
    </div>
    <h3 class="task-title">${task.title}</h3>
    <div class="task-meta">Due: ${task.dueDate}</div>
    <div class="task-actions">
      <select class="action-select" data-id="${task.id}">
        <option value="todo" ${task.status === "todo" ? "selected" : ""}>To Do</option>
        <option value="inprogress" ${task.status === "inprogress" ? "selected" : ""}>In Progress</option>
        <option value="done" ${task.status === "done" ? "selected" : ""}>Completed</option>
      </select>
      <button class="btn-delete" data-id="${task.id}">Delete</button>
    </div>
  `;

  // Status Change Listener
  const select = card.querySelector(".action-select");
  select.addEventListener("change", (e) => {
    const newStatus = e.target.value;
    updateTaskStatus(task.id, newStatus);
  });

  // Delete Listener
  const deleteBtn = card.querySelector(".btn-delete");
  deleteBtn.addEventListener("click", () => {
    deleteTask(task.id);
  });

  return card;
}

// 4. Update Status
function updateTaskStatus(taskId, newStatus) {
  tasks = tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t));
  saveTasks();
  renderBoard();
}

// 5. Delete Task
function deleteTask(taskId) {
  tasks = tasks.filter((t) => t.id !== taskId);
  saveTasks();
  renderBoard();
}

// 6. Handle New Task Submission
function handleCreateTask(e) {
  e.preventDefault();
  const title = document.getElementById("taskTitle").value.trim();
  const category = document.getElementById("taskCategory").value.trim();
  const dueDate = document.getElementById("taskDue").value;
  const priority = document.getElementById("taskPriority").value;
  const status = document.getElementById("taskStatus").value;

  if (!title || !category || !dueDate) return;

  const newTask = {
    id: Date.now(),
    title,
    category,
    dueDate,
    priority,
    status
  };

  tasks.push(newTask);
  saveTasks();

  newTaskForm.reset();
  taskFormContainer.classList.add("hidden");
  renderBoard();
}

// Event Listeners
toggleFormBtn.addEventListener("click", () => {
  taskFormContainer.classList.toggle("hidden");
});

cancelFormBtn.addEventListener("click", () => {
  newTaskForm.reset();
  taskFormContainer.classList.add("hidden");
});

newTaskForm.addEventListener("submit", handleCreateTask);

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  renderBoard();
});