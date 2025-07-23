import "./style.css";
import { Task, Project, AllProjects, projects } from "./class";
import { getTaskByPriority, getTasksDueThisWeek } from "./appLogic";
import {
  newProjectBtn,
  projectUl,
  renderProjectModal,
  renderProjectTasks,
} from "./render";

newProjectBtn.addEventListener("click", renderProjectModal);

projectUl.addEventListener("click", renderProjectTasks);

//NEED TO DO:
//render tasks by restriction and whole ul .active mess
//modify tasks
//localstorage crap
