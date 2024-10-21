const express = require('express')
const router = express.Router()
const { Users } = require('../models')

// Hai ------------------------------ user routing
router.get('/', async (req, res) => {
    res.send("Hello fuck you")
})
// create new user -------------------
router.post('/', async (req, res) => {
    try {
        const user = req.body
        const newUser = await Users.create(user)
        return res.json({ message: "User created successfully!", id: newUser.id });
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors

            let errorList = []
            errors.map(e => {
                errorList.push(e.message)
                return errorList;
            })
            return res.status(400).json({
                success: false,
                message: errorList
            })
        } else {
            next(new ErrorResponse(`Create user ERR:${req.body.name}`, 404))
        }
    }
})

module.exports = router