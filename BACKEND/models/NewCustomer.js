const mongoose = require('mongoose');

const newCustomerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
}, { timestamps: true });

const NewCustomer = mongoose.model('NewCustomer', newCustomerSchema);

module.exports = NewCustomer;
