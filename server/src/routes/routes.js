const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { connection, connectToDatabase } = require('../../config/dbconfig');
const verifyToken = require('../middlewares/VerifyToken.jsx');
const fastcsv = require('fast-csv');
const iconv = require('iconv-lite');
const fs = require('fs');
const moment = require('moment');
const axios = require('axios');
require('dotenv').config();

const YT_API_KEY = process.env.CREDENTIAL_YT_API;
connectToDatabase()

router.post('/login', (req, res) => {
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

            const token = jwt.sign(
                { username: user.name, userrol: user.rol },
                "secretKey",
                { expiresIn: "2h" }
            );

            req.session.name = user.name;
            req.session.rol = user.rol;

            res.json({ token });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/user', (req, res) => {
    if (req.session.name && req.session.rol) {
        res.json({
            name: req.session.name,
            rol: req.session.rol
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
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

router.post('/upload/egresados', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json('No files were uploaded.');
    }

    const csvFile = req.files.file;
    const filePath = __dirname + '/../../uploads/' + csvFile.name;

    csvFile.mv(filePath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        const csvData = [];
        fs.createReadStream(filePath)
            .pipe(iconv.decodeStream('latin1'))
            .pipe(iconv.encodeStream('utf8'))
            .pipe(fastcsv.parse({ headers: false, skipRows: 1, delimiter: ';' }))
            .on('data', (row) => {
                if (row[3]){
                    row[3] = moment(row[3], 'DD/MM/YYYY').format('YYYY-MM-DD');
                }
                if (row[13]){
                    row[13] = moment(row[13], 'DD/MM/YYYY').format('YYYY-MM-DD');
                }
                csvData.push(row);
            })
            .on('end', () => {
                const deleteQuery = 'DELETE FROM egresados';
                connection.query(deleteQuery, (deleteError, deleteResponse) => {
                    if (deleteError) {
                        console.error('Error eliminating data:', deleteError);
                        return res.status(500).send('Error eliminating data.');
                    }

                    console.log('Data was eliminated');

                    const insertQuery = 'INSERT INTO egresados (cedula, nombre, apellido, fecha_nacimiento, sexo, tipo_doc, carrera, mencion, turno, correo, telefono, motivo_ingreso, direccion, fecha_egreso) VALUES ?';
                    const values = csvData.map(row => [
                        row[0],  // cedula
                        row[1],  // nombre
                        row[2],  // apellido
                        row[3],  // fecha_nacimiento
                        row[4],  // sexo
                        row[5],  // tipo_doc
                        row[6],  // carrera
                        row[7],  // mencion
                        row[8],  //turno
                        row[9],  // correo
                        row[10], // telefono
                        row[11], // motivo_ingreso
                        row[12], // direccion
                        row[13], // fecha_egreso
                    ]);
                    connection.query(insertQuery, [values], (insertError, insertResponse) => {
                        if (insertError) {
                            console.error('Error inserting data:', insertError);
                            return res.status(500).send('Error inserting data in database.');
                        }
                        res.send('File loaded and inserted correctly.');
                    });
                });
            });
    });
});

router.post('/upload/extension', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json('No files were uploaded.');
    }

    const csvFile = req.files.file;
    const filePath = __dirname + '/../../uploads/' + csvFile.name;

    csvFile.mv(filePath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        const csvData = [];
        fs.createReadStream(filePath)
            .pipe(iconv.decodeStream('latin1'))
            .pipe(iconv.encodeStream('utf8'))
            .pipe(fastcsv.parse({ headers: false, skipRows: 1, delimiter: ';' }))
            .on('data', (row) => {
                if (row[3]){
                    row[3] = moment(row[3], 'DD/MM/YYYY').format('YYYY-MM-DD');
                }
                if (row[11]){
                    row[11] = moment(row[11], 'DD/MM/YYYY').format('YYYY-MM-DD');
                }
                csvData.push(row);
            })
            .on('end', () => {
                const deleteQuery = 'DELETE FROM extension';
                connection.query(deleteQuery, (deleteError, deleteResponse) => {
                    if (deleteError) {
                        console.error('Error eliminating data:', deleteError);
                        return res.status(500).send('Error eliminating data.');
                    }

                    console.log('Data was eliminated');

                    const insertQuery = 'INSERT INTO extension (cedula, nombre, apellido, fecha_nacimiento, sexo, tipo_doc, diplomado, correo, telefono, motivo_ingreso, direccion, promocion) VALUES ?';
                    const values = csvData.map(row => [
                        row[0],  // cedula
                        row[1],  // nombre
                        row[2],  // apellido
                        row[3],  // fecha_nacimiento
                        row[4],  // sexo
                        row[5],  // tipo_doc
                        row[6],  // diplomado
                        row[7],  // correo
                        row[8],  // telefono
                        row[9],  // motivo_ingreso
                        row[10], // direccion
                        row[11], // promocion
                    ]);
                    connection.query(insertQuery, [values], (insertError, insertResponse) => {
                        if (insertError) {
                            console.error('Error inserting data:', insertError);
                            return res.status(500).send('Error inserting data in database.');
                        }
                        res.json('File loaded and inserted correctly.');
                    });
                });
            });
    });
});

router.post('/upload/:tableName', (req, res) => {
    const allowedTables = ['no_inscritos', 'nuevo_ingreso', 'regulares', 'reincorporados'];
    const tableName = req.params.tableName;

    if (!allowedTables.includes(tableName)) {
        const errorResponse = { message: 'Table not allowed' };
        console.log(JSON.stringify(errorResponse));
        return res.status(400).send(errorResponse.message);
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        const errorResponse = { message: 'files were not uploaded' };
        console.log(JSON.stringify(errorResponse));
        return res.status(400).send(errorResponse.message);
    }

    const csvFile = req.files.file;
    const filePath = __dirname + '/../../uploads/' + csvFile.name;

    csvFile.mv(filePath, (err) => {
        if (err) {
            const errorResponse = { message: 'Error.', error: err };
            console.log(JSON.stringify(errorResponse));
            return res.status(500).send(errorResponse.message);
        }

        const csvData = [];
        
        fs.createReadStream(filePath)
            .pipe(iconv.decodeStream('latin1'))
            .pipe(iconv.encodeStream('utf8'))
            .pipe(fastcsv.parse({ headers: false, skipRows: 1, delimiter: ';' }))
            .on('data', (row) => {
                if (row[3]){
                    row[3] = moment(row[3], 'DD/MM/YYYY').format('YYYY-MM-DD');
                }
                csvData.push(row);
            })
            .on('end', () => {
                const deleteQuery = `DELETE FROM ${tableName}`;
                connection.query(deleteQuery, (deleteError) => {
                    if (deleteError) {
                        const errorResponse = { message: 'Error eliminating data.', error: deleteError };
                        console.log(JSON.stringify(errorResponse));
                        return res.status(500).send(errorResponse.message);
                    }

                    console.log(`Data eliminated in ${tableName} successfully.`);

                    const insertQuery = `INSERT INTO ${tableName} (cedula, nombre, apellido, fecha_nacimiento, sexo, tipo_doc, carrera, mencion, lapso, turno, correo, telefono, motivo_ingreso, direccion) VALUES ?`;
                    const values = csvData.map(row => [
                        row[0],
                        row[1],
                        row[2],
                        row[3],
                        row[4],
                        row[5],
                        row[6],
                        row[7],
                        row[8],
                        row[9],
                        row[10],
                        row[11],
                        row[12],
                        row[13],
                    ]);

                    connection.query(insertQuery, [values], (insertError) => {
                        if (insertError) {
                            const errorResponse = { message: 'Error inserting data.', error: insertError };
                            console.log(JSON.stringify(errorResponse));
                            return res.status(500).send(errorResponse.message);
                        }

                        console.log(`Data loaded and inserted in ${tableName}.`);
                        const successResponse = { message: `file loaded and inserted in ${tableName}.` };
                        console.log(JSON.stringify(successResponse));
                        return res.status(200).send(successResponse.message);
                    });
                });
            })
            .on('error', (err) => {
                const errorResponse = { message: 'Error proccessing CSV file.', error: err };
                console.log(JSON.stringify(errorResponse));
                return res.status(500).send(errorResponse.message);
            });
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
    const query = 'SELECT carrera,count(*) AS count FROM (SELECT carrera FROM instituto_tesis.regulares UNION ALL SELECT carrera FROM instituto_tesis.nuevo_ingreso UNION ALL SELECT carrera FROM instituto_tesis.reincorporados) as combined GROUP BY carrera';

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

router.get('/count_turnos', (req, res) => {
    const query = 'SELECT turno, COUNT(*) AS count FROM (SELECT turno FROM instituto_tesis.regulares UNION ALL SELECT turno FROM instituto_tesis.nuevo_ingreso UNION ALL SELECT turno FROM instituto_tesis.reincorporados) AS combined GROUP BY turno';

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
    const query = 'SELECT sexo, COUNT(*) AS count FROM (SELECT sexo FROM instituto_tesis.regulares UNION ALL SELECT sexo FROM instituto_tesis.nuevo_ingreso UNION ALL SELECT sexo FROM instituto_tesis.reincorporados) AS combined GROUP BY sexo';

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


// Extension EndPoints
router.get('/diplomado_ext', (req, res) => {
    const query = "SELECT count(*) AS count, diplomado FROM instituto_tesis.extension GROUP BY diplomado"

    connection.query(query, (err, results) => {
        if(err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }else {
            res.json(results);
        }
    })
})

router.get('/generos_ext', (req, res) => {
    const query = 'SELECT count(*) AS count, sexo FROM instituto_tesis.extension GROUP BY sexo';

    connection.query(query, (err, results) => {
        if(err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }else {
            res.json(results);
        }
    })
})

router.get('/motivos_extension', (req, res) => {
    const query = 'SELECT count(*) AS count, motivo_ingreso FROM instituto_tesis.extension GROUP BY motivo_ingreso';

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

// Youtube Api
router.get(`/youtube-stats/:channelCalled`, async (req, res) => {
    const handle = req.query.handle || req.params.channelCalled;
    try {
        const searchResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/search`,
            {
                params: {
                    part: 'snippet',
                    q: handle, 
                    type: 'channel',
                    key: YT_API_KEY,
                },
            }
        );

        const searchData = searchResponse.data;

        if (!searchData.items || searchData.items.length === 0) {
            return res.status(404).json({ error: 'Channel not found' });
        }

        const channelId = searchData.items[0].snippet.channelId;

        const statsResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/channels`,
            {
                params: {
                    part: 'statistics',
                    id: channelId,
                    key: YT_API_KEY,
                },
            }
        );

        const statsData = statsResponse.data;

        if (!statsData.items || statsData.items.length === 0) {
            return res.status(404).json({ error: 'Statistics not found' });
        }

        const subscriberCount = statsData.items[0].statistics.subscriberCount;
        res.json({ subscriberCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch subscribers' });
    }
});



module.exports = router;
