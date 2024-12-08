const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const outdoorReservationSchema = new Schema({
    customerName: { 
        type: String, 
        required: true 
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    eventType: { 
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

// Corrected typo in model name
const OutdoorReservation = mongoose.model('OutdoorReservation', outdoorReservationSchema);

module.exports = OutdoorReservation; // Corrected export
