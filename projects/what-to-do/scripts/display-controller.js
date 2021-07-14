import domOps from './DOM.js'
import app from './app.js'
import storage from './storage.js'
import dateView from './dateView.js'

const displayController = (() => {
    const projectDisplay = document.getElementById('project-display');

    const taskControllerFactory = (taskObj) => {
        const taskParts = domOps.createTask(taskObj);
        let taskDiv = taskParts[0];
        let taskTitle = taskParts[1];
        let taskDueDate = taskParts[2];
        let taskEditBtn = taskParts[3];
        let btnContainer = taskParts[4];
        let taskCheckbox = taskParts[5];
        const partsToHide = [taskTitle, taskDueDate, btnContainer, taskCheckbox];

        const getTaskTitle = () => {
            return taskTitle;
        }

        const getTaskDueDate = () => {
            return taskDueDate;
        }

        const getTaskCheckbox = () => {
            return taskCheckbox;
        }

        const getTaskEditBtn = () => {
            return taskEditBtn;
        }

        const getTaskDiv = () => {
            return taskDiv;
        }

        const getPartsToHide = () => {
            return partsToHide;
        }

        return {
            getTaskTitle, 
            getTaskDueDate,
            getTaskCheckbox,
            getTaskEditBtn,
            getTaskDiv,
            getPartsToHide,
        }
    }

    const sublistControllerFactory = (sublistObj) => {

        let sublist = sublistObj;
        const sublistParts = domOps.createSublist(sublist);
        let sublistDiv = sublistParts[0];
        let sublistTitle = sublistParts[1];
        let taskContainer = sublistParts[2];
        let addTaskBtn = sublistParts[3];
        const sublistEditBtn = sublistParts[4];
        const sublistDeleteBtn = sublistParts[5];
        const sublistHeaderDiv = sublistParts[6];
        const buttonDiv = sublistParts[7];
        let taskControllers = {};

        const createTaskControllers = () => {
            let tasks = sublist.tasks;
            taskControllers = {};
            for (let key in tasks) {
                addTaskController(tasks[key]);
            }
        }

        const addTaskController = (taskObj) => {
            taskControllers[taskObj.taskName] = taskControllerFactory(taskObj);
            activateTaskDeleteBtn(taskControllers[taskObj.taskName].getTaskCheckbox(), taskObj);
            activateTaskEditBtn(taskControllers[taskObj.taskName].getTaskEditBtn(), taskObj);
        }

        const activateTaskEditBtn = (editTaskBtn, taskObj) => {
            editTaskBtn.addEventListener('click', () => {
                const currentController = taskControllers[taskObj.taskName];
                toggleTaskParts(currentController);
                const taskEditFormParts = domOps.createEditTaskForm(taskObj.taskName, taskObj.taskDueDate);
                taskEditFormParts[1].addEventListener('keydown', e => {
                    if (e.code === "Enter") {
                        confirmTaskChange(taskObj, taskEditFormParts[1], taskEditFormParts[2]);
                    }
                });
                taskEditFormParts[2].addEventListener('keydown', e => {
                    if (e.code === "Enter") {
                        confirmTaskChange(taskObj, taskEditFormParts[1], taskEditFormParts[2]);
                    }
                });
                currentController.getTaskDiv().appendChild(taskEditFormParts[0]);
                activateCancelChangeBtn(taskEditFormParts[4], currentController);
                activateConfirmChangeBtn(taskEditFormParts[3], taskObj, taskEditFormParts[1], taskEditFormParts[2]);
            })
        }

        const confirmTaskChange = (taskObj, newName, newDueDate) => {
            storage.updateTask(taskObj.taskName, taskObj.parent, taskObj.grandparent, newName.value, newDueDate.value);
            clearTaskContainer();
            taskControllers = {};
            sublist = storage.getProjects()[taskObj.grandparent].sublists[taskObj.parent];
            createTaskControllers();
            addTaskDivsToContainer();
        }

        const activateConfirmChangeBtn = (confirmChangeBtn, taskObj, newName, newDueDate) => {
            confirmChangeBtn.addEventListener('click', () => confirmTaskChange(taskObj, newName, newDueDate));
        }

        const activateCancelChangeBtn = (cancelChangeBtn, currentController) => {
            cancelChangeBtn.addEventListener('click', () => {
                currentController.getTaskDiv().lastChild.remove();
                toggleTaskParts(currentController);
            })
        }

        const toggleTaskParts = (taskController) => {
            if (!taskController.getTaskTitle().classList.contains('hide')) {
                taskController.getPartsToHide().forEach(part => {
                    part.classList.add('hide');
                });
            } else {
                taskController.getPartsToHide().forEach(part => {
                    part.classList.remove('hide');
                });
            }
        }

        const activateTaskDeleteBtn = (taskCheckbox, taskObj) => {
            taskCheckbox.addEventListener('click', () => {
                let taskName = taskObj.taskName;
                deleteTaskController(taskName);
                storage.deleteTask(taskObj.taskName, taskObj.parent, taskObj.grandparent);
            })
        }

        const deleteTaskController = (taskToDelete) => {
            delete taskControllers[taskToDelete];
            clearTaskContainer();
            addTaskDivsToContainer();
        }

        const clearTaskContainer = () => {
            while (taskContainer.hasChildNodes()) {
                taskContainer.removeChild(taskContainer.lastChild);
            }
        }

        const addTaskDivsToContainer = () => {
            for (let key in taskControllers) {
                taskContainer.appendChild(taskControllers[key].getTaskDiv());
            }
        }

        const getSublistDiv = () => {
            return sublistDiv;
        }

        const getSublistDeleteBtn = () => {
            return sublistDeleteBtn;
        }

        const getSublistEditBtn = () => {
            return sublistEditBtn;
        }

        const getAddTaskBtn = () => {
            return addTaskBtn;
        }

        const getTaskContainer = () => {
            return taskContainer;
        }

        const addTask = (taskObj) => {
            sublist.tasks[taskObj.taskName] = taskObj;
        }

        const getSublistTitle = () => {
            return sublistTitle;
        }

        const getHeaderDiv = () => {
            return sublistHeaderDiv;
        }

        const getButtonDiv = () => {
            return buttonDiv;
        }

        const getSublistObj = () => {
            return sublist;
        }

        return {
            addTaskController,
            createTaskControllers,
            deleteTaskController,
            clearTaskContainer,
            addTaskDivsToContainer,
            getSublistDiv,
            getSublistTitle,
            getHeaderDiv,
            getButtonDiv,
            getSublistDeleteBtn,
            getSublistEditBtn,
            getAddTaskBtn,
            getTaskContainer,
            addTask,
            getSublistObj,
        }
    }

    const projectControllerFactory = (projectObj) => {
        const projectParts = domOps.createNewProjectTab(projectObj);
        let projectTabDiv = projectParts[0];
        let projectTabName = projectParts[1];
        let projectEditBtn = projectParts[2];
        let projectDeleteBtn = projectParts[3];
        let buttonDiv = projectParts[4];
        let sublistControllers = {};
        let newTaskFormIsDisplayed = false;

        const getProjectEditBtn =  () => {
            return projectEditBtn;
        }

        const getProjectDeleteBtn = () => {
            return projectDeleteBtn;
        }

        const getProjectTabName = () => {
            return projectTabName;
        }

        const getButtonDiv = () => {
            return buttonDiv;
        }

        const getProjectName = () => {
            return projectObj.projectName;
        }

        const createSublistControllers = () => {
            let sublists = projectObj.sublists;
            for (let key in sublists) {
                sublistControllers[key] = sublistControllerFactory(sublists[key]);
                let currentSublistController = sublistControllers[key];
                activateAddTaskBtn(currentSublistController);
            }
        }

        const activateAddTaskBtn = (currentSublistController) => {
            let addTaskBtn = currentSublistController.getAddTaskBtn();
            const parent = addTaskBtn.dataset.parent;
            const grandparent = addTaskBtn.dataset.grandparent;
            addTaskBtn.addEventListener('click', e => {
                if (newTaskFormIsDisplayed) {
                    alert('Please finish creating the task you are currently working on before starting another');
                    return;
                }
                newTaskFormIsDisplayed = true;
                let newTaskFormParts = domOps.createNewTaskForm();
                newTaskFormParts[1].addEventListener('keydown', e => {
                    if (e.code === "Enter") {
                        confirmNewTask(currentSublistController, newTaskFormParts, parent, grandparent);
                    }
                });
                newTaskFormParts[2].addEventListener('keydown', e => {
                    if (e.code === "Enter") {
                        confirmNewTask(currentSublistController, newTaskFormParts, parent, grandparent);
                    }
                });
                activateCancleTaskBtn(currentSublistController, newTaskFormParts[4]);
                activateConfirmTaskBtn(currentSublistController, newTaskFormParts[3], newTaskFormParts, parent, grandparent);
                currentSublistController.getTaskContainer().appendChild(newTaskFormParts[0]);
            });
        }

        const confirmNewTask = (currentSublistController, newTaskFormParts, parent, grandparent) => {
            let newTask = app.taskFactory(newTaskFormParts[1].value, newTaskFormParts[2].value, parent, grandparent);
            storage.addTask(newTask, parent, grandparent);
            currentSublistController.addTaskController(newTask);
            currentSublistController.clearTaskContainer();
            currentSublistController.addTaskDivsToContainer();
            newTaskFormIsDisplayed = false;
        }

        const activateConfirmTaskBtn = (currentSublistController, createTaskBtn, newTaskFormParts, parent, grandparent) => {
            createTaskBtn.addEventListener('click', () => confirmNewTask(currentSublistController, newTaskFormParts, parent, grandparent));
        }

        const activateCancleTaskBtn = (currentSublistController, cancleTaskBtn) => {
            cancleTaskBtn.addEventListener('click', () => {
                currentSublistController.getTaskContainer().lastChild.remove();
                newTaskFormIsDisplayed = false;
            })
        }

        const getSublistControllers = () => {
            return sublistControllers;
        }

        const getProjectTabDiv = () => {
            return projectTabDiv;
        }

        return {
            createSublistControllers,
            getProjectTabDiv,
            getSublistControllers,
            getProjectEditBtn, 
            getProjectDeleteBtn,
            getProjectTabName, 
            getButtonDiv,
            getProjectName,
        }

    }

    const projectDisplayController = () => {
        let newSublistFormIsDisplayed = false;
        let projectName;

        const addSublistDivsToProjectDisplay = (sublistControllers) => {
            for (let key in sublistControllers) {
                projectDisplay.appendChild(sublistControllers[key].getSublistDiv());
            }
        }

        const activateAddSublistBtn = () => {
            const addSublistBtn = document.getElementById('addSublistBtn');
            addSublistBtn.addEventListener('click', () => {
                if (newSublistFormIsDisplayed) {
                    alert('Please finish creating the sublist you are currently working on before starting another');
                    return;
                }
                newSublistFormIsDisplayed = true;
                let newSublistFormParts = domOps.createNewSublistForm(projectName);
                const addSublistBtnContainer = addSublistBtn.parentNode;
                addSublistBtnContainer.appendChild(newSublistFormParts[0]);
                newSublistFormParts[1].addEventListener('keydown', e => {
                    if (e.code === "Enter") {
                        confirmNewSublist(newSublistFormParts[1], newSublistFormParts[2].dataset.parentProjectName);
                    }
                });
                activateConfirmSublistBtn(newSublistFormParts[1], newSublistFormParts[2]);
                activateCancleSublistBtn(newSublistFormParts[3], addSublistBtnContainer);
                addSublistBtn.classList.add('hide');
            });
        }

        const confirmNewSublist = (sublistName, parentProject) => {
            storage.addSublist(app.sublistFactory(sublistName.value, parentProject), parentProject);
            let project = storage.getProjects()[projectName];
            let projectToDisplay = projectControllerFactory(project);
            projectToDisplay.createSublistControllers();
            renderProject(project);
            newSublistFormIsDisplayed = false;
        }

        const activateConfirmSublistBtn = (sublistName, confirmSublistBtn) => {
            confirmSublistBtn.addEventListener('click', e => {
                let parentProject = e.currentTarget.dataset.parentProjectName;
                confirmNewSublist(sublistName, parentProject);
            })
        }

        const activateCancleSublistBtn = (cancleSublistBtn, addSublistBtnContainer) => {
            cancleSublistBtn.addEventListener('click', () => {
                addSublistBtnContainer.lastChild.remove();
                addSublistBtn.classList.remove('hide');
                newSublistFormIsDisplayed = false;
            })
        }

        const activateSublistDeleteBtn = (sublistDeleteBtn) => {
            sublistDeleteBtn.addEventListener('click', () => {
                storage.deleteSublist(sublistDeleteBtn.dataset.name, sublistDeleteBtn.dataset.parent)
                renderProject(storage.getProjects()[sublistDeleteBtn.dataset.parent]);
            })
        }

        const activateSublistEditBtn = (sublistEditBtn, sublistName, sublistController) => {
            sublistEditBtn.addEventListener('click', () => {
                let sublistHeaderDiv = sublistController.getHeaderDiv();
                let sublistBtnDiv = sublistController.getButtonDiv();
                let sublistTitle = sublistController.getSublistTitle();
                sublistBtnDiv.classList.add('hide');
                sublistTitle.classList.add('hide');
                let editSublistFormParts = domOps.createEditSublistForm(sublistName);
                editSublistFormParts[1].addEventListener('keydown', e => {
                    if (e.code === "Enter") {
                        confirmSublistChange(editSublistFormParts[1], sublistTitle.textContent, sublistController);
                    }
                });
                sublistHeaderDiv.appendChild(editSublistFormParts[0]);
                activateCancleChangeBtn(editSublistFormParts[3], sublistController);
                activateConfirmChangeBtn(editSublistFormParts[2], editSublistFormParts[1], sublistTitle.textContent, sublistController);
                sublistController.clearTaskContainer();
                sublistController.createTaskControllers();
                sublistController.addTaskDivsToContainer();
            })
        }

        const activateCancleChangeBtn = (cancleChangeBtn, sublistController) => {
            cancleChangeBtn.addEventListener('click', () => {
                sublistController.getSublistTitle().classList.remove('hide');
                sublistController.getButtonDiv().classList.remove('hide');
                sublistController.getHeaderDiv().lastChild.remove();
            })
        }

        const confirmSublistChange = (nameField, oldSublistName, sublistController) => {
            storage.updateSublistName(sublistController.getSublistObj().parent, oldSublistName, nameField.value);
            sublistController.getSublistTitle().textContent = nameField.value;
            sublistController.getSublistTitle().classList.remove('hide');
            sublistController.getButtonDiv().classList.remove('hide');
            sublistController.getHeaderDiv().lastChild.remove();
        }

        const activateConfirmChangeBtn = (confirmChangeBtn, nameField, oldSublistName, sublistController) => {
            confirmChangeBtn.addEventListener('click', () => confirmSublistChange(nameField, oldSublistName, sublistController))
        }

        const renderProject = (projectObj) => {
            clearProjectDisplay();
            let project = projectObj;
            projectName = projectObj.projectName;
            const currentProjectName = project.projectName;
            let projectToDisplay = projectControllerFactory(project);
            projectToDisplay.createSublistControllers();
            let sublistControllers = Object.values(projectToDisplay.getSublistControllers());
            for (let value of sublistControllers) {
                activateSublistDeleteBtn(value.getSublistDeleteBtn());
                activateSublistEditBtn(value.getSublistEditBtn(), value.getSublistTitle().textContent, value);
                value.createTaskControllers();
                value.addTaskDivsToContainer();
            };
            addSublistDivsToProjectDisplay(sublistControllers);
            const addSublistBtnContainer = domOps.createAddSublistBtnContainer(currentProjectName);
            projectDisplay.appendChild(addSublistBtnContainer[0]);
            activateAddSublistBtn();
        }

        const renderTodaysTasks = () => {
            clearProjectDisplay();
            let todaysTasks = dateView.getTaskObjsDueToday(storage.getProjects());
            let todaysTasksContainer = document.createElement('div');
            todaysTasksContainer.classList.add('todays-tasks-container');
            projectDisplay.appendChild(todaysTasksContainer);
            for (let task of Object.values(todaysTasks)) {
                const taskParts = domOps.createDateViewTask(task);
                taskParts[1].addEventListener('click', e => {
                    storage.deleteTask(e.target.dataset.name, e.target.dataset.parent, e.target.dataset.grandparent);
                    renderTodaysTasks();

                })
                todaysTasksContainer.appendChild(taskParts[0]);
            }

            if (!todaysTasksContainer.hasChildNodes()) {
                let noTasksMessage = document.createElement('h3');
                noTasksMessage.classList.add('no-tasks-message');
                noTasksMessage.textContent = 'No tasks due, it must be your day off!';
                todaysTasksContainer.appendChild(noTasksMessage);
            }
        }

        const clearProjectDisplay = () => {
            while (projectDisplay.hasChildNodes()) {
                projectDisplay.lastChild.remove();
            }
        }



        return {
            renderProject,
            renderTodaysTasks,
        }
    }

    const projectNavController = (projectsObj) => {
        const projectNavTabs = document.getElementById('project-nav-tabs');
        let projects = projectsObj;
        let projectControllers = {};
        let newProjectFormIsDisplayed = false;
        let displayedProjectDiv = document.getElementById('general');

        const createProjectControllers = () => {
            for (let key in projects) {
                projectControllers[key] = projectControllerFactory(projects[key]);
            }
        }

        const setProjects = (newProjectsObj) => {
            projects = newProjectsObj;
        }

        const renderProjectNav = () => {
            for (let key in projectControllers) {
                let currentController = projectControllers[key];
                let projectName = currentController.getProjectName();
                if (projectName == 'General') {
                    const generalTab = document.getElementById('general');
                    activateGeneralTab(generalTab);
                    continue;
                } else if (projectName == 'Today') {
                    const todayTab = document.getElementById('today');
                    activateTodayTab(todayTab);
                    continue;
                } else if (projectName == 'This Week') {
                    const thisWeekTab = document.getElementById('this-week')
                    activateThisWeekTab(thisWeekTab);
                    continue;
                }
                projectNavTabs.appendChild(currentController.getProjectTabDiv());
                activateProjectEditBtn(currentController.getProjectEditBtn(), currentController);
                activateProjectDeleteBtn(currentController.getProjectDeleteBtn());
                currentController.getProjectTabDiv().addEventListener('click', e => {
                    if (e.currentTarget.localName != 'div') {
                        return;
                    }
                    if (e.currentTarget.dataset.name) {
                        displayProject(e.currentTarget.dataset.name);
                    }
                    toggleDisplayedTab(currentController.getProjectTabDiv());
                })
            }
        }

        const activateGeneralTab = (generalTab) => {
            generalTab.classList.add('displayed');
            generalTab.addEventListener('click', e => {
                if (e.currentTarget.localName != 'div') {
                    return;
                }
                if (e.currentTarget.dataset.name) {
                    displayProject(e.currentTarget.dataset.name);
                }
                toggleDisplayedTab(generalTab);
            })
        }

        const activateTodayTab = (todayTab) => {
            todayTab.addEventListener('click', e => {
                if (e.currentTarget.localName != 'div') {
                    return;
                }
                if (e.currentTarget.dataset.name) {
                    displayTodaysTasks();
                }
                toggleDisplayedTab(todayTab);
            })
        }

        const activateThisWeekTab = (thisWeekTab) => {
            thisWeekTab.addEventListener('click', e => {
                if (e.currentTarget.localName != 'div') {
                    return;
                }
                if (e.currentTarget.dataset.name) {
                    while (projectDisplay.hasChildNodes()) {
                        projectDisplay.lastChild.remove();
                    }
                    let comingSoonMessage = document.createElement('h3');
                    comingSoonMessage.textContent = 'This feature is currently under construction, please check back again soon!';
                    comingSoonMessage.classList.add('coming-soon');
                    projectDisplay.appendChild(comingSoonMessage);

                }
                toggleDisplayedTab(thisWeekTab);
            })
        }

        const activateProjectEditBtn = (projectEditBtn, currentController) => {
            const projectName = projectEditBtn.dataset.project;
            projectEditBtn.addEventListener('click', () => {
                const projectTabDiv = currentController.getProjectTabDiv();
                const editProjectFormParts = domOps.createEditProjectForm(projectName);
                editProjectFormParts[1].addEventListener('keydown', e => {
                    if (e.code === "Enter") {
                        confirmProjectChange(editProjectFormParts[1], projectName, currentController);
                    }
                });
                hideTabContents(currentController);
                projectTabDiv.appendChild(editProjectFormParts[0]);
                activateCancleChangeBtn(editProjectFormParts[3], currentController);
                activateConfirmChangeBtn(editProjectFormParts[2], editProjectFormParts[1], projectName, currentController);
            })
        }

        const confirmProjectChange = (nameField, oldProjectName, currentProjectController) => {
            storage.updateProjectName(oldProjectName, nameField.value);
            currentProjectController.getProjectTabName().textContent = nameField.value;
            currentProjectController.getProjectTabDiv().lastChild.remove();
            currentProjectController.getProjectTabDiv().dataset.name = nameField.value;
            projectControllers[nameField.value] = currentProjectController;
            delete projectControllers[oldProjectName];
            displayOriginalTabContents(currentProjectController);
            setProjects(storage.getProjects());
        }

        const activateConfirmChangeBtn = (confirmChangeBtn, nameField, oldProjectName, currentProjectController) => {
            confirmChangeBtn.addEventListener('click', () => confirmProjectChange(nameField, oldProjectName, currentProjectController));
        }

        const activateCancleChangeBtn = (cancleChangeBtn, currentProjectController) => {
            cancleChangeBtn.addEventListener('click', () => {
                currentProjectController.getProjectTabDiv().lastChild.remove();
                displayOriginalTabContents(currentProjectController);
            })
        }

        const hideTabContents = (currentProjectController) => {
            currentProjectController.getProjectTabName().classList.add('hide');
            currentProjectController.getButtonDiv().classList.add('hide');
        }

        //toggles the hide class on the projectTab contents
        const displayOriginalTabContents = (currentProjectController) => {
            currentProjectController.getProjectTabName().classList.remove('hide');
            currentProjectController.getButtonDiv().classList.remove('hide');
        }

        const activateProjectDeleteBtn = (projectDeleteBtn) => {
            projectDeleteBtn.addEventListener('click', e => {
                const projectName = projectDeleteBtn.dataset.project;
                document.getElementById(projectName).remove();
                delete projectControllers[projectName];
                storage.deleteProject(projectName);
            })
        }

        const displayProject = (projectName) => {
            let displayController = projectDisplayController();
            displayController.renderProject(storage.getProjects()[projectName]);
        }

        const displayTodaysTasks = () => {
            let displayController = projectDisplayController();
            displayController.renderTodaysTasks();
        }

        const getProjectControllers = () => {
            return projectControllers;
        }

        const clearProjectNav = () => {
            while (projectNavTabs.hasChildNodes()) {
                projectNavTabs.lastChild.remove();
            }
        }

        const activateAddProjectBtn = () => {
            const addProjectBtn = document.getElementById('add-project-btn');
            addProjectBtn.addEventListener('click', () => {
                if (newProjectFormIsDisplayed) {
                    alert('Please finish creating the new project you have started before creating another');
                    return;
                }
                newProjectFormIsDisplayed = true;
                const newProjectFormParts = domOps.createNewProjectForm();
                newProjectFormParts[1].addEventListener('keydown', e => {
                    if (e.code === "Enter") {
                        confirmNewProject(newProjectFormParts[1]);
                    }
                });
                activateConfirmProjectBtn(newProjectFormParts);
                activateCancleProjectBtn(newProjectFormParts[3]);
                projectNavTabs.appendChild(newProjectFormParts[0]);
            });
        }

        const confirmNewProject = (nameField) => {
            storage.addProject(app.projectFactory(nameField.value), nameField.value);
            clearProjectNav();
            setProjects(storage.getProjects());
            createProjectControllers();
            renderProjectNav();
            newProjectFormIsDisplayed = false;
        }

        const activateConfirmProjectBtn = (newProjectFormParts) => {
            newProjectFormParts[2].addEventListener('click', () => confirmNewProject(newProjectFormParts[1]));
        }

        const activateCancleProjectBtn = (cancleProjectBtn) => {
            cancleProjectBtn.addEventListener('click', () => {
                projectNavTabs.lastChild.remove();
                newProjectFormIsDisplayed = false;
            })
        }

        const toggleDisplayedTab = (projectTabDiv) => {
            if (projectTabDiv === displayedProjectDiv) {
                return;
            }
            projectTabDiv.classList.add('displayed');
            displayedProjectDiv.classList.remove('displayed');
            displayedProjectDiv = projectTabDiv;
        }

        return {
            setProjects,
            createProjectControllers,
            getProjectControllers,
            renderProjectNav,
            activateAddProjectBtn,
        }
    };

    return {
        taskControllerFactory,
        sublistControllerFactory,
        projectControllerFactory,
        projectDisplayController,
        projectNavController,
    }

})();



export default displayController