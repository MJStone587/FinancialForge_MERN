const express = require('express');
const mongoose = require('mongoose');
const catalogRouter = require('./routes/catalog');
const indexRouter = require('./routes/index');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.set('strictQuery', true);
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connection to MongoDB database established successfully');
});
app.use('/', indexRouter);
app.use('/catalog', catalogRouter);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
