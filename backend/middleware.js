const { JWT_SECRET } = require('./config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader ||  !authHeader.startsWith('Bearer')) {
        console.log("Header is not correct");
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];
    console.log(token);

    try {
        const decode = jwt.verify(token, JWT_SECRET);
        req.userId = decode.userId;
        next()
    } catch (error) {
        return res.status(403).json({'message' : "In Catch block of authMiddleware"});
    }
}

module.exports = authMiddleware;