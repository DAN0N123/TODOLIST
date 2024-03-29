const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const session = require('express-session')

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_BASE_URL = 'http://localhost:3000';
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
const { connect } = require('http2');
const { Console } = require('console');
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

async function removeProject(username, projectName) {
  const connection = await pool.getConnection();
  const getProjectQuery = 'SELECT projects FROM users WHERE username = ?';
  const [projectData] = await connection.execute(getProjectQuery, [username]);
  const currentProjects = projectData[0]['projects'];
  delete currentProjects[projectName];
  try {
    const addProjectQuery = 'UPDATE users SET projects = ? WHERE username = ?';
    await connection.execute(addProjectQuery, [currentProjects, username]);
  } catch (error) {
    console.log(`Error deleting project ${error}`);
  } finally {
    connection.release();
    return currentProjects
  }
}


app.post('/remove_project', async (req, res, next) => {
  const username = req.session.username;
  const { projectName } = req.body;
  try {
    await removeProject(username, projectName);
    res.sendStatus(200); // Send success status
  } catch (error) {
    console.error('Error removing project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/getProjects', async function(req, res) {
  try {
    const username = req.session.username;
    const connection = await pool.getConnection();
    const getUserQuery = 'SELECT projects FROM users WHERE username = ?';
    const [userData] = await connection.execute(getUserQuery, [username]);
    let currentProjects = userData[0].projects;
    const getTasksQuery = 'SELECT tasks FROM users WHERE username = ?';
    const [tasksData] = await connection.execute(getTasksQuery, [username]);
    const currentTasksJson = tasksData[0].tasks || JSON.stringify({});
    const currentTasks = JSON.parse(currentTasksJson);

    for (const project in currentProjects) {
      for (const task of currentProjects[project]) {
        console.log(task)
        console.log(task in currentTasks)
        if (!(task in currentTasks)) {
          currentProjects = await removeProject(username, project);
        }
      }
    }
    res.json(currentProjects);
    connection.release();
  } catch (error) {
    console.error('Error fetching user tasks:', error);
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

app.post('/saveTaskUpdates', async (req,res,next) => {
  const username = req.session.username;
  const connection = await pool.getConnection();
  const updatedTasks = req.body;
  const updateQuery = 'UPDATE users SET tasks = ? WHERE username = ?';
  await connection.execute(updateQuery, [updatedTasks, username])
})

app.post('/addTask', async (req, res, next) => {
  const username = req.session.username;
  const newTaskData = req.body;
  const connection = await pool.getConnection();
  const getUserQuery = 'SELECT tasks FROM users WHERE username = ?';
  const [userData] = await connection.execute(getUserQuery, [username]);
  const currentTasksJson = userData[0].tasks || JSON.stringify({});
  const currentTasks = JSON.parse(currentTasksJson);
  currentTasks[newTaskData.taskName] = newTaskData;
  const updatedTasksJson = JSON.stringify(currentTasks);
  console.log(updatedTasksJson)

  try {
    const updateTasksQuery = 'UPDATE users SET tasks = ? WHERE username = ?';
    await connection.execute(updateTasksQuery, [updatedTasksJson, username]);
  }finally{
    console.log('task succesfuly added')
    connection.release()
    next()
  }
})




app.post('/remove_task', async (req, res, next) => {
  const username = req.session.username
  const connection = await pool.getConnection();

  const { taskName }= req.body;
  console.log(taskName)

  const getUserQuery = 'SELECT tasks FROM users WHERE username = ?';
  const [userData] = await connection.execute(getUserQuery, [username]);
  const currentTasksJson = userData[0].tasks;
  const currentTasks = JSON.parse(currentTasksJson);
  delete currentTasks[taskName]

  try{
    const updateQuery = 'UPDATE users SET tasks = ? WHERE username = ?';
    await connection.execute(updateQuery, [JSON.stringify(currentTasks), username]);
    }catch (error) {
      console.error('Error removing task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }finally{
      connection.release()
    }
})

app.post('/addProject', async (req,res,next) => {
  const username = req.session.username;
  const connection = await pool.getConnection()
  const name = req.body.name;
  const tasks = req.body.tasks;
  const getProjectQuery = 'SELECT projects FROM users WHERE username = ?'
  const [projectData] = await connection.execute(getProjectQuery, [username]);
  const currentProjects = projectData[0]['projects'] || {}
  currentProjects[name] = tasks;
  
  const currentProjectsUpdated = JSON.stringify(currentProjects);
  console.log(`Current projects updated: ${currentProjectsUpdated}`)
  try{
  const addProjectQuery = 'UPDATE users SET projects = ? WHERE username = ?'
  await connection.execute(addProjectQuery, [currentProjectsUpdated, username])
  }finally{
    console.log('project succesfully added')
    connection.release()
    next()
  }
}
);

app.post('/update_specific', async (req, res) => {
  try {
    const username = req.session.username;
    const connection = await pool.getConnection();
    const updatedTasks = req.body;

    // Fetching current tasks from the database
    const getUserQuery = 'SELECT tasks FROM users WHERE username = ?';
    const [userData] = await connection.execute(getUserQuery, [username]);
    const currentTasksJson = userData[0].tasks;
    const currentTasks = JSON.parse(currentTasksJson);

    // Merging updated tasks with current tasks
    Object.assign(currentTasks, updatedTasks);

    // Updating tasks in the database
    const updateQuery = 'UPDATE users SET tasks = ? WHERE username = ?';
    await connection.execute(updateQuery, [JSON.stringify(currentTasks), username]);
    connection.release()
    res.status(200).json({ message: 'Tasks updated successfully' });
  } catch (error) {
    console.error('Error updating tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });}
  
});


app.get('/user_tasks', async (req, res) => {
  try {
    const username = req.session.username;
    const connection = await pool.getConnection();
    const getUserQuery = 'SELECT tasks FROM users WHERE username = ?';
    const [userData] = await connection.execute(getUserQuery, [username]);
    const currentTasksJson = userData[0].tasks;
    const currentTasks = JSON.parse(currentTasksJson);
    res.json(currentTasks);
    connection.release();
  } catch (error) {
    console.error('Error fetching user tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



