const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomReservationSchema = new Schema({

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
    roomType: { 
        type: String, 
        enum: ['AC', 'Normal', 'VIP'], 
        required: true 
    },
    roomNumber: {
        type: String,
        required: true
    },
    checkInDate: { 
        type: Date, 
        required: true 
    },
    checkInTime: { 
        type: String, 
        required: true 
    },
    checkOutDate: { 
        type: Date, 
        required: true 
    },
    checkOutTime: { 
        type: String, 
        required: true 
    },
    numberOfGuests: { 
        type: Number, 
        required: true 
    },
    
    
});

const RoomReseravtion = mongoose.model("RoomReservation",roomReservationSchema);

module.exports = RoomReseravtion;