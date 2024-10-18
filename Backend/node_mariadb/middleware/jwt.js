const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }

    // Eliminar el prefijo "Bearer " si es necesario
    const actualToken = token.split(' ')[1];

    jwt.verify(actualToken, 'mySecretKey', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
