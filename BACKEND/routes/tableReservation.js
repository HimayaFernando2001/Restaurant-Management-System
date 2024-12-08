const express = require('express');
const router = express.Router();
const TableReservation = require("../models/TableReservation");
const nodemailer = require('nodemailer');
const moment = require('moment');
require('dotenv').config(); // Load environment variables from .env file

// Add Table Reservation
router.route("/add").post(async (req, res) => {
    const { customerName, email, phoneNumber, tableNo, date, timeFrom, timeTo, numberOfGuests } = req.body;

    try {
        // Validate time format (24-hour format)
        if (!moment(timeFrom, "HH:mm", true).isValid() || !moment(timeTo, "HH:mm", true).isValid()) {
            return res.status(400).json({ message: "Invalid time format, must be HH:mm (24-hour format)" });
        }

        // Step 1: Check Table Availability
        const conflictingReservation = await TableReservation.findOne({
            tableNo: tableNo,
            date: date,
            $or: [
                { timeFrom: { $lt: timeTo, $gte: timeFrom } },
                { timeTo: { $gt: timeFrom, $lte: timeTo } },
                { timeFrom: { $gte: timeFrom, $lt: timeTo }, timeTo: { $lte: timeTo } }
            ]
        });

        if (conflictingReservation) {
            return res.status(400).json({
                message: "Table is not available for the selected date and time.",
                conflict: conflictingReservation
            });
        }

        // Step 2: Create new reservation
        const newTableReservation = new TableReservation({
            customerName,
            email,
            phoneNumber,
            tableNo,
            date,
            timeFrom,
            timeTo,
            numberOfGuests
        });

        await newTableReservation.save();

        // Step 3: Send Confirmation Email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Ensure EMAIL_USER is set in your .env file
                pass: process.env.EMAIL_PASS  // Ensure EMAIL_PASS is set in your .env file (Use App Password if 2FA is enabled)
            },
            tls: {
                rejectUnauthorized: false // Allow invalid certificates for Gmail
            },
            connectionTimeout: 10000 // 10-second timeout for the SMTP connection
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: email,
            subject: 'Reservation Confirmation - Your Table is Ready!',
            html: `
                <h2>Dear ${customerName},</h2>
                
                <p>We are delighted to confirm your reservation at our restaurant. Here are the details of your booking:</p>
        
                <table style="border-collapse: collapse; width: 100%;">
                    <tr style="border-bottom: 1px solid #dddddd;">
                        <td style="padding: 8px;">Table Number:</td>
                        <td style="padding: 8px;"><strong>${tableNo}</strong></td>
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
                
                <p>We look forward to hosting you at our restaurant! For any further assistance, feel free to reach us at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a> or call us at +1 (555) 123-4567.</p>
                
                <p><strong>Cancellation Policy:</strong> If you need to cancel or reschedule, kindly inform us at least 24 hours before your reservation to avoid any charges.</p>
                
                <br/>
                <p>Best regards,</p>
                <p><strong>The Restaurant Team</strong></p>
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
            res.status(201).json("Table Reservation Added and Email Sent");
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding reservation", error: err.message });
    }
});

// View All Reservations
router.route("/").get(async (req, res) => {
    try {
        const tableReservations = await TableReservation.find();
        res.status(200).json(tableReservations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving reservations", error: err.message });
    }
});

// Update Reservation
router.route("/update/:id").put(async (req, res) => {
    const userId = req.params.id;
    const { customerName, email, phoneNumber, tableNo, date, timeFrom, timeTo, numberOfGuests } = req.body;

    const updateTableReservation = {
        customerName,
        email,
        phoneNumber,
        tableNo,
        date,
        timeFrom,
        timeTo,
        numberOfGuests
    };

    try {
        // Step 1: Check Time Format
        if (!moment(timeFrom, "HH:mm", true).isValid() || !moment(timeTo, "HH:mm", true).isValid()) {
            return res.status(400).json({ message: "Invalid time format, must be HH:mm (24-hour format)" });
        }

        // Step 2: Check Availability Excluding Current Reservation
        const conflictingReservation = await TableReservation.findOne({
            _id: { $ne: userId },
            tableNo: tableNo,
            date: date,
            $or: [
                { timeFrom: { $lt: timeTo, $gte: timeFrom } },
                { timeTo: { $gt: timeFrom, $lte: timeTo } },
                { timeFrom: { $gte: timeFrom, $lt: timeTo }, timeTo: { $lte: timeTo } }
            ]
        });

        if (conflictingReservation) {
            return res.status(400).json({
                message: "Table is not available for the selected date and time.",
                conflict: conflictingReservation
            });
        }

        // Step 3: Update the reservation
        const updatedReservation = await TableReservation.findByIdAndUpdate(
            userId,
            updateTableReservation,
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

// Delete Reservation
router.route("/delete/:id").delete(async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedReservation = await TableReservation.findByIdAndDelete(userId);
        if (!deletedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json({ message: "Reservation Deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting reservation", error: err.message });
    }
});

// Search Reservation by Customer Name
router.get('/search/:customerName', async (req, res) => {
    try {
        const reservations = await TableReservation.find({ customerName: req.params.customerName });
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
