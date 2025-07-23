import { Task, Project, AllProjects, projects } from "./class";

export function createNewProject(name, id) {
  const project = new Project(name, id);
  projects.addProject(project);
  return project;
}

export function getTaskByPriority(priority, projects) {
  const tasks = projects.getAllTasks();
  return tasks.filter((task) => task.priority === priority);
}

export function getTasksDueThisWeek(projects) {
  const tasks = projects.getAllTasks();
  return tasks.filter((task) => task.dueDate - new Date() < 604800000);
}
