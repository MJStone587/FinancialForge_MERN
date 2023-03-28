const express = require('express');
const mongoose = require('mongoose');
const catalogRouter = require('./routes/catalog');
const cors = require('cors');
//"proxy": "http://localhost:5000", added to client package.json for local hosting
require('dotenv').config();

const app = express();
app.use(cors);
const port = process.env.PORT || 5000;

app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.set('strictQuery', false);
mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on port ${port} and connected to DB`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use('/catalog', catalogRouter);
