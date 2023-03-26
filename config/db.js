const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.set("strictQuery", true).connect(
      process.env.MONGO_URI,
      {
        // useCreateIndex: true,
        // useFindAndModify: false,
        useNewUrlParser: true,
        // useUnifiedTopology: true,
      },
      (err) => {
        if (err) throw err;
        console.log("Connected to MongoDB.");
      }
    );
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectDB;
