const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
  console.log("Landing")
  res.status(200).send("hi")
})

app.use("/login",require("./routes/userRoutes"));

app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/summarise", require("./routes/summariseRoutes"));

app.use(errorHandler);
// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
