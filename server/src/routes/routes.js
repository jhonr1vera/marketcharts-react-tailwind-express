const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { connection, connectToDatabase } = require('../../config/dbconfig');
const verifyToken = require('../middlewares/VerifyToken.jsx');
const fastcsv = require('fast-csv');
const iconv = require('iconv-lite');
const fs = require('fs');

connectToDatabase()

router.post('/login',(req, res) => {
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
                csvData.push(row);  
            })
            .on('end', () => {
                const deleteQuery = 'DELETE FROM egresados';
                connection.query(deleteQuery, (deleteError, deleteResponse) => {
                    if (deleteError) {
                        console.error('Error al eliminar los datos:', deleteError);
                        return res.status(500).send('Error al eliminar los datos de la tabla.');
                    }

                    console.log('Datos eliminados exitosamente');

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
                            console.error('Error al insertar los datos:', insertError);
                            return res.status(500).send('Error al insertar los datos en la base de datos.');
                        }
                        res.send('Archivo cargado y datos insertados correctamente.');
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
                csvData.push(row);
            })
            .on('end', () => {
                const deleteQuery = 'DELETE FROM extension';
                connection.query(deleteQuery, (deleteError, deleteResponse) => {
                    if (deleteError) {
                        console.error('Error al eliminar los datos:', deleteError);
                        return res.status(500).send('Error al eliminar los datos de la tabla.');
                    }

                    console.log('Datos eliminados exitosamente');

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
                            console.error('Error al insertar los datos:', insertError);
                            return res.status(500).send('Error al insertar los datos en la base de datos.');
                        }
                        res.json('Archivo cargado y datos insertados correctamente.');
                    });
                });
            });
    });
});

router.post('/upload/:tableName', (req, res) => {
    const allowedTables = ['no_inscritos', 'nuevo_ingreso', 'regulares', 'reincorporados'];
    const tableName = req.params.tableName;

    if (!allowedTables.includes(tableName)) {
        const errorResponse = { message: 'Tabla no permitida.' };
        console.log(JSON.stringify(errorResponse));
        return res.status(400).send(errorResponse.message);
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        const errorResponse = { message: 'No se subieron archivos.' };
        console.log(JSON.stringify(errorResponse));
        return res.status(400).send(errorResponse.message);
    }

    const csvFile = req.files.file;
    const filePath = __dirname + '/../../uploads/' + csvFile.name;

    csvFile.mv(filePath, (err) => {
        if (err) {
            const errorResponse = { message: 'Error al mover el archivo.', error: err };
            console.log(JSON.stringify(errorResponse));
            return res.status(500).send(errorResponse.message);
        }

        const csvData = [];
        
        fs.createReadStream(filePath)
            .pipe(iconv.decodeStream('latin1'))
            .pipe(iconv.encodeStream('utf8'))
            .pipe(fastcsv.parse({ headers: false, skipRows: 1, delimiter: ';' }))
            .on('data', (row) => {
                csvData.push(row);
            })
            .on('end', () => {
                const deleteQuery = `DELETE FROM ${tableName}`;
                connection.query(deleteQuery, (deleteError) => {
                    if (deleteError) {
                        const errorResponse = { message: 'Error al eliminar los datos.', error: deleteError };
                        console.log(JSON.stringify(errorResponse));
                        return res.status(500).send(errorResponse.message);
                    }

                    console.log(`Datos eliminados de la tabla ${tableName} exitosamente.`);

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
                            const errorResponse = { message: 'Error al insertar los datos.', error: insertError };
                            console.log(JSON.stringify(errorResponse));
                            return res.status(500).send(errorResponse.message);
                        }

                        console.log(`Archivo cargado y datos insertados correctamente en la tabla ${tableName}.`);
                        const successResponse = { message: `Archivo cargado y datos insertados correctamente en la tabla ${tableName}.` };
                        console.log(JSON.stringify(successResponse));
                        return res.status(200).send(successResponse.message);
                    });
                });
            })
            .on('error', (err) => {
                const errorResponse = { message: 'Error al procesar el archivo CSV.', error: err };
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


module.exports = router;
