const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

//create server
const app = express();

//connect to db
connectDB();

//CORS
app.use(cors());

//express.json to read data from users
app.use(express.json({ extended: true }));

//app port
const PORT = process.env.PORT || 4000;

// Import routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/tasks", require("./routes/tasks"));

//define app
app.get("/", (req, res) => {
  res.send("Hello World");
});
//launch server
app.listen(PORT, () => {
  console.log(`Server working at ${PORT}`);
});
