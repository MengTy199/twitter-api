const { validationResult } = require("express-validator")
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler")

const validationErrorHandler = async (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        next()
    } else
        return res.send({ errors: result.array() });
}

const verifyToken = asyncHandler(async (req, res, next) => {
    //Check token
    let token = req.header("Authorization")
    if (!token) {
        return res.status(401).json({ error: "Access Denied!" })
    }
    // console.log(token)
    token = token.replace("Bearer ", "")
    const decoded = jwt.verify(token, process.env.SECRET)
    // req.user = decoded
    return res.json({ user: decoded })
    // next()
})

module.exports = { validationErrorHandler, verifyToken }