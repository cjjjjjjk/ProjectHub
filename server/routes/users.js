const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const bcrypt = require('bcrypt')
const { where } = require('sequelize')


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
// login ----------------------
router.post("/login", async (req, res) => {
    try {

        const { username, password } = req.body

        if (!username || !password) {
            throw new Error("Username and password can not be empty !")
        }

        const user = await Users.findOne({ where: { username: username } })
        if (!user) { throw new Error("Incorrect username or password.") };

        // compare password -------
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Incorrect username or password.");
        }

        return res.json({ success: true, message: `Login success, userID: ${user.id}` })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }

})

module.exports = router