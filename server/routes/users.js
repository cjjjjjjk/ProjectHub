const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const { validateToken } = require('../middleware/auth')

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
        return res.status(400).json({
            success: false,
            message: errorList
        })
    }
})
// update user --------------
// PUT: http://localhost:3001/api/users/update-profile
router.put('/update-profile', validateToken,
    async (req, res) => {
        const update = req.body
        try {
            const userId = req.user['user'].id;
            const user = await Users.findByPk(userId);


            await Users.update({
                name: update.name != null ? update.name : user.name,
                bio: update.bio !== null ? update.bio : user.bio,
                phone: update.phone !== null ? update.phone : user.phone,
                social_link: update.social_link !== null ? update.social_link : user.social_link,
                company: update.company !== null ? update.company : user.company,
                location: update.location !== null ? update.location : user.location,
                avatar: update.avatar !== null ? update.avatar : user.avatar,
                email: update.email !== null ? update.email : user.email,
                username: update.username !== null ? update.username : user.username
            }, { where: { id: userId } });

            return res.json({ message: `User ${userId} updated !`, update: update })
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
        const token = jwt.sign({ user: { id: user.id, username: user.username } }, (secret_key) ? secret_key : "abcd-1234", { expiresIn: process.env.EXPIRED_TOKEN })

        return res.json({ success: true, message: `Login success!`, token: token })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
})

module.exports = router