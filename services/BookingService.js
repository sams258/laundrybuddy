import Booking from "../models/bookings.js";
import User from "../models/users.js";

class BookingService {
  static async createBooking(userId, slotId, bookingDate) {
    const user = await User.findById(userId);
    if (user.bookingCredit <= 0)
      throw new Error("No booking credits available");

    const existingBooking = await Booking.findOne({
      user_id: userId,
      status: "Booked",
    });
    if (existingBooking) throw new Error("User already has an active booking");

    const booking = new Booking({
      user_id: userId,
      slot_id: slotId,
      bookingDate,
    });
    await booking.save();

    user.bookingCredit--; // one booking takes one credit
    await user.save();

    return booking;
  }

  static async cancelBooking(bookingId) {
    const booking = await Booking.findById(bookingId);
    if (!booking) throw new Error("Booking not found");

    const currentTime = new Date();
    const hoursDiff = (booking.bookingDate - currentTime) / (1000 * 60 * 60);

    if (hoursDiff < 24) {
      throw new Error(
        "Cancellation must be at least 24 hours before the booking date"
      );
    }

    booking.status = "Canceled";
    await booking.save();

    const user = await User.findById(booking.user_id);
    user.bookingCredit++; // returning the credit if canceled
    await user.save();

    return booking;
  }
}

export default BookingService;
