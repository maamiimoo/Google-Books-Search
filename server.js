require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
// const cors = require('cors');
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serving up static assets (usually on Heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
};

// add routes for API and view
app.use(routes);

// connect to MongoDB
const MONGODB_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds157459.mlab.com:57459/heroku_vh0wd2hf`
console.log(MONGODB_URI)
const locally = "mongodb://localhost/google-books-search-react"
mongoose.connect(isProd ? process.env.MONGODB_URI : locally, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});



// Start API server
app.listen(PORT, () => {
  if (mongoose.connect === process.env.MONGODB_URI) {
    console.log(`🌎 ==> API Server now listening remotely on heroku `);
  }
    console.log(`🌎 ==> API Server now listening on http://localhost:${PORT}!`);
});