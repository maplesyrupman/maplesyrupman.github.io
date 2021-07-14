import app from './app.js';
import displayController from './display-controller.js';
import storage from './storage.js';
import dateView from './dateView.js';

storage.getProjectsFromLocal();
let projects = storage.getProjects();
console.log(projects);

const projectNavController = displayController.projectNavController(projects);
projectNavController.createProjectControllers();
projectNavController.renderProjectNav();
projectNavController.activateAddProjectBtn();


let projectDisplayController = displayController.projectDisplayController();
projectDisplayController.renderProject(projects['General']);


console.log(dateView.getTaskObjsDueToday(projects))