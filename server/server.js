const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")
const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.use('/api', require('./src/routes/routes'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });