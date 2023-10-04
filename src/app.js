const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      // useNewUrlParse: true,
    });
  } catch (err) {
    console.log(err);
  }
};

connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // body-parser

app.get('/', (req, res) => {
  res.send('hello');
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
