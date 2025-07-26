import { Task, Project, AllProjects, projects } from "./class";

export function createNewProject(name, id) {
  const project = new Project(name, id);
  projects.addProject(project);
  return project;
}

export function createNewTask(project, title, description, date, priority, id) {
  const task = new Task(title, description, date, priority, id);
  project.addTask(task);
}

export function getTaskByPriority(priority) {
  const tasks = projects.getAllTasks();
  return tasks.filter((task) => task.priority === priority);
}

export function getTasksDueThisWeek() {
  const tasks = projects.getAllTasks();
  return tasks.filter(
    (task) =>
      task.dueDate - new Date() < 604800000 && task.dueDate - new Date() > 0
  );
}

//done this way as to be able to modify task from all selectors in sidebar
export function getTaskById(id) {
  const tasks = projects.getAllTasks();
  return tasks.filter((task) => task.id === id);
}

export function removeTask(task) {
  for (const project of projects.projects) {
    for (const t of project.taskList) {
      if (t.id === task.id) {
        project.removeTask(t);
      }
    }
  }
}
