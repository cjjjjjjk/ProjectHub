const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const bcrypt = require('bcrypt')


// Hai =============================== user routing
// helper ========================================
// hash password
const hashPassword = async (password) => {
    const saltRound = 10;
    const passwordHashed = await bcrypt.hash(password, saltRound)
    return passwordHashed;
}

// routing =======================================
router.get('/', async (req, res) => {
    res.send("Hello fuck you")
})
// create new user ------------------------------
router.post('/', async (req, res) => {
    try {
        const { username, email, name, password } = req.body

        // hash password -------
        const hashpw = (password) ? await hashPassword(password) : null;

        const newUser = await Users.create({ username, email, name, password: hashpw })
        return res.json({ message: "User created successfully!", id: newUser.id });

    } catch (err) {
        let errorList = []
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            const errors = err.errors
            errors.map(e => {
                errorList.push(e.message)
                return errorList;
            })
        } else {
            console.log("CREATE USER ERROR !", err)
            errorList.push(err.message)
        }
        return res.status(400).json({
            success: false,
            message: errorList
        })
    }
})

module.exports = router