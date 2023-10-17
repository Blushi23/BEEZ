const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require('path');
const rfs = require('rotating-file-stream');
const cors = require("cors");
const users = require("./routes/users");
const cards = require("./routes/cards");
const favorites = require("./routes/favorites");
require("dotenv").config();
const chalkModule = import('chalk');

const app = express();
const port = process.env.PORT || 5000;

import('chalk').then((chalk) => {
    mongoose.connect(process.env.DB, { useNewUrlParser: true })
        .then(() => console.log(chalk.default.blue("MongoDB connected")))
        .catch((err) => console.log(err));
});

app.use(express.json());
app.use(cors());
app.use(morgan(':date[clf] :method :url :status :response-time ms'));
app.use("/api/users", users);
app.use("/api/cards", cards);
app.use("/api/favorites", favorites);

app.listen(port, async () => {
    let chalk = await chalkModule;
    console.log(chalk.default.blue(`Server started on port ${port}`));
});

import('chalk').then((chalk) => {
    morgan.token('status', (req, res) => {
        const status = res.statusCode;
        let color = null;
        if (status >= 200) color = chalk.default.green(status);
        if (status >= 400 && status < 500) color = chalk.default.red(status);
        if (status >= 500) color = chalk.default.yellow(status);
        return color || status;
    });
})

const accessLogStream = rfs.createStream('errors.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs')
})
app.use(morgan("common", { stream: accessLogStream, skip: function (req, res) { return res.statusCode < 400 } }));