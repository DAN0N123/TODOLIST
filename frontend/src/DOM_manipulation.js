import { handleUserCreation, handleLoginFormSubmit} from "../../backend/sendUserData";
import { logoutUser } from "./misc";
import add_task_svg from "./imgs/add_task.svg"
import add_project_svg from "./imgs/add_project.svg"
import defaultImgSrc from "./imgs/defaultImg.png"
const yo = true;
export default yo;
// module.exports = createUserForm;
export function createUserCreationForm(){
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
    const usernameDropdownUl = document.createElement('ul');
    usernameDropdownUl.classList.add('dropdown-menu');
    const logoutOptionLi = document.createElement('li');
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.setAttribute('id', 'logoutButton');
    logoutButton.addEventListener('click', logoutUser)
    logoutOptionLi.appendChild(logoutButton);
    usernameDropdownUl.appendChild(logoutOptionLi);
    usernameDiv.appendChild(usernameButton);
    usernameDiv.appendChild(usernameDropdownUl);
    userBox.appendChild(usernameDiv);

    const sidebar = document.querySelector('.sidebar');

    const addTaskDiv = document.createElement('div');
    addTaskDiv.classList.add('addStuffDiv')
    const addTaskImg = document.createElement('div');
    addTaskImg.classList.add('sidebarImg')
    addTaskImg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#327FE9" class="bi bi-plus-circle" viewBox="0 0 16 16">'+
    '<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>'+
    '<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>'+
    '</svg>'
    addTaskImg.addEventListener('mouseenter', (event) => event.currentTarget.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#327FE9" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">'+
    '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>'+
    '</svg>')
    addTaskImg.addEventListener('mouseleave', (event) => event.currentTarget.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#327FE9" class="bi bi-plus-circle" viewBox="0 0 16 16">'+
    '<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>'+
    '<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>'+
    '</svg>')
    const addTaskText = document.createElement('div')
    addTaskText.textContent = 'Add new task';
    addTaskText.style.fontSize = '19px'
    addTaskDiv.appendChild(addTaskText);
    addTaskDiv.appendChild(addTaskImg);
    
    const addProjectDiv = document.createElement('div');
    addProjectDiv.classList.add('addStuffDiv');
    const addProjectImg = document.createElement('div');
    addProjectImg.classList.add('sidebarImg');
    addProjectImg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#327FE9" class="bi bi-plus-square" viewBox="0 0 16 16">'+
    '<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>'+
    '<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>' +
    '</svg>'
    addProjectImg.addEventListener('mouseenter', (event) => event.currentTarget.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#327FE9" class="bi bi-plus-square-fill" viewBox="0 0 16 16">'+
    '<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>'+
    '</svg>' )
    addProjectImg.addEventListener('mouseleave', (event) => event.currentTarget.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#327FE9" class="bi bi-plus-square" viewBox="0 0 16 16">'+
    '<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>'+
    '<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>' +
    '</svg>')
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

    const main_container = document.querySelector('.main');

    
    
    const mainToday = document.createElement('div');
    mainToday.classList.add('mainToday');
    const mainTodayText = document.createElement('div');
    mainTodayText.textContent = 'Today';
    mainTodayText.style.cssText = "font-size: 25px; font-weight: 700;"
    // const mainTodayAddTask = document.createElement('div');
    // const mainTodayAddTaskButton = document.createElement('button');
    
    mainToday.appendChild(mainTodayText);
    main_container.appendChild(mainToday);
    if (mainToday.childElementCount < 3){
        const defaultDiv = document.createElement('div');
        defaultDiv.style.position = 'absolute';

        defaultDiv.style.cssText = "display: flex; flex-direction: column; align-items:center; position: absolute; left: 0; right: 0; top: 0; bottom: 30%; margin: auto; width:400px; height: 200px;"
        const defaultImg = document.createElement('img');
        defaultImg.src = defaultImgSrc;
        defaultImg.style.width = '294px';
        const defaultP = document.createElement('p');
        defaultP.innerHTML = 'What do you have to do today?</br> Tasks added here will be automatically marked due until today'
        defaultP.style.marginLeft = '5%'
        defaultDiv.appendChild(defaultImg);
        defaultDiv.appendChild(defaultP);
        main_container.appendChild(defaultDiv);
    }
    

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