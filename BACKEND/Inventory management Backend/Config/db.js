const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://admin:jiCG8f44dLD88zfS@cluster0.evmm97r.mongodb.net/"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
  }
};

module.exports = { connectDB, PORT: 8080 }; // Exporting connectDB function and PORT variable
