const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt')
const { connection, connectToDatabase } = require('../../config/dbconfig');


connectToDatabase()

router.get('/nuevoingreso', (req, res) => {
    const query = 'SELECT * FROM nuevo_ingreso';

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

router.get('/extension', (req, res) => {
    const query = 'SELECT * FROM extension';

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

router.get('/noinscritos', (req, res) => {
    const query = 'SELECT * FROM no_inscritos';

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

router.get('/regulares', (req, res) => {
    const query = 'SELECT * FROM regulares';

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

router.get('/reincorporados', (req, res) => {
    const query = 'SELECT * FROM reincorporados';

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

router.get('/egresados', (req, res) => {
    const query = 'SELECT * FROM egresados';

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

router.post('/login', async (req, res) => {
    const { nombre_usuario, contrasenia } = req.body;

    try {
        const query = 'SELECT * FROM usuarios WHERE nombre_usuario = ?';

        connection.query(query, [nombre_usuario], (err, results) => {
            if (err) {
                console.error("Error executing query:", err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            const user = results[0];

            if (contrasenia !== user.contrasenia) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            res.json({ id_usuario: user.id_usuario, nombre_usuario: user.nombre_usuario });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
