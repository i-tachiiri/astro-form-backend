require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mapRoutes = require('./routes/mapRoutes');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.use('/map', mapRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
