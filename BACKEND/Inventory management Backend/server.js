const express = require("express");
const mongoose = require("mongoose");
const { connectDB, PORT } = require("./Config/db.js"); // Importing connectDB function and PORT variable
const cors = require("cors");
const app = express();
const InventoryRoute = require("./Routes/InventoryRoutes.js");
const InfromyRoute = require("./Routes/InfromSupplyRoutes.js");
const SupplyRoute = require("./Routes/InfromSupplyRoutes.js");
connectDB(); 

app.use(cors());
app.use(express.json());

//Routes
app.use("/inventory", InventoryRoute);
app.use("/infrom", InfromyRoute);
app.use("/supply", SupplyRoute);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});


//Login Register Functions
//-------Register
require("./Model/Register");
const User = mongoose.model("Register");
app.post("/register", async (req, res) => {
  const { name, gmail, password } = req.body;
  try {
    await User.create({
      name,
      gmail,
      password,
    });
    res.send({ status: "ok" });
  } catch (err) {
    res.send({ status: "err" });
  }
});
//Login --------------------
app.post("/login", async (req, res) => {
  const { gmail, password } = req.body;
  try {
    const user = await User.findOne({ gmail });
    if (!user) {
      return res.json({ err: "user Not Found" });
    }
    if (user.password === password) {
      return res.json({ status: "ok" });
    } else {
      return res.json({ err: "incorret Password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "server Err" });
  }
});
