require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')



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


app.listen(3000 , () => console.log('server started'))