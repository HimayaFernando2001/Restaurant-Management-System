const express = require("express");
const router = express.Router();
const OutdoorReservation = require("../models/OutdoorReservation");
const nodemailer = require("nodemailer");
const moment = require("moment");
require("dotenv").config();

// Add Outdoor Reservation
router.route("/add").post(async (req, res) => {
    const { customerName, email, phoneNumber, eventType, date, timeFrom, timeTo, numberOfGuests } = req.body;

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

        // Step 1: Check Availability
        const conflictingReservation = await OutdoorReservation.findOne({
            date: date,
            $or: [
                { timeFrom: { $lt: timeTo, $gte: timeFrom } },
                { timeTo: { $gt: timeFrom, $lte: timeTo } },
                { timeFrom: { $lte: timeFrom }, timeTo: { $gte: timeTo } },
                { timeFrom: { $gte: timeFrom }, timeTo: { $lte: timeTo } }
            ]
        });

        if (conflictingReservation) {
            return res.status(400).json({ message: "Outdoor space is not available for the selected time." });
        }

        // Step 2: Save New Reservation
        const newOutdoorReservation = new OutdoorReservation({
            customerName,
            email,
            phoneNumber,
            eventType,
            date,
            timeFrom,
            timeTo,
            numberOfGuests,
        });

        await newOutdoorReservation.save();

        // Step 3: Send Confirmation Email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS  
            },
            tls: {
                rejectUnauthorized: false // Allow invalid certificates for Gmail
            },
            connectionTimeout: 4000 
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reservation Confirmation - Your Outdoor Space is Ready!',
            html: `
                <h2>Dear ${customerName},</h2>
                
                <p>We are delighted to confirm your reservation for ${eventType}. Here are the details of your booking:</p>
        
                <table style="border-collapse: collapse; width: 100%;">
                    <tr style="border-bottom: 1px solid #dddddd;">
                        <td style="padding: 8px;">Event Type:</td>
                        <td style="padding: 8px;"><strong>${eventType}</strong></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #dddddd;">
                        <td style="padding: 8px;">Reservation Date:</td>
                        <td style="padding: 8px;"><strong>${date}</strong></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #dddddd;">
                        <td style="padding: 8px;">Time (From):</td>
                        <td style="padding: 8px;"><strong>${timeFrom}</strong></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #dddddd;">
                        <td style="padding: 8px;">Time (To):</td>
                        <td style="padding: 8px;"><strong>${timeTo}</strong></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #dddddd;">
                        <td style="padding: 8px;">Number of Guests:</td>
                        <td style="padding: 8px;"><strong>${numberOfGuests}</strong></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #dddddd;">
                        <td style="padding: 8px;">Phone Number:</td>
                        <td style="padding: 8px;"><strong>${phoneNumber}</strong></td>
                    </tr>
                </table>
                
                <br/>
                <p>If you need to make any changes to your reservation, please contact us at least 24 hours in advance.</p>
                
                <p><strong>Cancellation Policy:</strong> If you need to cancel or reschedule, kindly inform us at least 24 hours before your reservation to avoid any charges.</p>
                
                <br/>
                <p>Best regards,</p>
                <p><strong>The Outdoor Team</strong></p>
                <hr/>
                <p style="font-size: 12px; color: #555;">This is an automated email. Please do not reply to this message.</p>
                <p style="font-size: 12px; color: #555;">Visit our website: <a href="https://www.yourrestaurant.com" target="_blank">www.yourrestaurant.com</a></p>
            `
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ message: "Reservation added, but failed to send confirmation email.", error: error.message });
            }
            console.log('Email sent: ' + info.response);
            res.status(201).json("Outdoor Reservation Added and Email Sent");
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding reservation", error: err.message });
    }
});

// View All Reservations
router.route("/").get(async (req, res) => {
    try {
        const outdoorReservations = await OutdoorReservation.find();
        res.status(200).json(outdoorReservations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving reservations", error: err.message });
    }
});

// Update Reservation
router.route("/update/:id").put(async (req, res) => {
    const userId = req.params.id;
    const { customerName, email, phoneNumber, eventType, date, timeFrom, timeTo, numberOfGuests } = req.body;

    const updateOutdoorReservation = {
        customerName,
        email,
        phoneNumber,
        eventType,
        date,
        timeFrom,
        timeTo,
        numberOfGuests,
    };

    try {
        // Validate time format (24-hour format)
        if (!moment(timeFrom, "HH:mm", true).isValid() || !moment(timeTo, "HH:mm", true).isValid()) {
            return res.status(400).json({ message: "Invalid time format, must be HH:mm (24-hour format)" });
        }

        // Step 2: Check Availability Excluding Current Reservation
        const conflictingReservation = await OutdoorReservation.findOne({
            _id: { $ne: userId },
            date: date,
            $or: [
                { timeFrom: { $lt: timeTo, $gte: timeFrom } },
                { timeTo: { $gt: timeFrom, $lte: timeTo } },
                { timeFrom: { $gte: timeFrom, $lt: timeTo }, timeTo: { $lte: timeTo } }
            ]
        });

        if (conflictingReservation) {
            return res.status(400).json({ message: "Outdoor space is not available for the selected time." });
        }

        // Update the reservation
        const updatedReservation = await OutdoorReservation.findByIdAndUpdate(userId, updateOutdoorReservation, { new: true });
        if (!updatedReservation) {
            return res.status(404).send({ status: "Reservation not found" });
        }

        res.status(200).send({ status: "Reservation Updated", reservation: updatedReservation });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

// Delete Reservation
router.route("/delete/:id").delete(async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedReservation = await OutdoorReservation.findByIdAndDelete(userId);
        if (!deletedReservation) {
            return res.status(404).send({ status: "Reservation not found" });
        }
        res.status(200).send({ status: "Reservation Deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with deleting reservation", error: err.message });
    }
});

// Search Reservation by Customer Name
router.get('/search/:customerName', async (req, res) => {
    try {
        const reservations = await OutdoorReservation.find({ customerName: req.params.customerName });
        if (reservations.length === 0) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error searching for reservation", error: error.message });
    }
});

module.exports = router;
