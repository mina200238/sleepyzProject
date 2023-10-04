const express = require('express');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // body-parser

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
