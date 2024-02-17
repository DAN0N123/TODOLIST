const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost', // Change this to your database host
  user: 'Felipe',      // Change this to your database username
  password: 'Kalosze*2016',  // Change this to your database password
  database: 'TODOLIST', // Change this to your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});
const { User } = require('./classes');


// Define createUser function
function createUser(userData) {
    const { username, email, password } = userData;
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const values = [username, email, password];

    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            const newUser = new User(username, email, password);
            resolve(newUser);
        });
    });
}

module.exports = createUser; // Export createUser function