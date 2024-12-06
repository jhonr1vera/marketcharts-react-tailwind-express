const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'instituto_tesis',
    charset: 'utf8mb4'
});

const connectToDatabase = () => {
    connection.connect(err => {
        if (err) {
            console.error('Error connecting to the database:', err);
            throw err;
        } else {
            console.log('Database connected');
        }
    });
};

module.exports = {
    connectToDatabase,
    connection
};
