const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tableReservationSchema = new Schema({
    customerName: { 
        type: String, 
        required: true 
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    tableNo: {
        type: String, 
        required: true
    },
    date: { 
        type: Date, 
        required: true 
    },
    timeFrom: { 
        type: String, 
        required: true 
    },
    timeTo: { 
        type: String, 
        required: true 
    },
    numberOfGuests: { 
        type: Number, 
        required: true 
    },
});

const TableReservation = mongoose.model("TableReservation", tableReservationSchema);

module.exports = TableReservation;
