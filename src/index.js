import "./style.css";
import { Task, Project, AllProjects, projects } from "./class";
import { getTaskByPriority, getTasksDueThisWeek } from "./appLogic";
import {
  highPriorityTasksLi,
  lowPriorityTasksLi,
  mediumPriorityTasksLi,
  newProjectBtn,
  projectUl,
  renderHighPriorityTasks,
  renderLowPriorityTasks,
  renderMediumPriorityTasks,
  renderProjectModal,
  renderProjectTasks,
  renderThisWeekTasks,
  thisWeekTasksLi,
} from "./render";

newProjectBtn.addEventListener("click", renderProjectModal);

projectUl.addEventListener("click", renderProjectTasks);

thisWeekTasksLi.addEventListener("click", renderThisWeekTasks);

highPriorityTasksLi.addEventListener("click", renderHighPriorityTasks);

mediumPriorityTasksLi.addEventListener("click", renderMediumPriorityTasks);

lowPriorityTasksLi.addEventListener("click", renderLowPriorityTasks);

//NEED TO DO:
//localstorage crap
