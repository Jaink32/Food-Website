import ErrorHandler from '../error/error.js';
import { Reservation } from '../models/reservationSchema.js';

export const sendReservation = async (req, res, next) => {
    const { firstName, lastName, email, phone, date, time } = req.body;


    console.log("Request Body:", req.body);

    if (!firstName || !lastName || !email || !phone || !date || !time) {
        console.log("Validation Error: Missing fields");
        return next(new ErrorHandler("Please fill the full reservation form!", 400));
    }

    try {
        await Reservation.create({ firstName, lastName, email, phone, date, time });
        res.status(200).json({
            success: true,
            message: "Reservation Sent Successfully!",
        });
    } catch (error) {
        console.log("Error:", error);
        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            return next(new ErrorHandler(validationErrors.join(' , '), 400));
        } else {
            return next(new ErrorHandler("Internal Server Error", 500));
        }
    }
};
