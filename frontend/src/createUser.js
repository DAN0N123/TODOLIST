import send from "send";

function sendUserData(){
    document.addEventListener('DOMContentLoaded', () => {
        const userForm = document.getElementById('userForm');
    
        userForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission
    
            // Get form data
            const formData = new FormData(userForm);
            const userData = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password')
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
    
                // User creation successful
                console.log('User created successfully');
                // Optionally, redirect to another page or show a success message
            } catch (error) {
                console.error('Error creating user:', error.message);
                // Handle error - show error message to the user, retry, etc.
            }
        });
    });
}

export default sendUserData