import express from "express";
import * as slotController from "./controllers/SlotController.js";
import * as userController from "./controllers/UserController.js";
import * as bookingController from "./controllers/BookingController.js";
import * as contactFormController from "./controllers/ContactFormController.js";
import * as emailController from './controllers/EmailController.js';


const router = express.Router();

// Slots endpoints
router.post("/api/slots", slotController.createSlot);
router.get("/api/slots", slotController.getAllSlots);
router.get("/api/slots/:id", slotController.getSlotById);
router.put("/api/slots/:id", slotController.updateSlot);
router.delete("/api/slots/:id", slotController.deleteSlot);

// Users endpoints
router.post("/api/users", userController.createUser);
router.get("/api/users", userController.getAllUsers);
router.get("/api/users/:id", userController.getUserById);
router.put("/api/users/:id", userController.updateUser);
router.delete("/api/users/:id", userController.deleteUser);

// Bookings endpoints
router.post("/api/bookings", bookingController.createBooking);
router.get("/api/bookings", bookingController.getAllBookings);
router.get("/api/bookings/:id", bookingController.getBookingById);
router.put("/api/bookings/:id", bookingController.updateBookingById);
router.delete("/api/bookings/:id", bookingController.deleteBookingById);

// Contact Form endpoints
router.post("/api/contactForms", contactFormController.createContactFormEntry);
router.get("/api/contactForms", contactFormController.getAllContactFormEntries);
router.get("/api/contactForms/:id", contactFormController.getContactFormEntryById);
router.put("/api/contactForms/:id", contactFormController.updateContactFormEntry);
router.delete("/api/contactForms/:id", contactFormController.deleteContactFormEntry);

// Endpoint to send email
router.post('/api/sendEmail', emailController.sendEmail);

export default router;
