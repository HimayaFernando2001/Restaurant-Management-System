const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());


const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection success!");
});

const outdoorReservationRoutes = require('./routes/outdoorReservation');
const roomReservationRoutes = require('./routes/roomReservation');
const tableReservationRoutes = require('./routes/tableReservation');
const customerRoutes = require('./routes/customer');

app.use('/outdoorReservation', outdoorReservationRoutes);
app.use('/roomReservation', roomReservationRoutes);
app.use('/tableReservation', tableReservationRoutes);
app.use('/customer', customerRoutes);

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
