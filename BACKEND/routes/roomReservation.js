const express = require('express');
const router = express.Router();
let RoomReservation = require("../models/RoomReservation");

const nodemailer = require('nodemailer');
const moment = require('moment');
require('dotenv').config();

// Add Room Reservation
router.route("/add").post(async (req, res) => {
    const {
        customerName,
        email,
        phoneNumber,
        roomType,
        roomNumber,
        checkInDate,
        checkInTime,
        checkOutDate,
        checkOutTime,
        numberOfGuests
    } = req.body;

    try {
        // Step 1: Validate Customer Name 
        const nameRegex = /^[A-Za-z\s]+$/; 
        if (!nameRegex.test(customerName)) {
            return res.status(400).json({ message: "Customer name can only contain letters and spaces." });
        }

        // Step 2: Validate Email 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format. Must contain an '@' and valid domain." });
        }

        // Step 3: Check Time Format 
        if (!moment(checkInTime, "HH:mm", true).isValid() || !moment(checkOutTime, "HH:mm", true).isValid()) {
            return res.status(400).json({ message: "Invalid time format, must be HH:mm (24-hour format)" });
        }

        // Validation for phoneNumber
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({ message: "Phone number must be exactly 10 digits." });
        }

        // Step 2: Check Room Availability
        const conflictingReservation = await RoomReservation.findOne({
            roomNumber: roomNumber,
            $or: [
                {
                    checkInDate: checkInDate,
                    checkInTime: { $lt: checkOutTime, $gte: checkInTime }
                },
                {
                    checkOutDate: checkOutDate,
                    checkOutTime: { $gt: checkInTime, $lte: checkOutTime }
                },
                {
                    checkInDate: { $gte: checkInDate, $lte: checkOutDate },
                    checkOutDate: { $gte: checkInDate, $lte: checkOutDate }
                }
            ]
        });

        if (conflictingReservation) {
            return res.status(400).json({ message: "Room is not available for the selected dates and times." });
        }

        // Step 3: Create new reservation
        const newRoomReservation = new RoomReservation({
            customerName,
            email,
            phoneNumber,
            roomType,
            roomNumber,
            checkInDate,
            checkInTime,
            checkOutDate,
            checkOutTime,
            numberOfGuests
        });

        await newRoomReservation.save();

        // Step 4: Send Confirmation Email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS  
            },
            tls: {
                rejectUnauthorized: false 
            },
            connectionTimeout: 4000 
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Room Reservation Confirmation',
            html: `
                <h2>Dear ${customerName},</h2>
                <p>Your room reservation has been confirmed. Here are the details:</p>
                <ul>
                    <li>Room Type: ${roomType}</li>
                    <li>Room Number: ${roomNumber}</li>
                    <li>Check-in Date: ${checkInDate}</li>
                    <li>Check-in Time: ${checkInTime}</li>
                    <li>Check-out Date: ${checkOutDate}</li>
                    <li>Check-out Time: ${checkOutTime}</li>
                    <li>Number of Guests: ${numberOfGuests}</li>
                </ul>
                <p>We look forward to hosting you!</p>
                <p><strong>Best Regards,</strong><br>The Hotel Team</p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ message: "Reservation added, but failed to send confirmation email.", error: error.message });
            }
            console.log('Email sent: ' + info.response);
            res.status(201).json("Room Reservation Added and Email Sent");
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding reservation", error: err.message });
    }
});

// View All Room Reservations
router.route("/").get(async (req, res) => {
    try {
        const roomReservations = await RoomReservation.find();
        res.status(200).json(roomReservations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving room reservations", error: err.message });
    }
});

// Update Room Reservation
router.route("/update/:id").put(async (req, res) => {
    const reservationId = req.params.id;
    const { customerName, email, phoneNumber, roomType, roomNumber, checkInDate, checkInTime, checkOutDate, checkOutTime, numberOfGuests } = req.body;

    const updateRoomReservation = {
        customerName,
        email,
        phoneNumber,
        roomType,
        roomNumber,
        checkInDate,
        checkInTime,
        checkOutDate,
        checkOutTime,
        numberOfGuests
    };

    try {
        // Step 1: Validate time format
        if (!moment(checkInTime, "HH:mm", true).isValid() || !moment(checkOutTime, "HH:mm", true).isValid()) {
            return res.status(400).json({ message: "Invalid time format, must be HH:mm (24-hour format)" });
        }

        // Step 2: Check availability excluding the current reservation
        const conflictingReservation = await RoomReservation.findOne({
            _id: { $ne: reservationId },
            roomNumber: roomNumber,
            $or: [
                { checkInDate: checkInDate, checkInTime: { $lt: checkOutTime, $gte: checkInTime } },
                { checkOutDate: checkOutDate, checkOutTime: { $gt: checkInTime, $lte: checkOutTime } },
                { checkInDate: { $gte: checkInDate, $lte: checkOutDate }, checkOutDate: { $gte: checkInDate, $lte: checkOutDate } }
            ]
        });

        if (conflictingReservation) {
            return res.status(400).json({ message: "Room is not available for the selected dates and times." });
        }

        // Step 3: Update reservation
        const updatedReservation = await RoomReservation.findByIdAndUpdate(
            reservationId,
            updateRoomReservation,
            { new: true }
        );

        if (!updatedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        res.status(200).json({
            message: "Reservation Updated",
            reservation: updatedReservation
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating reservation", error: err.message });
    }
});

// Delete Room Reservation
router.route("/delete/:id").delete(async (req, res) => {
    const reservationId = req.params.id;

    try {
        const deletedReservation = await RoomReservation.findByIdAndDelete(reservationId);

        if (!deletedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        res.status(200).json({ message: "Reservation Deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting reservation", error: err.message });
    }
});

// Search Room Reservation by Customer Name
router.route("/search/:customerName").get(async (req, res) => {
    const customerName = req.params.customerName;

    try {
        const reservations = await RoomReservation.find({ customerName: customerName });

        if (reservations.length === 0) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        res.status(200).json(reservations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error searching for reservation", error: err.message });
    }
});

module.exports = router;
