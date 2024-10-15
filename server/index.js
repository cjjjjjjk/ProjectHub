const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());// parse the data sent by client in json format
const cors = require('cors');
app.use(cors());

const userRouter = require('./routes/user')
app.use('/user', userRouter)

app.listen(3001, () => {
  console.log('Server running on port 3001');
}); 