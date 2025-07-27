import "./style.css";
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
  renderProjects,
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

document.addEventListener("DOMContentLoaded", renderProjects);

//NEED TO DO:
//localstorage crap
