const express = require("express");
const cors = require('cors');
require('dotenv').config();
const app  = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());




app.get('/', (req, res) => {
    res.send('CarExpo Server is runing!')
  })
  
  app.listen(port, () => {
    console.log(`CarExpo Server is running on ${port}`)
  })