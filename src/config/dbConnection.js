const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    console.log("Mongo URI exists:", !!process.env.CONNECTION_STRING)
    mongoose.set("bufferCommands", false);
    const connection = await mongoose.connect(process.env.CONNECTION_STRING)
    console.log("Database connected to db",connection.connection.name,"at port",connection.connection.port)

    return connection
  } catch (err) {
    console.error("Mongo connection failed:", err)
    console.log(err)
  }
};

module.exports = dbConnect;
