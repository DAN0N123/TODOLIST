import dateFns from 'date-fns';
import Todo from '../../backend/classes.js';
import createUser from '../../backend/database-operations.js';
import createUserForm from './DOM_manipulation.js';
import sendUserData from '../../backend/createUser.js';

const main_container = document.querySelector('.main');
const test_button = document.createElement('button');
test_button.textContent = 'TEST';
test_button.addEventListener('click', () => createUserForm());
main_container.appendChild(test_button)
