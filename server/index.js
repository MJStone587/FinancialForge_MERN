const express = require('express');
const mongoose = require('mongoose');
const catalogRouter = require('./routes/catalog');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 10000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
  })
);

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
