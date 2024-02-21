import { handleUserCreation, handleLoginFormSubmit} from "../../backend/sendUserData";
import { logoutUser } from "./misc";
import add_task_svg from "./imgs/add_task.svg"
import add_project_svg from "./imgs/add_project.svg"

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
    const addTaskImg = document.createElement('img');
    addTaskImg.src = add_task_svg;
    const addProjectImg = document.createElement('img');
    addProjectImg.src = add_project_svg;
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