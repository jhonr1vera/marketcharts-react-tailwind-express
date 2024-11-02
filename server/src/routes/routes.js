const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { connection, connectToDatabase } = require('../../config/dbconfig');
const verifyToken = require('../middlewares/VerifyToken.jsx');

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

            const token = jwt.sign({username: user.nombre_usuario}, "secretKey", {expiresIn: "1h"})

            req.session.name = user.name;

            res.json(token);

        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/user', (req, res) => {
    if (req.session.name) {
        res.json({ name: req.session.name });
    } else {
        res.status(401).json({ message: '' });
    }
});

router.get('/nuevoingreso',  (req, res) => {
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

router.get('/extension',  (req, res) => {
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

router.get('/noinscritos',  (req, res) => {
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

router.get('/regulares',  (req, res) => {
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

router.get('/reincorporados',  (req, res) => {
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

router.get('/egresados',  (req, res) => {
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

// General EndPoints

router.get('/count_carreras', (req, res) => {
    const query = 'SELECT count(*) AS count, carrera FROM instituto_tesis.regulares GROUP BY carrera';

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

router.get('/count_lapsos', (req, res) => {
    const query = 'SELECT count(*) AS count, lapso FROM instituto_tesis.regulares GROUP BY lapso';

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

router.get('/count_turnos', (req, res) => { //Hacer un left Join con los nuevo ingreso
    const query = 'SELECT count(*) AS count, turno FROM instituto_tesis.regulares GROUP BY turno';

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

router.get('/count_generos', (req, res) => {
    const query = 'SELECT count(*) AS count, sexo FROM instituto_tesis.regulares GROUP BY sexo';

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

router.get('/count_motivos', (req, res) => {
    const query = 'SELECT count(*) AS count, motivo_ingreso FROM instituto_tesis.nuevo_ingreso GROUP BY motivo_ingreso';

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

router.get('/fecha_egreso', (req, res) => {
    const query = "SELECT UNIX_TIMESTAMP(fecha_egreso) * 1000 AS date, COUNT(*) AS value FROM egresados GROUP BY fecha_egreso";

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    })
})

module.exports = router;
