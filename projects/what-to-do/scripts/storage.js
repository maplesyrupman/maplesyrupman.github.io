const storage = (() => {
    let projects = {};

    const addTask = (taskObj, parentSublistName, grandparentProjectName) => {
        projects[grandparentProjectName].sublists[parentSublistName].tasks[taskObj.taskName] = taskObj;
        saveProjectsToLocal();
        getProjectsFromLocal();
    }

    const deleteTask = (taskName, parentSublistName, grandparentProjectName) => {
        delete projects[grandparentProjectName].sublists[parentSublistName].tasks[taskName];
        saveProjectsToLocal();
        getProjectsFromLocal();
    }

    const updateTask = (taskName, parent, grandparent, newName, newDueDate) => {
        let taskToUpdate = projects[grandparent].sublists[parent].tasks[taskName];
        taskToUpdate.taskName = newName;
        taskToUpdate.taskDueDate = newDueDate;
        console.log(taskToUpdate);
        delete projects[grandparent].sublists[parent].tasks[taskName];
        addTask(taskToUpdate, parent, grandparent);
        console.log(projects[grandparent].sublists[parent]);
    }

    const addSublist = (sublistObj, parentProjectName) => {
        projects[parentProjectName].sublists[sublistObj.sublistName] = sublistObj;
        saveProjectsToLocal();
        getProjectsFromLocal();
    }

    const deleteSublist = (sublistName, parentProjectName) => {
        delete projects[parentProjectName].sublists[sublistName];
        saveProjectsToLocal();
        getProjectsFromLocal();
    }

    const updateSublistName = (parentProject, oldName, newName) => {
        projects[parentProject].sublists[newName] = projects[parentProject].sublists[oldName];
        projects[parentProject].sublists[newName].sublistName = newName;
        projects[parentProject].sublists[newName].parentProject = parentProject;
        delete projects[parentProject].sublists[oldName];
        let tasks = projects[parentProject].sublists[newName].tasks;
        for (let value of Object.values(tasks)) {
            value.parent = newName;
        }
        saveProjectsToLocal();
        getProjectsFromLocal();
    }

    const addProject = (projectObj, projectName) => {
        projects[projectName] = projectObj;
        saveProjectsToLocal();
        getProjectsFromLocal();
    }

    const deleteProject = (projectName) => {
        delete projects[projectName];
        saveProjectsToLocal();
        getProjectsFromLocal();
    }

    const updateProjectName = (oldProjectName, newProjectName) => {
        projects[newProjectName] = projects[oldProjectName];
        projects[newProjectName].projectName = newProjectName;
        delete projects[oldProjectName];
        let sublists = projects[newProjectName].sublists;
        for (let value of Object.values(sublists)) {
            value.parent = newProjectName;
            for (let task of Object.values(value.tasks)) {
                task.grandparent = newProjectName;
            }
        }
        saveProjectsToLocal();
        getProjectsFromLocal();
    }

    const getProjects = () => {
        return projects;
    }

    const setProjects = (projectsObj) => {
        projects = projectsObj;
        saveProjectsToLocal();
    }

    const saveProjectsToLocal = () => {
        const projects_serialized = JSON.stringify(projects);
        localStorage.setItem('projects', projects_serialized);
    }

    const getProjectsFromLocal = () => {
        const retrievedProjects = localStorage.getItem('projects');
        if (!retrievedProjects) {
            projects = {General: {projectName: 'General', sublists: {}}, 
            Today: {projectName: 'Today', sublists: {}}, 
            'This Week': {projectName: 'This Week', sublists: {}}};
        }
        else {
            projects = JSON.parse(retrievedProjects);
        }
    }

    return {
        addTask, 
        deleteTask,
        updateTask,
        addSublist,
        deleteSublist,
        updateSublistName,
        addProject, 
        deleteProject,
        updateProjectName,
        getProjects,
        setProjects,
        getProjectsFromLocal,
    }
})();

export default storage