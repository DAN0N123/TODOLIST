const mysql = require('mysql');
const { User } = require('./classes');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_user',
    password: 'your_mysql_password',
    database: 'your_database_name'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Export the connection to use it in other modules
module.exports = connection;

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