import {createUserCreationForm, createLoginForm} from './DOM_manipulation.js';

function setUserBox(username){
    const usernameP = document.createElement('p');
    usernameP.classList.add('usernameP')
    const userBox = document.querySelector('.userBox');
    userBox.innerHTML = '';
    usernameP.textContent = username;
    userBox.appendChild('usernameP');
}

function setInitialUserBox(){
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
}

setInitialUserBox()