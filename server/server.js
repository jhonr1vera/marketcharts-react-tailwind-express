const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser")
const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true
};

app.use(session({
    secret: 'tu_secreto_para_la_sesion',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.use('/api', require('./src/routes/routes'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });