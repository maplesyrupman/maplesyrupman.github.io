import app from './app.js';
import displayController from './display-controller.js';
import storage from './storage.js';

storage.getProjectsFromLocal();
let projects = storage.getProjects();

const projectNavController = displayController.projectNavController(projects);
projectNavController.createProjectControllers();
projectNavController.renderProjectNav();
projectNavController.activateAddProjectBtn();


let projectDisplayController = displayController.projectDisplayController();
projectDisplayController.renderProject(projects['Default']);