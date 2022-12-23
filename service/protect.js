
const catchAsync = require('./catchAsync')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const User = require('../model/user')

const protect = catchAsync(async (req, res, next) => {

    const authHeader = req.headers.authorization
    console.log("authHeader",authHeader);

    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {

        res.status(401).json({ message: "you are not logged in, please login first" })
    }
console.log("token ",token);

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) return res.json({ error: "unuthorized" })
        const user = await User.find({ email: decoded.email })
        req.user = user
        next()
    })


})

module.exports = protect
