import { updateDisplayForUser } from "./DOM_manipulation";
import { setInitialUserBox } from "./DOM_manipulation";
import defaultImgSrc from "./imgs/defaultImg.png"
import Datepicker from '/node_modules/vanillajs-datepicker/js/Datepicker.js';
import 'vanillajs-datepicker/css/datepicker.css';


export default function checkUserAuthentication() {
  fetch('/check_authentication')
    .then(response => response.json())
    .then(data => {
      if (data.authenticated) {
          const username = data.username;
          updateDisplayForUser(username)
      } else {
        setInitialUserBox()
      }
    })
    .catch(error => {
      console.error('Error checking authentication:', error);
    });
};

export function logoutUser(){
    fetch('/logout')
        .then(() => {
            checkUserAuthentication();
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
}

export function addTask(taskData) {
  fetch('/addTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  })
  .catch(error => {
    console.error('Error adding task:', error);
  });
}

export class Task{
  constructor(name, description){
    this.name = name;
    this.description = description;
  }
}


export async function getUserTasks(){
  try {
    const response = await fetch('/user_tasks');
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

export async function displayTasksData() {
  try {
    const tasksData = await getUserTasks();
    const main_container = document.querySelector('.main')
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('taskContainer');
    for (const key in tasksData) {
      if (tasksData.hasOwnProperty(key)) {
        const value = tasksData[key];
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('taskDiv');
        const outerP = document.querySelector('.d-infline-flex') || document.createElement('p');
        outerP.classList.add('d-inline-flex');
        outerP.classList.add('gap-1');
        const taskDescriptionOuterDiv = document.createElement('div');
        taskDescriptionOuterDiv.classList.add('collapse');
        taskDescriptionOuterDiv.id = `${key}TaskDescription`
        const taskDescriptionDiv = document.createElement('div');
        taskDescriptionDiv.classList.add('card');
        taskDescriptionDiv.classList.add('card-body');
        taskDescriptionDiv.textContent = value['taskDescription']
        taskDescriptionOuterDiv.appendChild(taskDescriptionDiv)
        const taskMain = document.createElement('div');
        taskMain.classList.add('taskMain');
        const taskName = document.createElement('button');
        taskName.classList.add('taskName')
        taskName.type = 'button';
        taskName.id = `${key}TaskName`
        taskName.setAttribute('data-bs-toggle', 'collapse');
        taskName.setAttribute('data-bs-target', `#${key}TaskDescription`)
        taskName.ariaExpanded = "false";
        taskName.textContent = value['taskName'];

        
        const taskDueDate = document.createElement('input');
        taskDueDate.classList.add('taskDueDate')
        taskDueDate.type = 'text'
        taskDueDate.id = `${key}`
        taskDueDate.addEventListener('change', function() {
          value['dueDate'] = this.value;
        });
        taskDueDate.addEventListener('click', function(){
          const datepicker = new Datepicker(taskDueDate, {
            dataDate: new Date()})

          const taskCollapse = document.querySelector(`#${this.id}TaskDescription`)
          taskCollapse.classList.remove('show');
          }); 
        

        taskName.addEventListener('click', function() {
          const target = this.getAttribute('data-bs-target');
          const allCollapse = document.querySelectorAll('.collapse');
          allCollapse.forEach(collapse => {
              if (collapse.id !== target) {
                  collapse.classList.remove('show');
              }
          });
      });

        taskMain.appendChild(taskName);
        taskMain.appendChild(taskDueDate);
        outerP.appendChild(taskMain);
        taskDiv.id = `Task-${key}`;
        taskDiv.appendChild(outerP);
        taskDiv.appendChild(taskDescriptionOuterDiv);
        taskName.appendChild
        taskContainer.appendChild(taskDiv);
      }
    }

    if (taskContainer.childElementCount == 0){
      const defaultDiv = document.createElement('div');
      defaultDiv.style.position = 'absolute';

      defaultDiv.style.cssText = "display: flex; flex-direction: column; align-items:center; position: absolute; left: 0; right: 0; top: 0; bottom: 30%; margin: auto; width:400px; height: 200px;"
      const defaultImg = document.createElement('img');
      defaultImg.src = defaultImgSrc;
      defaultImg.style.width = '294px';
      const defaultP = document.createElement('p');
      defaultP.innerHTML = 'What do you have to do today?</br> Tasks added here will be automatically marked as due today'
      defaultP.style.marginLeft = '5%'
      defaultDiv.appendChild(defaultImg);
      defaultDiv.appendChild(defaultP);
      main_container.appendChild(defaultDiv);
      return
  }
  main_container.appendChild(taskContainer);

  } catch (error) {
    console.error('Error:', error);
  }
}
