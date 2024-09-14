const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers['autorization'];

    if(!token) {
        return res.status(403).json({ error: 'Acceso denegado. No se proporciono un token.'})
    } 

    jwt.verify(token, 'secretKey', (err, decoded) => {
        if(err) {
            return res.status(401).json({error: 'Token invalido o expirado.'})
        }

        req.user = decoded;
        next();
    })
}

module.exports = verifyToken;