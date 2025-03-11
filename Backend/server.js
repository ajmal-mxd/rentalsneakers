require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models/db");

const userroutes=require('./routes/userroutes')

db.connect();

const app = express();
app.use(express.json());
app.use(cors());



    

app.use('/user',userroutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));