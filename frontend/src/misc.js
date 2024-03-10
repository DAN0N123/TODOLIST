import { updateDisplayForUser } from "./DOM_manipulation";
import { setInitialUserBox } from "./DOM_manipulation";
import defaultImgSrc from "./imgs/defaultImg.png"
import Datepicker from '/node_modules/vanillajs-datepicker/js/Datepicker.js';
import 'vanillajs-datepicker/css/datepicker.css';
import { setTaskDialog } from "./DOM_manipulation";

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

export async function getProjects(){
  try {
    const response = await fetch('/getProjects');
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    const currentProjects = await response.json();
    return currentProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
  
};

export async function updateSpecific(updatedTasks){
  fetch('/update_specific', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTasks),
  })
  .catch(error => {
    console.error('Error adding task:', error);
  });
}

export async function displayProjectsData(){
  const projects = await getProjects()
  const dataContainer = document.querySelector('.dataContainer') || document.createElement('div');
  if(!dataContainer.classList.contains('dataContainer')){
    dataContainer.classList.add('dataContainer')
  }
  dataContainer.innerHTML = '';
  const mainContainer = document.querySelector('.main')
  mainContainer.innerHTML = ''

  const mainSplit = document.createElement('div');
    mainSplit.classList.add('btn-group')
    mainSplit.innerHTML =
    '<div class="btn-group">'+
      `<button type="button" class="btn splitBtn">Projects</button>`+
      '<button type="button" class="btn splitBtn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">'+
      '</button>'+
      '<ul class="dropdown-menu">'+
        '<li><button id="projectsButton" class="dropdown-item">Projects</button></li>'+
        `<li><button id="tasksButton" class="dropdown-item">Tasks</button></li>`+ 
        `<li><button id="tasksTodayButton" class="dropdown-item">Today</button></li>`+
        `<li><button id="filterByDate" class="dropdown-item">Filter By Date</button></li>`+
        '<li><hr class="dropdown-divider"></li>'+
        '<li><button id="addTaskButton" class="dropdown-item">Add new task</button></li>'+
      '</ul>'+
    '</div>'
    mainContainer.appendChild(mainSplit);

  mainContainer.appendChild(dataContainer)
  for(const project in projects){
        
        const projectDiv = document.createElement('div');
        const projectKey = project.split(' ').join('');
        const taskIds = projects[project];
        const userTasks = await getUserTasks()
        let tasks = {};
        for(const taskId in taskIds){
          if(userTasks[taskId] != undefined){
            tasks[taskId] = userTasks[taskId]
          }
          
        }
        console.log(tasks)
        projectDiv.classList.add('projectDiv');
        const outerP = document.querySelector('.d-infline-flex') || document.createElement('p');
        outerP.classList.add('d-inline-flex');
        outerP.classList.add('gap-1');
        const projectTasksOuterDiv = document.createElement('div');
        projectTasksOuterDiv.classList.add('collapse');
        projectTasksOuterDiv.id = `projectTasks${projectKey}`
        const projectTasksDiv = document.createElement('div');
        projectTasksDiv.classList.add('card');
        projectTasksDiv.classList.add('card-body');
        projectTasksDiv.classList.add('projectTasks')
        projectTasksDiv.id = `#projectTasks${projectKey}`
        projectTasksOuterDiv.appendChild(projectTasksDiv)
        outerP.classList.add('projectMain');
        const projectName = document.createElement('div');
        projectName.classList.add('projectName')
        projectName.id = `projectName${projectKey}`
        projectName.setAttribute('data-bs-toggle', 'collapse');
        projectName.setAttribute('data-bs-target', `#projectTasks${projectKey}`)
        projectName.ariaExpanded = "false";
        projectName.textContent = project;
        outerP.innerHTML = '<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample"></button>'
        outerP.appendChild(projectName);
        projectDiv.appendChild(outerP);
        projectDiv.appendChild(projectTasksOuterDiv);
        const dataContainer = document.querySelector('.dataContainer')

        const saveButton = document.createElement('button');
        saveButton.textContent = 'SAVE';
        saveButton.addEventListener('click', function(event){
            updateSpecific(tasks)
          }
          )
        saveButton.id = `saveButton${projectKey}`;
        saveButton.classList.add('hide');
        saveButton.classList.add('saveButton')
        projectTasksDiv.appendChild(saveButton)
        dataContainer.appendChild(projectDiv);
        
        for (const key in tasks) {
          if (tasks.hasOwnProperty(key)) {
            const value = tasks[key];
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
            taskName.textContent = value['taskName']
            
            const taskDueDate = document.createElement('input');
            taskDueDate.classList.add('taskDueDate')
            taskDueDate.type = 'text'
            taskDueDate.value = value['taskDueDate'];
    
            // function saveTaskUpdates(button, tasks){
            //   button.classList.add('hide')
            //   const currentTasks = tasks;
            //   fetch('/saveTaskUpdates', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(currentTasks),
            //   })
            // }
    
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
              const saveButton = document.getElementById(`saveButton${projectKey}`);
              saveButton.classList.remove('hide');
            })
            taskCompletionImgDiv.appendChild(taskCompletionImg);


    
            taskDueDate.addEventListener('click', function(){
              const datepickerMain = document.querySelector('.datepicker-main');
              datepickerMain.addEventListener('click', function(event){
                if(event.target.classList.contains('datepicker-cell')){
                  value['dueDate'] = taskDueDate.value
                }
              })

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
            projectTasksDiv.appendChild(taskDiv);
          }
        }




        

  }

}
export async function chooseTaskData(){
      const taskData = await getUserTasks();
      const filteredData = {};
      const year = new Date().getFullYear();
      const dayStr = String(new Date().getDate());
      const day = ('' + dayStr).padStart(2, "0")
      const monthStr = String(new Date().getMonth() + 1)
      const month =  ('' + monthStr).padStart(2, "0");
      for(const task in taskData){
        if(taskData[task]['taskDueDate'] == `${month}/${day}/${year}`){
          filteredData[task] = taskData[task];
        }}
    // console.log(`Filtered data: ${filteredData}`)
    return filteredData
}

export async function displayTasksData(data, mode) {
  try {
    const tasks = data || await chooseTaskData();
    const main_container = document.querySelector('.main');
    main_container.innerHTML = '';
    const mainDisplay = document.createElement('div');
    mainDisplay.classList.add('mainDisplay')
    mainDisplay.style.cssText = 'width: 1100px; display: flex; flex-direction: column; align-items: space-around'
    const dataContainer = document.createElement('div');
    dataContainer.classList.add('dataContainer');
    for (const key in tasks) {
      if (tasks.hasOwnProperty(key)) {
        const value = tasks[key];
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

        const taskDueDate = document.createElement('input');
        taskDueDate.classList.add('taskDueDate')
        taskDueDate.type = 'text'
        taskDueDate.id = `${key}`
        taskDueDate.value = value['taskDueDate'];
        taskDueDate.textContent = value['taskDueDate'];

        
        

        if (document.getElementById('saveButton') === null){
          const saveButton = document.createElement('button');
          const mode = mode || 'Today'
          saveButton.textContent = 'SAVE';
          saveButton.addEventListener('click', function(event){
            if(mode != 'Projects'){
              saveTaskUpdates(event.currentTarget, tasks)
            }else{
              console.log(event.currentTarget)
            }
            }
            )
          saveButton.id = 'saveButton';
          saveButton.classList.add('hide');
          if(mode != 'Projects'){
            taskMain.appendChild(saveButton)
          };
        };

        taskDueDate.addEventListener('click', function(){
          const datepickerMain = document.querySelector('.datepicker-main');
          datepickerMain.addEventListener('click', function(event){
            if(event.target.classList.contains('datepicker-cell')){
              value['taskDueDate'] = taskDueDate.value
              const saveButton = document.getElementById('saveButton');
              saveButton.classList.remove('hide');
            }
          })});
        

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
        dataContainer.appendChild(taskDiv);
      }
    }


    

    const mainSplit = document.createElement('div');
        mainSplit.classList.add('btn-group')
        mainSplit.innerHTML =
        '<div class="btn-group">'+
          `<button type="button" class="btn splitBtn">${mode || 'Today'}</button>`+
          '<button type="button" class="btn splitBtn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">'+
          '</button>'+
          '<ul class="dropdown-menu">'+
            '<li><button id="projectsButton" class="dropdown-item">Projects</button></li>'+
            `<li><button id="tasksButton" class="dropdown-item">Tasks</button></li>`+ 
            `<li><button id="tasksTodayButton" class="dropdown-item">Today</button></li>`+
            `<li><button id="filterByDate" class="dropdown-item">Filter By Date</button></li>`+
            '<li><hr class="dropdown-divider"></li>'+
            '<li><button id="addTaskButton" class="dropdown-item">Add new task</button></li>'+
          '</ul>'+
        '</div>'
        main_container.appendChild(mainSplit);


    const tasksButton = document.getElementById('tasksButton');
    tasksButton.addEventListener('click', async function(){
    const taskData = await getUserTasks();
    displayTasksData(taskData, 'Tasks')
  })

  const projectsButton = document.getElementById('projectsButton');
  projectsButton.addEventListener('click', () => displayProjectsData())

  const filterByDate = document.getElementById('filterByDate');
  filterByDate.onclick = function(){
    const calendarDialog = document.getElementById('rawCalendar');
    calendarDialog.showModal()
    const dateInput = document.getElementById('dateInput')
    const datepicker = new Datepicker(dateInput, { 
      clearButton: true,
    });
    const calendarForm = document.getElementById('calendarForm')
    calendarForm.addEventListener('submit', async function(event) {
      event.preventDefault();

      const taskData = await getUserTasks();
      const filteredData = {};
      const date = document.getElementById('dateInput').value
      
      for(const task in taskData){
        if(taskData[task]['taskDueDate'] == `${date}`){
          filteredData[task] = taskData[task];
        }
      }
      displayTasksData(filteredData, `${date}`)
      calendarDialog.remove();
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
      });
    const exitButton = calendarDialog.querySelector('svg');
    exitButton.addEventListener('click', function(){
      calendarDialog.remove()
    });
  }
  const addTaskButton = document.getElementById('addTaskButton');
  addTaskButton.addEventListener('click', () => setTaskDialog())

  const tasksTodayButton = document.getElementById('tasksTodayButton');
  tasksTodayButton.addEventListener('click', () => displayTasksData())

    if (dataContainer.childElementCount == 0){
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

  
  mainDisplay.appendChild(dataContainer);
  main_container.appendChild(mainDisplay);
  const taskDueDate = document.querySelector('.taskDueDate')
  const myDatepicker = new Datepicker(taskDueDate, {
    clearButton: true,
    todayHighlight: true,
   });
  } catch (error) {
    console.error('Error:', error);
  }
}

