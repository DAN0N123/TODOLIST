import {setInitialUserBox} from './DOM_manipulation.js';
import checkUserAuthentication from './misc.js';
import { getUserTasks } from './misc.js';

window.onload = function() {
    checkUserAuthentication(setInitialUserBox);
};