const domOps = (() => {

    const createNewProjectForm = () => {
        let newProjectFormDiv = document.createElement('div');
        newProjectFormDiv.setAttribute('id', 'newProjectFormDiv');
        newProjectFormDiv.classList.add('project-tab-div');
        let newProjectForm = document.createElement('form');
        let newProjectNameField = document.createElement('input');
        newProjectNameField.setAttribute('id', 'newProjectNameField');
        newProjectNameField.setAttribute('type', 'text');
        newProjectNameField.setAttribute('name', 'newProjectName');
        newProjectNameField.setAttribute('placeholder', 'New Project');
        let buttonDiv = document.createElement('div');
        let createProjectBtn = document.createElement('button');
        createProjectBtn.setAttribute('id', 'confirmNewProjectBtn');
        createProjectBtn.innerHTML = '<i class="fas fa-check"></i>';
        createProjectBtn.classList.add('create-btn');
        let cancleProjectBtn = document.createElement('button');
        cancleProjectBtn.setAttribute('id', 'cancleNewProjectBtn');
        cancleProjectBtn.innerHTML = '<i class="fas fa-times"></i>';
        cancleProjectBtn.classList.add('cancle-btn');
        buttonDiv.appendChild(createProjectBtn);
        buttonDiv.appendChild(cancleProjectBtn);
        newProjectForm.appendChild(newProjectNameField);
        newProjectFormDiv.appendChild(newProjectForm);
        newProjectFormDiv.appendChild(buttonDiv);

        return [newProjectFormDiv, newProjectNameField, createProjectBtn, cancleProjectBtn];
    }

    const createNewTaskForm = () => {
        let newTaskFormDiv = document.createElement('div');
        newTaskFormDiv.classList.add('task-div');
        let newTaskForm = document.createElement('form');
        let newTaskNameField = document.createElement('input');
        newTaskNameField.setAttribute('type', 'text');
        newTaskNameField.setAttribute('name', 'newTaskName');
        newTaskNameField.setAttribute('placeholder', 'New Task');
        let newTaskDueDateField = document.createElement('input');
        newTaskDueDateField.setAttribute('type', 'date');
        newTaskDueDateField.setAttribute('name', 'newTaskDueDate');
        let buttonDiv = document.createElement('div');
        let confirmTaskBtn = document.createElement('button');
        confirmTaskBtn.innerHTML = '<i class="fas fa-check"></i>';
        confirmTaskBtn.classList.add('create-btn');
        let cancleTaskBtn = document.createElement('button');
        cancleTaskBtn.innerHTML = '<i class="fas fa-times"></i>';
        cancleTaskBtn.classList.add('cancle-btn');
        buttonDiv.appendChild(confirmTaskBtn);
        buttonDiv.appendChild(cancleTaskBtn);
        newTaskForm.appendChild(newTaskNameField);
        newTaskForm.appendChild(newTaskDueDateField);
        newTaskFormDiv.appendChild(newTaskForm);
        newTaskFormDiv.appendChild(buttonDiv);

        return [newTaskFormDiv, newTaskNameField, newTaskDueDateField, confirmTaskBtn, cancleTaskBtn];
    }

    const createNewProjectTab = (projectObj) => {
        let projectName = projectObj.projectName;
        const projectTabDiv = document.createElement('div');
            projectTabDiv.classList.add('project-tab-div');
            projectTabDiv.setAttribute('id', projectName);
            projectTabDiv.dataset.name = projectName;
            const projectTabName = document.createElement('h2');
            projectTabName.classList.add('project-tab-name');
            projectTabName.textContent = projectName;
            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('project-btn-container');
            const projectEditBtn = document.createElement('button');
            projectEditBtn.innerHTML = '<i class="fas fa-pen"></i>';
            projectEditBtn.dataset.project = projectName;
            projectEditBtn.classList.add('edit-delete-btn');
            const projectDeleteBtn = document.createElement('button');
            projectDeleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
            projectDeleteBtn.dataset.project = projectName;
            projectDeleteBtn.classList.add('edit-delete-btn');
            projectTabDiv.appendChild(projectTabName);
            buttonDiv.appendChild(projectEditBtn);
            buttonDiv.appendChild(projectDeleteBtn);
            projectTabDiv.appendChild(buttonDiv);

            return [projectTabDiv, projectTabName, projectEditBtn, projectDeleteBtn, buttonDiv];
    }

    const createSublist = (sublistObj) => {
        const sublistDiv = document.createElement('div');
        sublistDiv.classList.add('sublist-div');
        sublistDiv.dataset.parent = sublistObj.parent;
        const headerDiv = document.createElement('div');
        headerDiv.classList.add('sublist-header-div');
        const sublistTitle = document.createElement('h3');
        sublistTitle.textContent = sublistObj.sublistName;
        sublistTitle.classList.add('sublist-title');
        const buttonDiv = document.createElement('div');
        const sublistEditBtn = document.createElement('button');
        sublistEditBtn.innerHTML = '<i class="fas fa-pen"></i>';
        sublistEditBtn.classList.add('edit-delete-btn');
        sublistEditBtn.dataset.parent = sublistObj.parent;
        sublistEditBtn.dataset.name = sublistObj.sublistName;
        const sublistDeleteBtn = document.createElement('button');
        sublistDeleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        sublistDeleteBtn.classList.add('edit-delete-btn');
        sublistDeleteBtn.dataset.parent = sublistObj.parent;
        sublistDeleteBtn.dataset.name = sublistObj.sublistName;
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');
        const addTaskBtn = document.createElement('div');
        addTaskBtn.innerHTML = '<i class="fas fa-plus"></i> Add Task';
        addTaskBtn.classList.add('add-task-btn');
        addTaskBtn.dataset.parent = sublistObj.sublistName;
        addTaskBtn.dataset.grandparent = sublistObj.parent;


        headerDiv.appendChild(sublistTitle);
        buttonDiv.appendChild(sublistEditBtn);
        buttonDiv.appendChild(sublistDeleteBtn);
        headerDiv.appendChild(buttonDiv);
        sublistDiv.appendChild(headerDiv);
        sublistDiv.appendChild(taskContainer);
        sublistDiv.appendChild(addTaskBtn);
        
        return [sublistDiv, sublistTitle, taskContainer, addTaskBtn, sublistEditBtn, sublistDeleteBtn, headerDiv, buttonDiv];
    }

    const createAddSublistBtnContainer = (parentProjectName) => {
        const addSublistBtnContianer = document.createElement('div');
        addSublistBtnContianer.classList.add('sublist-div');
        const addSublistBtn = createAddSublistBtn(parentProjectName);
        addSublistBtnContianer.appendChild(addSublistBtn);


        return [addSublistBtnContianer, addSublistBtn];
    }

    const createAddSublistBtn = (parentProjectName) => {
        const addSublistBtn = document.createElement('div');
        addSublistBtn.innerHTML = '<i class="fas fa-plus fa-xs"></i> New List';
        addSublistBtn.setAttribute('id', 'addSublistBtn');
        addSublistBtn.classList.add('add-sublist-btn');
        addSublistBtn.dataset.parentProjectName = parentProjectName;

        return addSublistBtn;
    }

    const createNewSublistForm = (parentProjectName) => {
        let newSublistFormDiv = document.createElement('div');
        newSublistFormDiv.classList.add('new-sublist-form-div');
        let newSublistForm = document.createElement('form');
        let newSublistNameField = document.createElement('input');
        newSublistNameField.setAttribute('type', 'text');
        newSublistNameField.setAttribute('placeholder', 'New Sublist');
        let buttonDiv = document.createElement('div');
        let createSublistBtn = document.createElement('button');
        createSublistBtn.innerHTML = '<i class="fas fa-check"></i>';
        createSublistBtn.classList.add('create-btn');
        createSublistBtn.dataset.parentProjectName = parentProjectName;
        let cancleSublistBtn = document.createElement('button');
        cancleSublistBtn.innerHTML = '<i class="fas fa-times"></i>';
        cancleSublistBtn.classList.add('cancle-btn');
        buttonDiv.appendChild(createSublistBtn);
        buttonDiv.appendChild(cancleSublistBtn);
        newSublistForm.appendChild(newSublistNameField);
        newSublistFormDiv.appendChild(newSublistForm);
        newSublistFormDiv.appendChild(buttonDiv);

        return [newSublistFormDiv, newSublistNameField, createSublistBtn, cancleSublistBtn];
    }

    const createTask = (taskObj) => {
        let task = taskObj;
        let taskName = task.taskName;
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-div');
        taskDiv.dataset.parent = taskObj.parent;
        taskDiv.dataset.grandparent = taskObj.grandparent;
        const taskCheckbox = document.createElement('div');
        taskCheckbox.classList.add('checkbox');
        const taskCheckboxInner = document.createElement('div');
        taskCheckboxInner.classList.add('checkbox-inner');
        taskCheckbox.appendChild(taskCheckboxInner);
        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');
        const taskTitle = document.createElement('h4');
        taskTitle.textContent = taskName;
        taskTitle.classList.add('task-title');
        const taskDueDate = document.createElement('p');
        taskDueDate.textContent = task.taskDueDate;
        taskDueDate.classList.add('task-due-date');
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container');
        const taskEditBtn = document.createElement('button');
        taskEditBtn.value = taskName;
        taskEditBtn.innerHTML = '<i class="fas fa-pen"></i>';
        taskEditBtn.classList.add('edit-delete-btn');

        taskDiv.appendChild(taskCheckbox);
        textContainer.appendChild(taskTitle);
        textContainer.appendChild(taskDueDate);
        taskDiv.appendChild(textContainer);
        btnContainer.appendChild(taskEditBtn);
        taskDiv.appendChild(btnContainer);

        return [taskDiv, taskTitle, taskDueDate, taskEditBtn, btnContainer, taskCheckboxInner];
    }

    const createDateViewTask = (taskObj) => {
        const taskName = taskObj.taskName;
        const dueDate = taskObj.taskDueDate;
        const parent = taskObj.parent;
        const grandparent = taskObj.grandparent;
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('date-view-task');
        const taskCheckbox = document.createElement('div');
        taskCheckbox.classList.add('checkbox');
        const taskCheckboxInner = document.createElement('div');
        taskCheckboxInner.classList.add('checkbox-inner');
        taskCheckboxInner.dataset.name = taskName;
        taskCheckboxInner.dataset.parent = parent;
        taskCheckboxInner.dataset.grandparent = grandparent;
        taskCheckbox.appendChild(taskCheckboxInner);
        const taskTitle = document.createElement('h4');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = `${taskName} (${grandparent}, ${parent})`;
        const taskDueDate = document.createElement('h5');
        taskDueDate.classList.add('task-title');
        taskDueDate.textContent = `Due: ${dueDate}`;

        taskDiv.appendChild(taskCheckbox);
        taskDiv.appendChild(taskTitle);
        taskDiv.appendChild(taskDueDate);

        return [taskDiv, taskCheckboxInner]
    }

    const createEditProjectForm = (currentName) => {
        const editProjectFormDiv = document.createElement('div');
        const nameField = document.createElement('input');
        nameField.setAttribute('type', 'text');
        nameField.setAttribute('placeholder', currentName);
        const buttonDiv = document.createElement('div');
        const confirmChangeBtn = document.createElement('button');
        confirmChangeBtn.innerHTML = '<i class="fas fa-check"></i>';
        const cancleChangeBtn = document.createElement('button');
        cancleChangeBtn.innerHTML = '<i class="fas fa-times"></i>';
        buttonDiv.appendChild(confirmChangeBtn);
        buttonDiv.appendChild(cancleChangeBtn);

        editProjectFormDiv.appendChild(nameField);
        editProjectFormDiv.appendChild(buttonDiv);

        return  [editProjectFormDiv, nameField, confirmChangeBtn, cancleChangeBtn];
    }

    const createEditSublistForm = (currentName) => {
        const editSublistFormDiv = document.createElement('div');
        const nameField = document.createElement('input');
        nameField.setAttribute('type', 'text');
        nameField.setAttribute('placeholder', currentName);
        const buttonDiv = document.createElement('div');
        const confirmBtn = document.createElement('button');
        const cancleBtn = document.createElement('button');
        confirmBtn.innerHTML = '<i class="fas fa-check"></i>';
        cancleBtn.innerHTML = '<i class="fas fa-times"></i>';
        buttonDiv.appendChild(confirmBtn); 
        buttonDiv.appendChild(cancleBtn); 

        editSublistFormDiv.appendChild(nameField);
        editSublistFormDiv.appendChild(buttonDiv);

        return [editSublistFormDiv, nameField, confirmBtn, cancleBtn];
    }

    const createEditTaskForm = (taskName, taskDueDate) => {
        const editTaskFormDiv = document.createElement('div');
        const nameField = document.createElement('input');
        nameField.setAttribute('type', 'text');
        nameField.setAttribute('placeholder', taskName);
        const dueDate = document.createElement('input');
        dueDate.setAttribute('type', 'date');
        dueDate.setAttribute('value', taskDueDate);
        const buttonDiv = document.createElement('div');
        const confirmBtn = document.createElement('button');
        confirmBtn.innerHTML = '<i class="fas fa-check"></i>';
        const cancelBtn = document.createElement('button');
        cancelBtn.innerHTML = '<i class="fas fa-times"></i>';

        editTaskFormDiv.appendChild(nameField);
        editTaskFormDiv.appendChild(dueDate);
        buttonDiv.appendChild(confirmBtn);
        buttonDiv.appendChild(cancelBtn);
        editTaskFormDiv.appendChild(buttonDiv);

        return [editTaskFormDiv, nameField, dueDate, confirmBtn, cancelBtn];
    }

    return {
        createNewProjectForm,
        createEditProjectForm,
        createNewProjectTab,
        createNewSublistForm,
        createEditSublistForm,
        createSublist,
        createAddSublistBtnContainer,
        createTask,
        createNewTaskForm,
        createEditTaskForm,
        createDateViewTask
    }

})();

export default domOps