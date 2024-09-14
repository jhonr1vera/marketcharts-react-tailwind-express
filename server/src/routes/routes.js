const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { connection, connectToDatabase } = require('../../config/dbconfig');

connectToDatabase()

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

router.get('/nuevoingreso', (req, res) => {
    const countOnly = req.query.count === 'true'

    const query = countOnly
        ? 'SELECT COUNT(*) AS total FROM nuevo_ingreso' 
        : 'SELECT * FROM nuevo_ingreso'

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if(countOnly){
                res.json(results[0])
            } else {
                res.json(results);
            }
        }
    });
});

router.get('/extension', (req, res) => {
    const countOnly = req.query.count === 'true'

    const query = countOnly
        ? 'SELECT COUNT(*) AS total FROM extension' 
        : 'SELECT * FROM extension'

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if(countOnly){
                res.json(results[0])
            } else {
                res.json(results);
            }
        }
    });
});

router.get('/noinscritos', (req, res) => {
    const countOnly = req.query.count === 'true'

    const query = countOnly
        ? 'SELECT COUNT(*) AS total FROM no_inscritos' 
        : 'SELECT * FROM no_inscritos'

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if(countOnly){
                res.json(results[0])
            } else {
                res.json(results);
            }
        }
    });
});

router.get('/regulares', (req, res) => {
    const countOnly = req.query.count === 'true'

    const query = countOnly
        ? 'SELECT COUNT(*) AS total FROM regulares'
        : 'SELECT * FROM regulares'

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (countOnly){
                res.json(results[0]);
            } else {
                res.json(results)
            }
        }
    });
});

router.get('/reincorporados', (req, res) => {
    const countOnly = req.query.count === 'true';

    const query = countOnly
        ? 'SELECT COUNT(*) AS total FROM reincorporados'
        : 'SELECT * FROM reincorporados';

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (countOnly) {
                res.json(results[0]);
            } else {
                res.json(results);
            }
        }
    });
});

router.get('/egresados', (req, res) => {
    const countOnly = req.query.count === 'true';

    const query = countOnly
        ? 'SELECT COUNT(*) AS total FROM egresados'
        : 'SELECT * FROM egresados';

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (countOnly) {
                res.json(results[0]);
            } else {
                res.json(results);
            }
        }
    });
});


module.exports = router;
