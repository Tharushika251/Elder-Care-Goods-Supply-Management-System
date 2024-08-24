const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
require('dotenv').config(); // Load dotenv at the beginning

const app = express();
const PORT = process.env.PORT || 8072;

app.use(cors({
  origin:["http://localhost:3000"],
  methods:['GET', 'POST', 'PUT','DELETE'],
  credentials: true
}));
app.use(bodyParser.json());



const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Success!");
});

const caretakerRouter =require('./routes/caretakers.js');
const newpackageRouter =require('./routes/newpackages.js');


app.use('/caretaker',caretakerRouter);
app.use('/newpackage',newpackageRouter);



app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
