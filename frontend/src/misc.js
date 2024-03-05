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
            location.reload()
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
  constructor(name, description, dueDate){
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
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


export async function addProject(projectData){
  fetch('/addProject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  })
  .catch(error => {
    console.error('Error adding task:', error);
  });
};
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
        taskDescriptionOuterDiv.id = `TaskDescription${key}`
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
        taskName.id = `TaskName${key}`
        taskName.setAttribute('data-bs-toggle', 'collapse');
        taskName.setAttribute('data-bs-target', `#TaskDescription${key}`)
        taskName.ariaExpanded = "false";
        taskName.textContent = value['taskName'];
        if (document.getElementById('saveButton') === null){
          const saveButton = document.createElement('button');
          saveButton.textContent = 'SAVE';
          saveButton.addEventListener('click', (event) => saveTaskUpdates(event.currentTarget, tasksData))
          saveButton.id = 'saveButton';
          saveButton.classList.add('hide');
          taskMain.appendChild(saveButton);
        }
        

        const taskDueDate = document.createElement('input');
        taskDueDate.classList.add('taskDueDate')
        taskDueDate.type = 'text'
        // taskDueDate.id = `${key}`
        taskDueDate.value = value['taskDueDate'];

        function saveTaskUpdates(button, tasks){
          button.classList.add('hide')
          const currentTasks = tasks;
          fetch('/saveTaskUpdates', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentTasks),
          })
        }

        function pickImage(value){
          return value['isCompleted'] ? ('data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="22" fill="#327FE9" class="bi bi-check-circle-fill" viewBox="0 0 16 16">' +
          '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>' +
          '</svg>')) : ('data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="22" fill="#327FE9" class="bi bi-check-circle" viewBox="0 0 16 16">'+
          '<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>'+
          '<path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>'+
          '</svg>'))
        }

        const taskCompletionImgDiv = document.createElement('div');
        taskCompletionImgDiv.classList.add('taskImg');
        const taskCompletionImg = document.createElement('img');
        taskCompletionImg.src = pickImage(value)
        taskCompletionImg.addEventListener('click', function(){
          value['isCompleted'] = !value['isCompleted'];
          this.src = pickImage(value)
          const saveButton = document.getElementById('saveButton');
          saveButton.classList.remove('hide');
        })
        taskCompletionImgDiv.appendChild(taskCompletionImg);
        taskDueDate.addEventListener('change', function() {
          value['dueDate'] = this.value;
        });

        taskDueDate.addEventListener('click', function(){
          const datepicker = new Datepicker(taskDueDate, {
            dataDate: taskDueDate.value
          });
          const datepickerElement = document.querySelector('.view-switch');
          datepickerElement.addEventListener('change', () =>{console.log('yo')})
          const taskCollapse = document.querySelector(`#TaskDescription${this.id}`)
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
        taskMain.appendChild(taskCompletionImgDiv);
        outerP.appendChild(taskMain);
        taskDiv.id = `Task-${key}`;
        taskDiv.appendChild(outerP);
        taskDiv.appendChild(taskDescriptionOuterDiv);
        taskName.appendChild
        taskContainer.appendChild(taskDiv);
      }
    }

    const mainTodayText = document.createElement('div');
    mainTodayText.textContent = 'Today';
    mainTodayText.style.cssText = "font-size: 25px; font-weight: 700; margin-bottom: 50px;"
    main_container.appendChild(mainTodayText);

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
