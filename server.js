require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
let port = process.env.PORT || 3000;



mongoose.connect(
  process.env.DATABASE_URL, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to db successfully");
});

app.use(express.json())

const ordersRouter = require('./routes/orders')
app.use('/orders', ordersRouter)


app.listen(port , () => console.log('server started'))