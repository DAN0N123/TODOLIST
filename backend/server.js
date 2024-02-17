const express = require('express');
const path = require('path');
const createUser = require('./database-operations');

const app = express();
const PORT = 8081;

// Serve static files from the frontend/dist directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Parse JSON bodies in POST requests
app.use(express.json());

// Define API endpoints
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Endpoint to handle user creation
app.post('/users', (req, res) => {
    const userData = req.body;
    createUser(userData)
        .then((result) => {
            res.status(201).send('User created successfully');
        })
        .catch((err) => {
            console.error('Error creating user:', err);
            res.status(500).send('Error creating user');
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});