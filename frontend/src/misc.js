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

export async function remove_project(project){
  fetch('/remove_project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({projectName: project}),
  })
  .catch(error => {
    console.error('Error adding task:', error);
  });
}

export async function deleteTask(task){
  fetch('/remove_task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ taskName: task }),
    
  })
  .catch(error => {
    console.error('Error adding task:', error);
  });
}

function createTopLevelButtons(mode){
  const mainContainer = document.querySelector('.main')
  const topLevelButtons = document.createElement('div');
  topLevelButtons.style.cssText = 'display: flex; gap: 100px'
  const editModeButton = document.createElement('div');
  editModeButton.style.borderColor = '#757575'
  editModeButton.id = 'editModeButton'
  const editImage = document.createElement('div');
  editImage.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-pen" viewBox="0 0 16 16">'+
                        '<path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>'+
                        '</svg>'
  editModeButton.appendChild(editImage);
  editModeButton.addEventListener('click', (event) => {
    const trashcans = document.querySelectorAll('.deleteImg')
    if (!event.target.classList.contains('active')){
      event.target.classList.add('active')
      editImage.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2F7FE8" class="bi bi-pen" viewBox="0 0 16 16">'+
      '<path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>'+
      '</svg>'
      trashcans.forEach( trashcan => {
        trashcan.classList.remove('hide')
      })
    }else{
      event.target.classList.remove('active')
      editImage.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-pen" viewBox="0 0 16 16">'+
                        '<path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>'+
                        '</svg>'
      trashcans.forEach( trashcan => {
        trashcan.classList.add('hide')
      })
    }
  })
  // const editText =  document.createElement('p');
  // editText.style.margin = '0'
  // editText.textContent = 'EDIT';
  // editModeButton.appendChild(editText)

  const mainSplit = document.createElement('div');
    mainSplit.classList.add('btn-group')
    mainSplit.innerHTML =
    '<div class="btn-group">'+
      `<button type="button" class="btn splitBtn">${mode}</button>`+
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
    topLevelButtons.appendChild(mainSplit);
    topLevelButtons.appendChild(editModeButton);
    mainContainer.appendChild(topLevelButtons);
    const tasksButton = document.getElementById('tasksButton');
    tasksButton.addEventListener('click', async function(){
    const taskData = await getUserTasks();
    displayTasksData(taskData, 'Tasks')
  })

  const projectsButton = document.getElementById('projectsButton');
  projectsButton.addEventListener('click', () => displayProjectsData())
  const filterByDate = document.getElementById('filterByDate');

  filterByDate.addEventListener('click', function(){
    const calendarDialog = document.getElementById('rawCalendar');
    calendarDialog.parentElement.classList.remove('hide')
    calendarDialog.showModal()

    const dateInput = document.getElementById('dateInput')
    const datepicker = new Datepicker(dateInput, { 
      clearButton: true,
    });
    const calendarForm = document.getElementById('calendarForm')
    calendarForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      calendarDialog.parentElement.classList.add('hide')
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
  });
  const addTaskButton = document.getElementById('addTaskButton');
  addTaskButton.addEventListener('click', () => setTaskDialog())

  const tasksTodayButton = document.getElementById('tasksTodayButton');
  tasksTodayButton.addEventListener('click', async function(){ 
    const tasksToday = await getTaskDataToday()
    displayTasksData(tasksToday, 'Today')
  });
};


export async function displayProjectsData(){
  const projects = await getProjects()
  const dataContainer = document.querySelector('.dataContainer') || document.createElement('div');
  if(!dataContainer.classList.contains('dataContainer')){
    dataContainer.classList.add('dataContainer')
  }
  dataContainer.innerHTML = '';
  const mainContainer = document.querySelector('.main')
  mainContainer.innerHTML = ''

  createTopLevelButtons('Projects')

  mainContainer.appendChild(dataContainer)
  for(const project in projects){
        
        const projectDiv = document.createElement('div');
        const projectKey = project.split(' ').join('');
        const taskIds = projects[project];
        const userTasks = await getUserTasks()
        let tasks = {};
        for(const taskName of taskIds){
          if(userTasks[taskName] != undefined){
            tasks[taskName] = userTasks[taskName]
          }
        };
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
        const deleteImg = document.createElement('button');
        deleteImg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#E42328" class="bi bi-trash3-fill" viewBox="0 0 16 16">'+
                              '<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>'+
                              '</svg>' 
        deleteImg.classList.add('deleteImg');
        deleteImg.classList.add('hide');
        deleteImg.setAttribute('data-bs-toggle', 'modal')
        deleteImg.setAttribute('data-bs-target', '#confirmModal')
        deleteImg.addEventListener('click', function(event){
            
            const deleteButton = document.getElementById('deleteButton');
            
            deleteButton.onclick = function(){
            remove_project(`${projectKey}`)
            const modal = deleteButton.parentElement.parentElement.parentElement.parentElement
            

            // reset and hide modal
            const body = document.querySelector('body')
            const modalBackdrop = document.querySelector('.modal-backdrop')
            modalBackdrop.remove()
            body.classList.remove('modal-open')
            body.removeAttribute('style')
            modal.classList.remove('show')
            modal.removeAttribute('style')
            modal.removeAttribute('aria-modal')
            modal.setAttribute('aria-hidden', 'true')
            modal.removeAttribute('role')
            setTimeout( () => displayProjectsData(), 100)
            };
        });

       
        outerP.innerHTML = '<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample"></button>'
        outerP.appendChild(projectName);
        outerP.appendChild(deleteImg);
        projectDiv.appendChild(outerP);
        projectDiv.appendChild(projectTasksOuterDiv);
        const dataContainer = document.querySelector('.dataContainer')

        const saveButton = document.createElement('button');
        saveButton.textContent = 'SAVE';
        saveButton.addEventListener('click', function(event){
            updateSpecific(tasks)
            this.classList.add('hide')
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

            const taskDueDates = document.querySelectorAll('.taskDueDate')
            taskDueDates.forEach((element) => {
              const myDatepicker = new Datepicker(element, {
                clearButton: true,
                todayHighlight: true,
              })
            });
    
            taskDueDate.addEventListener('click', function(){
              const datepickerParent = document.getElementById(`Task-${key}`);
              const datepickerMain = datepickerParent.querySelector('.datepicker-main')
              datepickerMain.addEventListener('click', function(event){
                if(event.target.classList.contains('datepicker-cell')){ 
                  value['taskDueDate'] = taskDueDate.value
                  const saveButton = document.getElementById(`saveButton${projectKey}`);
                  console.log(saveButton)
                  saveButton.classList.remove('hide');
                }
            });
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
            const deleteImg = document.createElement('button');
            deleteImg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#E42328" class="bi bi-trash3-fill" viewBox="0 0 16 16">'+
                                  '<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>'+
                                  '</svg>' 
            deleteImg.classList.add('deleteImg');
            deleteImg.classList.add('hide');
            deleteImg.type = 'button'
            deleteImg.setAttribute('data-bs-toggle', 'modal')
            deleteImg.setAttribute('data-bs-target', '#confirmModal')
            deleteImg.addEventListener('click', function(event){
                const deleteButton = document.getElementById('deleteButton');
                const taskName = event.target.parentElement.parentElement.parentElement.parentElement.id.replace('Task-', '')
                deleteButton.onclick = async function(){
                const taskData = await getUserTasks();
                deleteTask(taskName)
                // displayTasksData(taskData, 'Tasks')
                // location.reload()
                };
            });
            taskCompletionImgDiv.appendChild(deleteImg)
            projectTasksDiv.appendChild(taskDiv);
          }
        }




        

  }

}
export async function getTaskDataToday(){
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
    return filteredData
}

export async function displayTasksData(data, mode) {
  try {
    const tasks = data || await getUserTasks();
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
          const mode = mode || 'Tasks'
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
          const datepickerParent = document.getElementById(`Task-${key}`);
          const datepickerMain = datepickerParent.querySelector('.datepicker-main')
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
        const deleteImg = document.createElement('button');
        deleteImg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#E42328" class="bi bi-trash3-fill" viewBox="0 0 16 16">'+
                              '<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>'+
                              '</svg>' 
        deleteImg.classList.add('deleteImg')
        deleteImg.classList.add('hide')
        deleteImg.type = 'button'
        deleteImg.setAttribute('data-bs-toggle', 'modal')
        deleteImg.setAttribute('data-bs-target', '#confirmModal')
        deleteImg.addEventListener('click', function(event){
            const deleteButton = document.getElementById('deleteButton');
            const taskName = event.target.parentElement.parentElement.parentElement.id.replace('Task-', '')
            deleteButton.onclick = async function(){
            const taskData = await getUserTasks();
            deleteTask(taskName)
            displayTasksData(taskData, 'Tasks')
            location.reload()
            };
        });
        taskMain.appendChild(deleteImg)
        dataContainer.appendChild(taskDiv);
      }
    }


    

    createTopLevelButtons(mode || 'Tasks')

    if (dataContainer.childElementCount == 0){
      const defaultDiv = document.createElement('div');
      defaultDiv.style.position = 'absolute';

      defaultDiv.style.cssText = "display: flex; flex-direction: column; align-items:center; position: absolute; left: 0; right: 0; top: 0; bottom: 30%; margin: auto; width:400px; height: 200px;"
      const defaultImg = document.createElement('img');
      defaultImg.src = defaultImgSrc;
      defaultImg.style.width = '294px';
      const defaultP = document.createElement('p');
      defaultP.innerHTML = 'What do you have to do today?</br>'
      defaultP.style.marginLeft = '5%'
      defaultDiv.appendChild(defaultImg);
      defaultDiv.appendChild(defaultP);
      main_container.appendChild(defaultDiv);
      return
  }

  
  mainDisplay.appendChild(dataContainer);
  main_container.appendChild(mainDisplay);
  const taskDueDate = document.querySelectorAll('.taskDueDate')
  taskDueDate.forEach((element) => {
    const myDatepicker = new Datepicker(element, {
      clearButton: true,
      todayHighlight: true,
     })
  });
  
  } catch (error) {
    console.error('Error:', error);
  }
}

