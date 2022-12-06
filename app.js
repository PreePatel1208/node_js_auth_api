require('dotenv').config()
require('./config/database').connect()
const express = require('express')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())

app.post("/register", async (req, res) => {

    try {

        const { firstname, lastname, email, password } = req.body
        if (!(firstname && lastname && email)) {
            res.status(400).send("All input are rrequire")
        }
        const oldUser = await User.findOne({ email })

        if (oldUser) {
            res.status(400).send("user is already exists")
        }

        const bcryptPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            firstname,
            lastname,
            email: email.toLowerCase(),
            password: bcryptPassword,

        })

        const token = jwt.sign({
            email: email, password: password
        }, process.env.SECRET_KEY, {
            expiresIn: "2h"
        });
        user.token = token
        res.status(201).send({ message: "Success", data: user })

    } catch (error) {
        console.log("errors==>", error);
    }

})

app.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (user && (bcrypt.compare(password, user.password))) {
            const token = jwt.sign({
                email: email, password: password
            }, process.env.SECRET_KEY, {
                expiresIn: "2h"
            });
            user.token = token
            res.status(201).send({ message: "Success", data: "login successfully" })
        }
        res.status(400).send({ message: "Success", data: "invalid credentials" })

    } catch (error) {
        console.log("error", error);
    }

})
module.exports = app



