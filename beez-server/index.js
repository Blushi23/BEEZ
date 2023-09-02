const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const users = require("./routes/users");
const cards = require("./routes/cards");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
// app.use(morgan('tiny'));
app.use("/api/users", users);
app.use("/api/cards", cards);


app.listen(port, () => console.log("Server started on port", port));