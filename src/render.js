import { Task, Project, AllProjects, projects } from "./class";
import {
  createNewProject,
  createNewTask,
  getTaskById,
  getTaskByPriority,
  getTasksDueThisWeek,
  removeTask,
} from "./appLogic";
import deleteImg from "./images/close.svg";
import editImg from "./images/edit.svg";

export const main = document.querySelector("main");
export const newProjectBtn = document.querySelector(".new-project-btn");
export const taskContainer = document.querySelector(".task-container");
export const projectUl = document.querySelector(".project-list");
export const thisWeekTasksLi = document.querySelector(".week-tasks");
export const highPriorityTasksLi = document.querySelector(
  ".high-priority-tasks"
);
export const mediumPriorityTasksLi = document.querySelector(
  ".medium-priority-tasks"
);
export const lowPriorityTasksLi = document.querySelector(".low-priority-tasks");
export const tasksSelectionUl = document.querySelector(".tasks-selection");

export function removeActiveClass() {
  const projectLis = Array.from(projectUl.children);
  const tasksSelectionLis = Array.from(tasksSelectionUl.children);
  for (const projectLi of projectLis) {
    if (projectLi.classList.contains("active")) {
      projectLi.classList.remove("active");
    }
  }
  for (const taskSelectionLi of tasksSelectionLis) {
    if (taskSelectionLi.classList.contains("active")) {
      taskSelectionLi.classList.remove("active");
    }
  }
}

export function renderProjectModal() {
  const modal = document.createElement("div");
  modal.className = "project-modal";

  const label = document.createElement("label");
  label.setAttribute("for", "project-name-input");
  label.textContent = "Project Name: ";

  const name = document.createElement("input");
  name.type = "text";
  name.id = "project-name-input";

  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "CONFIRM";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "CANCEL";

  modal.appendChild(label);
  modal.appendChild(name);
  modal.appendChild(confirmBtn);
  modal.appendChild(cancelBtn);
  main.appendChild(modal);

  confirmBtn.addEventListener("click", () => {
    if (name.value) {
      const project = createNewProject(name.value, crypto.randomUUID());

      renderProjects();
      modal.remove();

      const projectLi = document.getElementById(project.id);
      removeActiveClass();
      projectLi.classList.add("active");
      renderProjectTasks(project);
    }
  });

  cancelBtn.addEventListener("click", () => {
    modal.remove();
  });
}

export function renderProjects() {
  projectUl.innerHTML = "";
  for (const project of projects.projects) {
    const li = document.createElement("li");
    li.textContent = project.name;
    li.id = project.id;

    const deleteBtn = document.createElement("img");
    deleteBtn.src = deleteImg;
    deleteBtn.className = "delete-project";

    li.appendChild(deleteBtn);
    projectUl.appendChild(li);

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      projects.removeProject(project);
      renderProjects();
    });
  }
}

export function renderProjectTasks(e) {
  if (e.target && e.target.matches("li")) {
    removeActiveClass();
    e.target.classList.add("active");
    const project = projects.getProjectById(e.target.id);

    taskContainer.innerHTML = "";
    for (const task of project.taskList) {
      renderSingleTask(task);
    }
  } else if (e instanceof Project) {
    taskContainer.innerHTML = "";
    for (const task of e.taskList) {
      renderSingleTask(task);
    }
  }

  const newTaskBtn = document.createElement("button");
  newTaskBtn.className = "new-task-btn";
  newTaskBtn.textContent = "ADD NEW TASK";
  taskContainer.appendChild(newTaskBtn);

  newTaskBtn.addEventListener("click", renderTaskModal);
}

function renderSingleTask(task) {
  const container = document.createElement("div");
  container.className = "task";
  container.id = task.id;

  const title = document.createElement("div");
  title.textContent = `Title: ${task.title}`;

  const description = document.createElement("div");
  description.textContent = `Description: ${task.description}`;

  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const date = document.createElement("div");
  date.textContent = `Due date: ${task.dueDate.getDate()}-${
    months[task.dueDate.getMonth()]
  }-${task.dueDate.getFullYear()}`;

  let priorityValue;
  if (task.priority === "h") {
    priorityValue = "High";
  } else if (task.priority === "m") {
    priorityValue = "Medium";
  } else if (task.priority === "l") {
    priorityValue = "Low";
  }
  const priority = document.createElement("div");
  priority.textContent = `Priority: ${priorityValue}`;

  const deleteBtn = document.createElement("img");
  deleteBtn.className = "delete-task";
  deleteBtn.src = deleteImg;

  const editBtn = document.createElement("img");
  editBtn.className = "edit-task";
  editBtn.src = editImg;

  container.appendChild(title);
  container.appendChild(description);
  container.appendChild(date);
  container.appendChild(priority);
  container.appendChild(deleteBtn);
  container.appendChild(editBtn);

  taskContainer.appendChild(container);

  deleteBtn.addEventListener("click", () => {
    removeTask(task);
    renderActiveLi();
  });

  editBtn.addEventListener("click", renderEditTaskModal);
}

export function renderActiveLi() {
  if (thisWeekTasksLi.classList.contains("active")) {
    renderThisWeekTasks();
  } else if (highPriorityTasksLi.classList.contains("active")) {
    renderHighPriorityTasks();
  } else if (mediumPriorityTasksLi.classList.contains("active")) {
    renderMediumPriorityTasks();
  } else if (lowPriorityTasksLi.classList.contains("active")) {
    renderLowPriorityTasks();
  } else {
    const projectLis = Array.from(projectUl.children);
    for (const projectLi of projectLis) {
      if (projectLi.classList.contains("active")) {
        const project = projects.getProjectById(projectLi.id);
        renderProjectTasks(project);
      }
    }
  }
}

export function renderEditTaskModal(e) {
  const task = getTaskById(e.target.parentNode.id);

  const modal = document.createElement("div");
  modal.className = "task-modal";

  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "task-title-input");
  titleLabel.textContent = "Title: ";

  const titleInput = document.createElement("input");
  titleInput.id = "task-title-input";
  titleInput.type = "text";
  titleInput.value = task.title;

  const descriptionLabel = document.createElement("label");
  descriptionLabel.setAttribute("for", "task-description-input");
  descriptionLabel.textContent = "Description: ";

  const descriptionInput = document.createElement("input");
  descriptionInput.id = "task-description-input";
  titleInput.type = "text";
  descriptionInput.value = task.description;

  const dateLabel = document.createElement("label");
  dateLabel.setAttribute("for", "task-date-input");
  dateLabel.textContent = "Description: ";

  const dateInput = document.createElement("input");
  dateInput.id = "task-date-input";
  dateInput.type = "date";
  // dateInput.value = task.dueDate;
  //check if it works otherwise skip it and put condition in event listener

  const radioContainer1 = document.createElement("div");

  const highPriorityLabel = document.createElement("label");
  highPriorityLabel.setAttribute("for", "task-high-radio");
  highPriorityLabel.textContent = "High Priority ";

  const highPriorityRadio = document.createElement("input");
  highPriorityRadio.id = "task-high-radio";
  highPriorityRadio.type = "radio";
  highPriorityRadio.name = "priority";
  if (task.priority === "h") {
    highPriorityRadio.checked = true;
  }

  const radioContainer2 = document.createElement("div");

  const mediumPriorityLabel = document.createElement("label");
  mediumPriorityLabel.setAttribute("for", "task-medium-radio");
  mediumPriorityLabel.textContent = "Medium Priority ";

  const mediumPriorityRadio = document.createElement("input");
  mediumPriorityRadio.id = "task-medium-radio";
  mediumPriorityRadio.type = "radio";
  mediumPriorityRadio.name = "priority";
  if (task.priority === "m") {
    mediumPriorityRadio.checked = true;
  }

  const radioContainer3 = document.createElement("div");

  const lowPriorityLabel = document.createElement("label");
  lowPriorityLabel.setAttribute("for", "task-low-radio");
  lowPriorityLabel.textContent = "Low Priority ";

  const lowPriorityRadio = document.createElement("input");
  lowPriorityRadio.id = "task-low-radio";
  lowPriorityRadio.type = "radio";
  lowPriorityRadio.name = "priority";
  if (task.priority === "l") {
    lowPriorityRadio.checked = true;
  }

  radioContainer1.appendChild(highPriorityLabel);
  radioContainer1.appendChild(highPriorityRadio);
  radioContainer2.appendChild(mediumPriorityLabel);
  radioContainer2.appendChild(mediumPriorityRadio);
  radioContainer3.appendChild(lowPriorityLabel);
  radioContainer3.appendChild(lowPriorityRadio);

  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "CONFIRM";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "CANCEL";

  modal.appendChild(titleLabel);
  modal.appendChild(titleInput);
  modal.appendChild(descriptionLabel);
  modal.appendChild(descriptionInput);
  modal.appendChild(dateLabel);
  modal.appendChild(dateInput);
  modal.appendChild(radioContainer1);
  modal.appendChild(radioContainer2);
  modal.appendChild(radioContainer3);
  modal.appendChild(confirmBtn);
  modal.appendChild(cancelBtn);

  main.appendChild(modal);

  confirmBtn.addEventListener("click", () => {
    if (
      titleInput.value &&
      descriptionInput.value &&
      dateInput.value &&
      (highPriorityRadio.checked ||
        mediumPriorityRadio.checked ||
        lowPriorityRadio.checked)
    ) {
      let priority;
      if (highPriorityRadio.checked) {
        priority = "h";
      } else if (mediumPriorityRadio.checked) {
        priority = "m";
      } else if (lowPriorityRadio.checked) {
        priority = "l";
      }
      task.title = titleInput.value;
      task.description = descriptionInput.value;
      task.dueDate = new Date(dateInput.value);
      task.priority = priority;
      renderActiveLi();
      modal.remove();
    } else {
      console.log("please check to have filled all fields");
    }
  });

  cancelBtn.addEventListener("click", () => {
    modal.remove();
  });
}

export function renderTaskModal() {
  const modal = document.createElement("div");
  modal.className = "task-modal";

  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "task-title-input");
  titleLabel.textContent = "Title: ";

  const titleInput = document.createElement("input");
  titleInput.id = "task-title-input";
  titleInput.type = "text";

  const descriptionLabel = document.createElement("label");
  descriptionLabel.setAttribute("for", "task-description-input");
  descriptionLabel.textContent = "Description: ";

  const descriptionInput = document.createElement("input");
  descriptionInput.id = "task-description-input";
  titleInput.type = "text";

  const dateLabel = document.createElement("label");
  dateLabel.setAttribute("for", "task-date-input");
  dateLabel.textContent = "Description: ";

  const dateInput = document.createElement("input");
  dateInput.id = "task-date-input";
  dateInput.type = "date";

  const radioContainer1 = document.createElement("div");

  const highPriorityLabel = document.createElement("label");
  highPriorityLabel.setAttribute("for", "task-high-radio");
  highPriorityLabel.textContent = "High Priority ";

  const highPriorityRadio = document.createElement("input");
  highPriorityRadio.id = "task-high-radio";
  highPriorityRadio.type = "radio";
  highPriorityRadio.name = "priority";

  const radioContainer2 = document.createElement("div");

  const mediumPriorityLabel = document.createElement("label");
  mediumPriorityLabel.setAttribute("for", "task-medium-radio");
  mediumPriorityLabel.textContent = "Medium Priority ";

  const mediumPriorityRadio = document.createElement("input");
  mediumPriorityRadio.id = "task-medium-radio";
  mediumPriorityRadio.type = "radio";
  mediumPriorityRadio.name = "priority";

  const radioContainer3 = document.createElement("div");

  const lowPriorityLabel = document.createElement("label");
  lowPriorityLabel.setAttribute("for", "task-low-radio");
  lowPriorityLabel.textContent = "Low Priority ";

  const lowPriorityRadio = document.createElement("input");
  lowPriorityRadio.id = "task-low-radio";
  lowPriorityRadio.type = "radio";
  lowPriorityRadio.name = "priority";

  radioContainer1.appendChild(highPriorityLabel);
  radioContainer1.appendChild(highPriorityRadio);
  radioContainer2.appendChild(mediumPriorityLabel);
  radioContainer2.appendChild(mediumPriorityRadio);
  radioContainer3.appendChild(lowPriorityLabel);
  radioContainer3.appendChild(lowPriorityRadio);

  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "CONFIRM";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "CANCEL";

  modal.appendChild(titleLabel);
  modal.appendChild(titleInput);
  modal.appendChild(descriptionLabel);
  modal.appendChild(descriptionInput);
  modal.appendChild(dateLabel);
  modal.appendChild(dateInput);
  modal.appendChild(radioContainer1);
  modal.appendChild(radioContainer2);
  modal.appendChild(radioContainer3);
  modal.appendChild(confirmBtn);
  modal.appendChild(cancelBtn);

  main.appendChild(modal);

  confirmBtn.addEventListener("click", () => {
    if (
      titleInput.value &&
      descriptionInput.value &&
      dateInput.value &&
      (highPriorityRadio.checked ||
        mediumPriorityRadio.checked ||
        lowPriorityRadio.checked)
    ) {
      let priority;
      if (highPriorityRadio.checked) {
        priority = "h";
      } else if (mediumPriorityRadio.checked) {
        priority = "m";
      } else if (lowPriorityRadio.checked) {
        priority = "l";
      }

      const activeProjectLi = document.querySelector(".active");
      const activeProject = projects.getProjectById(activeProjectLi.id);
      createNewTask(
        activeProject,
        titleInput.value,
        descriptionInput.value,
        new Date(dateInput.value),
        priority,
        crypto.randomUUID()
      );

      renderProjectTasks(activeProject);
      modal.remove();
    }
  });

  cancelBtn.addEventListener("click", () => {
    modal.remove();
  });
}

export function renderThisWeekTasks(e) {
  if (e) {
    removeActiveClass();
    e.target.classList.add("active");
  }
  const tasks = getTasksDueThisWeek();
  taskContainer.innerHTML = "";
  for (const task of tasks) {
    renderSingleTask(task);
  }
}

export function renderHighPriorityTasks(e) {
  if (e) {
    removeActiveClass();
    e.target.classList.add("active");
  }
  const tasks = getTaskByPriority("h");
  taskContainer.innerHTML = "";
  for (const task of tasks) {
    renderSingleTask(task);
  }
}

export function renderMediumPriorityTasks(e) {
  if (e) {
    removeActiveClass();
    e.target.classList.add("active");
  }
  const tasks = getTaskByPriority("m");
  taskContainer.innerHTML = "";
  for (const task of tasks) {
    renderSingleTask(task);
  }
}

export function renderLowPriorityTasks(e) {
  if (e) {
    removeActiveClass();
    e.target.classList.add("active");
  }
  const tasks = getTaskByPriority("l");
  taskContainer.innerHTML = "";
  for (const task of tasks) {
    renderSingleTask(task);
  }
}
