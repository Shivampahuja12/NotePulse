const express = require('express');
const cors = require('cors');
const noteRoutes = require('./routes/note.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", noteRoutes);

module.exports = app;
