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

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Define API endpoints
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
  const { username, email, password } = userData;
  const connection = await pool.getConnection();

  const usernameAvailable = await isUsernameAvailable(username);
  
  if (!usernameAvailable) {
    return console.log('Username already taken')
    connection.release(); // Release the connection back to the pool
  }

  try {
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const [results] = await connection.execute(query, [username, email, password]);
    return { id: results.insertId, username, email, password }; // Return the newly created user
  } finally {
    connection.release(); // Release the connection back to the pool
  }
}

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
      const [rows] = await pool.execute(query, [username, password]);
  
      if (rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Credentials are correct, create a session
      req.session.username = username;
      res.status(200).json({ message: 'Login successful' });
      
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  function isAuthenticated(req, res, next) {
    if (req.session.username) {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }


app.get('/current-user', (req, res) => {
    const username = req.session.username;
    res.json({ username });
  });



// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



