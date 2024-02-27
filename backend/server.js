const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const session = require('express-session')

const app = express();
const PORT = process.env.PORT || 3000;

// Create a connection pool for MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'Felipe',
  password: 'Kalosze*2016',
  database: 'TODOLIST',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


const crypto = require('crypto');
const sessionSecret = crypto.randomBytes(32).toString('hex');
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));


app.get('/', function(req, res) {
  if (req.session.username) {
    res.send(/* HTML for authenticated user */);
  } else {
    res.send(/* HTML for non-authenticated user */);
  }
});

app.post('/createUser', async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);
    res.status(201).json(newUser);
    
    
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'An error occurred while logging out' });
    } else {
      res.status(200).json({ message: 'Logout successful' });
    }
  });
});

app.get('/check_authentication', function(req, res) {
  if (req.session.username) {
    res.status(200).json({ authenticated: true, username: req.session.username });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

async function isUsernameAvailable(username) {
    // Create a connection from the pool
    const connection = await pool.getConnection();
    
    try {
      // Query to check if the username already exists
      const query = 'SELECT COUNT(*) AS count FROM users WHERE username = ?';
      const [rows] = await connection.execute(query, [username]);
      
      // Extract the count from the result
      const count = rows[0].count;
      
      // If count is 0, username is available; otherwise, it's not
      return count === 0;
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  }

// Define createUser function
async function createUser(userData) {
  const { username, email, password} = userData;
  const tasks = {};
  const connection = await pool.getConnection();
  console.log(`connection: ${connection}`)

  const usernameAvailable = await isUsernameAvailable(username);
  
  if (!usernameAvailable) {
    return console.log('Username already taken')
  }

  try {
    const query = 'INSERT INTO users (username, email, password, tasks) VALUES (?, ?, ?, ?)';
    const [results] = await connection.execute(query, [username, email, password, JSON.stringify(tasks)]);
    return { id: results.insertId, username, email, password }; // Return the newly created user
  } finally {
    connection.release(); // Release the connection back to the pool
  }
}



app.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
      const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
      const [rows] = await pool.execute(query, [username, password]);
  
      if (rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Credentials are correct, create a session
      req.session.username = username;
      res.status(200).json({ message: 'Login successful'});
      next()
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// function checkAuthentication(req, res, next) {
//     if (req.session.username) {
//       next();
//     } else {
//       res.status(401).json({ error: 'Unauthorized' });
//     }
//   }

app.post('/addTask', async (req, res, next) => {
  console.log('yo add task endpoint')
  const username = req.session.username;
  const newTaskData = req.body;
  const connection = await pool.getConnection();
  const getUserQuery = 'SELECT tasks FROM users WHERE username = ?';
  const [userData] = await connection.execute(getUserQuery, [username]);
  const currentTasksJson = userData[0].tasks;
  const currentTasks = JSON.parse(currentTasksJson);

  currentTasks[newTaskData] = newTaskData;
  const updatedTasksJson = JSON.stringify(currentTasks);

  try {
    const updateTasksQuery = 'UPDATE users SET tasks = ? WHERE username = ?';
    await connection.execute(updateTasksQuery, [updatedTasksJson, username]);
  }finally{
    connection.release()
    next()
  }
})



app.get('/current-user', (req, res) => {
    const username = req.session.username;
    res.json({ username });
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



