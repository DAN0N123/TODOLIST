import { updateDisplayForUser } from "../frontend/src/DOM_manipulation";
export async function handleUserCreation() {
    const userForm = document.getElementById('userForm');

    userForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const userData = {
          username: document.getElementById('inputUsername').value,
          password: document.getElementById('inputPassword').value,
          email: document.getElementById('inputEmail').value
        };
        

        try {
            // Send form data to backend
            const response = await fetch('/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Failed to create user');
            }

            // Optionally, redirect to another page or show a success message
        } catch (error) {
            console.error('Error creating user:', error.message);
            // Handle error - show error message to the user, retry, etc.
        }
    });
    const main_container = document.querySelector('.main');
    main_container.innerHTML = ''
}

export async function handleLoginFormSubmit(event) {

    const formData = {
      username: document.getElementById('inputUsername').value,
      password: document.getElementById('inputPassword').value
    };
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        updateDisplayForUser(document.getElementById('inputUsername').value)
      } else {
        const errorMessage = await response.json();
        console.error('Login failed:', errorMessage.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
    const main_container = document.querySelector('.main');
    main_container.innerHTML = ''
  }
