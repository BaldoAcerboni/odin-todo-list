export class Task {
  constructor(title, description, dueDate, priority, id) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = id;
  }
}

export class Project {
  taskList = [];
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  addTask(task) {
    this.taskList.push(task);
  }

  removeTask(task) {
    for (let i = 0; i < this.taskList.length; i++) {
      if (this.taskList[i].id === task.id) {
        this.taskList.splice(i, 1);
      }
    }
  }
}

export class AllProjects {
  projects = [];

  addProject(pro) {
    this.projects.push(pro);
  }

  removeProject(pro) {
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].id === pro.id) {
        this.projects.splice(i, 1);
      }
    }
  }

  getProjectById(id) {
    for (const project of this.projects) {
      if (project.id === id) {
        return project;
      }
    }
  }

  getAllTasks() {
    const tasks = [];
    for (let project of this.projects) {
      for (let task of project.taskList) {
        tasks.push(task);
      }
    }
    return tasks;
  }
}

export const projects = new AllProjects();
