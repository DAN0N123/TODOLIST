import { handleUserCreation, handleLoginFormSubmit } from "../../backend/sendUserData";
import { logoutUser } from "./misc";
import { addTask } from "./misc";
import { displayTasksData } from "./misc";
import { addProject } from "./misc";
import Datepicker from '/node_modules/vanillajs-datepicker/js/Datepicker.js';
import 'vanillajs-datepicker/css/datepicker.css';


export default function createUserCreationForm(){
    const main_container = document.querySelector('.main');
    main_container.innerHTML = '';

    const userForm = document.createElement('form');
    userForm.setAttribute('id', 'userForm');
    const divUsername = document.createElement('div');
    divUsername.classList.add('mb-3');
    divUsername.classList.add('row');
    const labelForUsername = document.createElement('label');
    labelForUsername.setAttribute('for', 'inputUsername');
    labelForUsername.classList.add('col-sm-2');
    labelForUsername.classList.add('col-form-label');
    labelForUsername.textContent = 'Username'
    const innerdivUsername = document.createElement('div');
    innerdivUsername.classList.add('col-sm-10');
    const input0 = document.createElement('input');
    input0.setAttribute('type', 'text');
    input0.setAttribute('id', 'inputUsername');
    input0.classList.add('form-control');
    divUsername.appendChild(labelForUsername);
    innerdivUsername.appendChild(input0);
    divUsername.appendChild(innerdivUsername);

    const divEmail = document.createElement('div');
    divEmail.classList.add('mb-3');
    divEmail.classList.add('row');
    const labelForEmail = document.createElement('label');
    labelForEmail.setAttribute('for', 'inputEmail');
    labelForEmail.classList.add('col-sm-2');
    labelForEmail.classList.add('col-form-label');
    labelForEmail.textContent = 'Email'
    const innerdivEmail = document.createElement('div');
    innerdivEmail.classList.add('col-sm-10');
    const input1 = document.createElement('input');
    input1.setAttribute('type', 'text');
    input1.setAttribute('id', 'inputEmail');
    input1.setAttribute('placeholder', 'email@example.com')
    input1.classList.add('form-control');
    divEmail.appendChild(labelForEmail);
    innerdivEmail.appendChild(input1);
    divEmail.appendChild(innerdivEmail);

    const divPassword = document.createElement('div');
    divPassword.classList.add('mb-3');
    divPassword.classList.add('row');
    const labelForPassword = document.createElement('label');
    labelForPassword.setAttribute('for', 'inputPassword');
    labelForPassword.classList.add('col-sm-2');
    labelForPassword.classList.add('col-form-label');
    labelForPassword.textContent = 'Password'
    const innerdivPassword = document.createElement('div');
    innerdivPassword.classList.add('col-sm-10');
    const input2 = document.createElement('input');
    input2.setAttribute('type', 'password');
    input2.setAttribute('id', 'inputPassword');
    input2.classList.add('form-control');
    divPassword.appendChild(labelForPassword);
    innerdivPassword.appendChild(input2);
    divPassword.appendChild(innerdivPassword);
    
    const submit_button = document.createElement('button');
    submit_button.setAttribute('type', 'submit');
    submit_button.textContent = 'Submit';

    userForm.appendChild(divUsername);
    userForm.appendChild(divEmail);
    userForm.appendChild(divPassword);
    userForm.appendChild(submit_button);

    main_container.appendChild(userForm);

    // Add event listener for form submission
    userForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        await handleUserCreation();
    });
};




export function createLoginForm(){
    const main_container = document.querySelector('.main');
    main_container.innerHTML = '';
    const loginForm = document.createElement('form');
    loginForm.setAttribute('id', 'loginForm');
    const divUsername = document.createElement('div');
    divUsername.classList.add('mb-3');
    divUsername.classList.add('row');
    const labelForUsername = document.createElement('label');
    labelForUsername.setAttribute('for', 'inputUsername');
    labelForUsername.classList.add('col-sm-2');
    labelForUsername.classList.add('col-form-label');
    labelForUsername.textContent = 'Username'
    const innerdivUsername = document.createElement('div');
    innerdivUsername.classList.add('col-sm-10');
    const input0 = document.createElement('input');
    input0.setAttribute('type', 'text');
    input0.setAttribute('id', 'inputUsername');
    input0.classList.add('form-control');
    divUsername.appendChild(labelForUsername);
    innerdivUsername.appendChild(input0);
    divUsername.appendChild(innerdivUsername);

    const divPassword = document.createElement('div');
    divPassword.classList.add('mb-3');
    divPassword.classList.add('row');
    const labelForPassword = document.createElement('label');
    labelForPassword.setAttribute('for', 'inputPassword');
    labelForPassword.classList.add('col-sm-2');
    labelForPassword.classList.add('col-form-label');
    labelForPassword.textContent = 'Password'
    const innerdivPassword = document.createElement('div');
    innerdivPassword.classList.add('col-sm-10');
    const input2 = document.createElement('input');
    input2.setAttribute('type', 'password');
    input2.setAttribute('id', 'inputPassword');
    input2.classList.add('form-control');
    divPassword.appendChild(labelForPassword);
    innerdivPassword.appendChild(input2);
    divPassword.appendChild(innerdivPassword);
    const submit_button = document.createElement('button');
    submit_button.setAttribute('type', 'submit');
    submit_button.textContent = 'Submit';

    loginForm.appendChild(divUsername);
    loginForm.appendChild(divPassword);
    loginForm.appendChild(submit_button);

    main_container.appendChild(loginForm);

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        await handleLoginFormSubmit();
    });
};

export function updateDisplayForUser(username){
    const dialogDiv = document.querySelector('div .dialog');
    dialogDiv.innerHTML = '<dialog id="rawCalendar">' +
                            '<form id="calendarForm">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="25" fill="#327FE9" class="bi bi-x" viewBox="0 0 16 16">' +
                                    '<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>' +
                                '</svg>' +
                                '<input type="text" id="dateInput" placeholder="Due Date" required="true" autocomplete="off"></input>' +
                                '<br>' +
                                '<button type="submit" class="submitButton">Filter</button>' +
                            '</form>' +
                        '</dialog>';
    const main_container = document.querySelector('.main');
    const sidebar = document.querySelector('.sidebar');
    const userBox = document.querySelector('.userBox');
    userBox.innerHTML = '';
    const usernameDiv = document.createElement('div');
    usernameDiv.classList.add('btn-group');
    usernameDiv.classList.add('dropend');
    const usernameButton = document.createElement('button');
    usernameButton.classList.add('btn');
    usernameButton.classList.add('btn-secondary');
    usernameButton.classList.add('dropdown-toggle');
    usernameButton.setAttribute('type', 'button');
    usernameButton.setAttribute('data-bs-toggle', 'dropdown');
    usernameButton.setAttribute('aria-expanded', 'false');
    usernameButton.textContent = username;
    usernameButton.style.zIndex = 9999;
    usernameButton.addEventListener('mouseover', () =>{
        const ul = document.querySelector('.dropdown-menu');
        ul.classList.add('show')
    })
    usernameButton.addEventListener('mouseleave', () =>{
        const ul = document.querySelector('.dropdown-menu');
        ul.classList.remove('show')})

    const usernameDropdownUl = document.createElement('ul');
    usernameDropdownUl.style.zIndex = 9999;
    usernameDropdownUl.classList.add('dropdown-menu');
    usernameDropdownUl.addEventListener('mouseleave', () =>{
        const ul = document.querySelector('.dropdown-menu');
        ul.classList.remove('show')})
    usernameDropdownUl.addEventListener('mouseover', () =>{
        const ul = document.querySelector('.dropdown-menu');
        ul.classList.add('show')})
    const logoutOptionLi = document.createElement('li');
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.classList.add('userDropdownButton')
    logoutButton.addEventListener('click', logoutUser)
    logoutOptionLi.appendChild(logoutButton);
    usernameDropdownUl.appendChild(logoutOptionLi);
    usernameDiv.appendChild(usernameButton);
    usernameDiv.appendChild(usernameDropdownUl);
    userBox.appendChild(usernameDiv);
    userBox.style.marginBottom = '40%'

    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => location.reload())
    logo.style.cursor = 'pointer';
    
    // const testButton = document.createElement('button');
    // testButton.id = 'testButton';
    // testButton.addEventListener('click', () => )
    // sidebar.appendChild(testButton);
    
    

    const addTaskDiv = document.createElement('div');
    addTaskDiv.classList.add('addStuffDiv')
    const addTaskImg = document.createElement('img');
    addTaskImg.classList.add('taskSidebarImg');
    addTaskImg.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#327FE9" class="bi bi-plus-circle" viewBox="0 0 16 16">' +
        '<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>' +
        '<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>' +
        '</svg>');

    addTaskImg.addEventListener('mouseenter', (event) => {
        event.currentTarget.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#327FE9" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">' +
            '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>' +
            '</svg>');
    });
    

    const addTaskText = document.createElement('div')
    addTaskText.textContent = 'Add new task';
    addTaskText.style.fontSize = '19px'
    addTaskDiv.appendChild(addTaskText);
    addTaskDiv.appendChild(addTaskImg);
    
    const addProjectDiv = document.createElement('div');
    addProjectDiv.classList.add('addStuffDiv');
    const addProjectImg = document.createElement('img');
    addProjectImg.classList.add('projectSidebarImg');
    addProjectImg.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#327FE9" class="bi bi-plus-square" viewBox="0 0 16 16">' +
        '<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>' +
        '<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>' +
        '</svg>');

    addProjectImg.addEventListener('mouseenter', (event) => {
        event.currentTarget.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#327FE9" class="bi bi-plus-square-fill" viewBox="0 0 16 16">' +
            '<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>' +
            '</svg>');
    });
    const addProjectText = document.createElement('div');
    addProjectText.textContent = 'My Projects';
    addProjectText.style.fontSize = '19px'
    addProjectDiv.appendChild(addProjectText);
    addProjectDiv.appendChild(addProjectImg);
    addProjectDiv.style.marginTop = '15%'

    const usersSidebar = document.createElement('div');
    usersSidebar.classList.add('usersSidebar');
    usersSidebar.appendChild(addProjectDiv);
    usersSidebar.appendChild(addTaskDiv);
    userBox.appendChild(usersSidebar);
    
    

    
    
    
    


    sidebar.addEventListener('click', function(event) {
        if (event.target.classList.contains('taskSidebarImg')) {
            const taskDialog = setTaskDialog();
        };
        if (event.target.classList.contains('projectSidebarImg')) {
            const projectDialog = setProjectDialog();
        }
    });

    sidebar.addEventListener('mouseover', function(event) {
        const task = document.querySelector('.taskSidebarImg');
        const project = document.querySelector('.projectSidebarImg');
        if (task) {
            task.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#327FE9" class="bi bi-plus-circle" viewBox="0 0 16 16">' +
                '<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>' +
                '<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>' +
                '</svg>');
        }
        if (project) {
            project.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#327FE9" class="bi bi-plus-square" viewBox="0 0 16 16">' +
                '<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>' +
                '<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>' +
                '</svg>');
        }
    });
    
    
    // display tasks
    displayTasksData()
}

export function setInitialUserBox(){
    const userBox = document.querySelector('.userBox');
    userBox.innerHTML = '';

    const login_button = document.createElement('button');
    login_button.textContent = 'Login';
    login_button.addEventListener('click', () => createLoginForm());
    userBox.appendChild(login_button);
    const noAccount = document.createElement('div');
    noAccount.classList.add('noAccount');

    const user_button = document.createElement('button');
    user_button.textContent = 'Register';
    user_button.addEventListener('click', () => createUserCreationForm());
    const noAccountP = document.createElement('p');
    noAccountP.textContent = "Don't have an account?";
    noAccount.appendChild(noAccountP);
    noAccount.appendChild(user_button)
    userBox.appendChild(noAccount)
};


export function setProjectDialog(){
    const projectDialog = document.createElement('dialog');
    const sidebar = document.querySelector('.sidebar')
    projectDialog.setAttribute('id', 'projectDialog');
    projectDialog.innerHTML = '<form id="projectForm">'+
    '<input type="text" id="projectName" name="projectName" required placeholder="Project name" autocomplete="off">'+
    '<br>'+
    '<svg xmlns="http://www.w3.org/2000/svg" width="25" fill="#327FE9" class="bi bi-x" viewBox="0 0 16 16">'+
    '<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>'+
    '</svg>'+
    '<label for="taskSelection">Select tasks for project:</label>'+
    '<multi-checkbox id="taskSelection" separator="," value="">'+
    '<ul id="multiCheckbox" slot="check-values">'+
    '</ul>'+
    '</multi-checkbox>'+
    '</br>'+
    '<button type="submit" class="submitButton">Create</button>'+
    '</form>'
    sidebar.appendChild(projectDialog);
    const exitButton = projectDialog.querySelector('svg');
    exitButton.addEventListener('click', () => {
        const projectDialog = document.getElementById('projectDialog');
        projectDialog.remove()
    })
    const task_container = document.querySelector('.taskContainer');
    const multiCheckbox = document.getElementById('multiCheckbox');
    for(const child of task_container.children){
        if(child.classList.contains('taskDiv')){
            const taskName = child.querySelector('.taskName').textContent;
            const li = document.createElement('li');
            li.textContent = taskName;
            multiCheckbox.appendChild(li)
        }
    }
    if (projectDialog) {
        projectDialog.showModal();

        const projectForm = document.getElementById('projectForm');
        projectForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const projectName = document.getElementById('projectName').value;
        const taskSelection = document.getElementById('taskSelection').value.split(',')
        const projectData = {'name' : projectName, 'tasks' : taskSelection};
        addProject(projectData)
        projectDialog.remove();
        location.reload();
        });
    }
    return projectDialog
}


export function setTaskDialog(){
    const taskDialog = document.createElement('dialog');
    const sidebar = document.querySelector('.sidebar');
    taskDialog.setAttribute('id', 'taskDialog');
    taskDialog.innerHTML = '<form id="taskForm">'+
    '<input type="text" id="taskName" name="taskName" required placeholder="Task name" autocomplete="off">'+
    '<svg xmlns="http://www.w3.org/2000/svg" width="25" fill="#327FE9" class="bi bi-x" viewBox="0 0 16 16">'+
    '<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>'+
    '</svg>'+
    '<br>'+
    '<label for="taskDescription">Description:</label>'+
    '<textarea id="taskDescription" name="taskDescription"></textarea>'+
    '<br>'+
    '<input type="text" id="taskDueDate" placeholder="Due Date" required="true" autocomplete="off"></input>'+
    '</br>'+
    '<button type="submit" class="submitButton">Create</button>'+
    '</form>'
    
    sidebar.appendChild(taskDialog);
    const exitButton = taskDialog.querySelector('svg');
    exitButton.addEventListener('click', () => {
        const taskDialog = document.getElementById('taskDialog');
        taskDialog.remove()
    })
    if (taskDialog) {
        taskDialog.showModal();
        const taskDueDateInput = taskDialog.querySelector("#taskDueDate")
        taskDueDateInput.addEventListener('click', function(){
        const datepicker = new Datepicker(taskDueDateInput, { 
            // options
        })});

        const taskForm = document.getElementById('taskForm');
        taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskName = document.getElementById('taskName').value;
        const taskDescription = document.getElementById('taskDescription').value;
        const taskDueDate = document.getElementById('taskDueDate').value;
        // const myTask = new Task(taskName, taskDescription)
        const isCompleted = false;
        const taskData = { taskName, taskDescription, taskDueDate, isCompleted};
        addTask(taskData);
        taskDialog.remove();
        location.reload();
        });
    return taskDialog
}};