const express = require("express");
const app = express();
const db = require("./models");

const cors = require("cors");
app.use(express.json());
app.use(cors());


const authRouter = require("./routes/auth");
const projectsRouter = require("./routes/projects");
const { validateToken } = require("./middleware/auth");

app.use("/auth", authRouter);

app.use("/projects", validateToken, projectsRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
