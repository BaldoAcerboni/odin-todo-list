import { Task, Project, AllProjects } from "./class";
import { renderProjects } from "./render";

export const projects = checkLocalStorage();

function checkLocalStorage() {
  if (localStorage.getItem("projects")) {
    //stuff to do in case localStorage is already populated
    const projs = getProjectsFromStorage();
    return projs;
  } else {
    const projs = new AllProjects();
    localStorage.setItem("projects", JSON.stringify(projs));
    return projs;
  }
}

function getProjectsFromStorage() {
  const temp = JSON.parse(localStorage.getItem("projects"));
  return setStorageProjectsListAsInstanceOfClass(temp);
}

function setStorageProjectsListAsInstanceOfClass(temp) {
  const projs = new AllProjects();
  for (const sProj of temp.projects) {
    const project = setStorageProjectAsInstanceOfClass(sProj);
    projs.addProject(project);
  }
  return projs;
}

function setStorageProjectAsInstanceOfClass(temp) {
  const project = new Project(temp.name, temp.id);
  for (const sTask of temp.taskList) {
    const task = setStorageTaskAsInstanceOfClass(sTask);
    project.addTask(task);
  }
  return project;
}

function setStorageTaskAsInstanceOfClass(temp) {
  const task = new Task(
    temp.title,
    temp.description,
    new Date(temp.dueDate),
    temp.priority,
    temp.id
  );
  return task;
}

export function updateLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
}
