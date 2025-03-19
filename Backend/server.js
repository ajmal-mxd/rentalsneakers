require("dotenv").config();
const express = require("express");
const db = require("./models/db");
const sneakerRoutes = require("./routes/sneakerRoutes");
const cors = require("cors");
const userroutes=require('./routes/userroutes')


db.connect();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/sneaker", sneakerRoutes);
app.use('/user',userroutes);
app.use(cors({ 
    origin: ["http://localhost:5173"],  // Allow Vite frontend
    credentials: true
  }));

  





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));