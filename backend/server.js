const express = require("express");
const dotenv = require("dotenv").config();
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

app.use("/api/summarise", require("./routes/summariseRoutes"));

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
