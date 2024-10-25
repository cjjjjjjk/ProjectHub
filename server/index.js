const express = require('express');
const app = express();
const db = require('./models');
const bodyParser = require("body-parser");
const projectRoutes = require("./routes/projects");
const errorHandler = require("./middleware/errorHandler");

app.use(bodyParser.json());
app.use("/projects", projectRoutes);
app.use(errorHandler);

app.use(express.json());// parse the data sent by client in json format
const cors = require('cors');
app.use(cors());


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const userRouter = require('./routes/users')
app.use('/api/users', userRouter)