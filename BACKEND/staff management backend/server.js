const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors({
    origin:["http://localhost:3000"],
    methods:['GET', 'POST', 'PUT','DELETE'],
    credentials: true
}));
app.use(bodyParser.json());

const URI = process.env.MONGODB_URL; 

mongoose.connect(URI, {
    
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection success!");
});

const staffRouter = require("./routes/staffs.js");
const adminRouter = require("./routes/admins.js");
const salaryRouter = require("./routes/salarys.js");
const staffloginRouter = require("./routes/stafflogin.js");

app.use("/staff",staffRouter);
app.use("/admin",adminRouter);
app.use("/salary",salaryRouter);
app.use("/salary",salaryRouter);
app.use("/stafflogin",staffloginRouter);
app.use(express.static('Public'))



app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
