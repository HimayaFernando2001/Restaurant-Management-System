const express = require('express');
const bcrypt = require('bcrypt');
const NewCustomer = require('../models/NewCustomer');
const OutdoorReservation = require('../models/OutdoorReservation');
const TableReservation = require('../models/TableReservation');
const RoomReservation = require('../models/RoomReservation');
const router = express.Router();

// Add a new customer route
router.post('/add', async (req, res) => {
    const { name, email, phone, password } = req.body;

    // Validate input fields
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newCustomer = new NewCustomer({
            name,
            email,
            phone,
            password: hashedPassword,
        });

        await newCustomer.save();
        res.status(201).json({
            success: true,
            message: 'New customer added successfully',
            customer: {
                id: newCustomer._id,
                name: newCustomer.name,
                email: newCustomer.email,
                phone: newCustomer.phone,
            },
        });
    } catch (err) {
        console.error('Error adding new customer:', err);
        res.status(500).json({ success: false, message: 'Error adding new customer', error: err.message });
    }
});

// Login route (without JWT)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await NewCustomer.findOne({ email });
        if (!customer) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Return customer details for successful login
        res.json({
            success: true,
            customer: {
                id: customer._id,
                name: customer.name,
                email: customer.email,
            },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Profile route (fetch using email stored in local storage)
router.get('/profile/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const customer = await NewCustomer.findOne({ email });
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        // Fetch reservations based on customer email
        const outdoorReservations = await OutdoorReservation.find({ email: customer.email });
        const tableReservations = await TableReservation.find({ email: customer.email });
        const roomReservations = await RoomReservation.find({ email: customer.email });

        // Logging for debugging
        console.log('Outdoor Reservations:', outdoorReservations);
        console.log('Table Reservations:', tableReservations);
        console.log('Room Reservations:', roomReservations);

        // Return customer details and their reservations
        res.json({
            success: true,
            customer: {
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
            },
            outdoorReservations,
            tableReservations,
            roomReservations,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
