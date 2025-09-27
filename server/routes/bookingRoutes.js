import express from "express";
import { checkAvailabilityOfCar, createBooking, getOwnerBookings, getUserBookings, changeBookingStatus } from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const bookingRouter = express.Router();

router.post("/check-availability", checkAvailabilityOfCar);
router.post("/create", protect, createBooking);
router.get("/user", protect, getUserBookings);
router.get("/owner", protect, getOwnerBookings);
router.post("/change-status", protect, changeBookingStatus);

export default bookingRouter;