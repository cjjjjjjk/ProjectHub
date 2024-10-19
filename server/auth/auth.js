const jwt = require('jsonwebtoken')
require('dotenv').config();

// Hai ----------------- jwt verification .
function validateToken(req, res, next) {
    const token = req.headers['token']
    if (!token) return res.status(401).json('User not login !');

    const scret_key = (process.env.SECRET_KEY) ? process.env.SECRET_KEY : 'abcd-1234';
    try {
        const decoded = jwt.verify(token, scret_key);
        req.user = decoded;
        if (decoded)
            return next();
    } catch (err) {
        return res.status(403).json({ message: `Token (jwt) verification failed: ${err.message}` })
    }
}
module.exports = { validateToken };