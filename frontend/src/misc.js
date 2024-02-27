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
