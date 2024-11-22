const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
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
