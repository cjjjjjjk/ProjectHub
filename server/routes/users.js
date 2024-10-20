const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validateToken } = require('../middleware/auth')
require('dotenv').config();


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
// POST: http://localhost:3001/api/users/sign-up
router.post('/sign-up', async (req, res) => {
    try {
        const { username, email, name, password } = req.body

        // hash password -------
        const hashpw = (password) ? await hashPassword(password) : null;

        const newUser = await Users.create({
            username,
            email,
            name,
            password: hashpw,
            bio: "",
            phone: "",
            social_link: "",
            company: "",
            location: "",
            image: ""
        })
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
// update user --------------
// PATCH: http://localhost:3001/api/users/update/<userID>
router.patch('/update/:id', validateToken, async (req, res) => {
    const id = req.params.id
    const update = req.body

    try {
        if (Object.keys(update).length === 0) {
            const error = new Error("Nothing to update!");
            error.status = 400;
            throw error;
        }

        const user = await Users.findOne({ where: { id } });
        if (!user) {
            throw new Error(`User ID:${id} not found !`)
        }

        await Users.update(update, {
            where: { id }
        });

        return res.json({ message: `User ${id} updated`, update: update })
    } catch (err) {

        if (err.name == "SequelizeUniqueConstraintError") return res.status(404).json({ message: "Email or username already exists !" })
        return res.status(404).json({ message: err.message })
    }

})
// login -------------------------------
// POST: http://localhost:3001/api/users/login?username=hai123&password=123456
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

        // json web token ---------------
        // file .env : SCRET_KEY = <scret_key>
        const secret_key = process.env.SECRET_KEY
        const token = jwt.sign({ user: { id: user.id, username: user.username } }, (secret_key) ? secret_key : "abcd-1234")

        return res.json({ success: true, message: `Login success!`, token: token })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
})


// remove user ---------------------------
// DELETE: http://localhost:3001/api/users/delete/<userID>
router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id
        const user = await Users.findOne({ where: { id } });
        if (!user) {
            throw new Error(`User ID:${id} not found !`)
        }
        Users.destroy({
            where: { id }
        })
        return res.json({ message: `User Id:${id} deleted !` })
    } catch (err) {
        return res.status(404).json({ message: err.message })
    }

})
module.exports = router