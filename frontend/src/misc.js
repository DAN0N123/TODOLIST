import { updateDisplayForUser } from "./DOM_manipulation";
import { setInitialUserBox } from "./DOM_manipulation";


      


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

export async function getTasksData() {
  try {
    const tasksData = await getUserTasks();
    // console.log(tasksData['test1'])
    const taskContainer = document.querySelector('.taskContainer');
    const tasksDataDiv = document.createElement('div');
    tasksDataDiv.textContent = tasksData['testuje to']['taskDescription'];
    taskContainer.appendChild(tasksDataDiv);

  } catch (error) {
    console.error('Error:', error);
  }
}
