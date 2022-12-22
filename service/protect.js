
const catchAsync=require('./catchAsync')
const jwt =require('jsonwebtoken')
const {promisify} =require('util')
const User=require('../model/user')
const { log } = require('console')

const protect = catchAsync(async (req, res, next) => {

    const authHeader = req.headers.authorization
    console.log("authHeader",authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        res.status(401).json({message:"you are not logged in, please login first"})
    }

    const decode=await promisify(jwt.verify)(token,process.env.SECRET_KEY)
    const user=User.findById(decode.sub)

    // jwt.verify(token,process.env.SECRET_KEY,(err, decoded) => {
    //     if (err) return res.json({ error: "unuthorized" })
    //     req.user = decoded
    //     next()  
    // })

    if(!user){
        res.status(400).json({message:"the belogging token is not loger exist"})
    }

    req.user=user
    next()

})

module.exports=protect
