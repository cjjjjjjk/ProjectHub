const express = require('express');
const app = express();
const db = require('./models');


app.use(express.json());// parse the data sent by client in json format
const cors = require('cors');
app.use(cors());


const PORT = process.env.PORT || 3001;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
})


// ROUTER ====================
const userRouter = require('./routes/users')
app.use('/users', userRouter)

const projectRouter = require("./routes/projects");
app.use("/projects", projectRouter);

const joinProjectRouter = require("./routes/project_joineds")
app.use("/project-joineds", joinProjectRouter)

const taskRouter = require("./routes/tasks")
app.use("/tasks", taskRouter)
