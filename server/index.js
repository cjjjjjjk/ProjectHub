const express = require('express');
const app = express();
const db = require('./models');


const userRouter = require('./routes/users')
const projectRouter = require("./routes/projects");


app.use(express.json());// parse the data sent by client in json format
const cors = require('cors');
app.use(cors());


const PORT = process.env.PORT || 3001;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
})
app.use('/users', userRouter)
app.use("/projects", projectRouter);