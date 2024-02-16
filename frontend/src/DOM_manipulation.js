function createUserForm(){
    const main_container = document.querySelector('.main');
    const userForm = document.createElement('form');
    userForm.setAttribute('id', 'userForm');
    const username_input = document.createElement('input');
    username_input.setAttribute('type', 'text');
    username_input.setAttribute('id', 'username');
    username_input.setAttribute('name', 'username');
    username_input.setAttribute('required');
    const email_input = document.createElement('input');
    email_input.setAttribute('type', 'email');
    email_input.setAttribute('id', 'email');
    email_input.setAttribute('name', 'email');
    const password_input = document.createElement('input');
    password_input.setAttribute('type', 'password');
    password_input.setAttribute('id', 'password');
    password_input.setAttribute('name', 'password');
    const submit_button = document.createElement('button');
    submit_button.setAttribute('type', 'submit');
}

export default createUserForm