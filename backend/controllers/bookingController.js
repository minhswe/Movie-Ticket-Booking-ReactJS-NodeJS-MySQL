const ShowBooking = require("../models/showBooking");
const SeatBooking = require("../models/seatBooking");
const ShowSeatNotAvailability = require("../models/showSeatNotAvailability");
const SnackBooking = require("../models/snackBooking");

const getNextIdCount = async (req, res) => {
    try {
        const count = (await ShowBooking.count()) + 1;
        res.status(200).json(count);
    } catch (error) {
        console.error("Error querying the current number of Id:", error);
        throw error;
    }
};

const addShowBooking = async (req, res) => {
    try {
        // Destructure booking details from the request body
        const { numberOfSeat, totalPrice, username, showId } = req.body;

        // Validate required fields
        if (!numberOfSeat || !totalPrice || !username || !showId) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create a new booking in the database
        const newBooking = await ShowBooking.create({
            NumberOfSeat: numberOfSeat,
            TotalPrice: totalPrice,
            Username: username,
            ShowId: showId,
        });

        // Respond with success message and the created booking
        res.status(201).json({
            message: "Show booking created successfully",
            booking: newBooking,
        });
    } catch (error) {
        console.error("Error adding show booking:", error);

        // Handle database or other errors
        res.status(500).json({ error: "Failed to add show booking" });
    }
};

const addSeatBooking = async (req, res) => {
    try {
        // Destructure booking details from the request body
        const { username, price, seatId, showBookingId } = req.body;

        // Validate required fields
        if (!username || !price || !seatId || !showBookingId) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create a new seat booking in the database
        const newSeatBooking = await SeatBooking.create({
            Username: username,
            Price: price,
            SeatId: seatId,
            ShowBookingId: showBookingId,
        });

        // Respond with success message and the created booking
        res.status(201).json({
            message: "Seat booking created successfully",
            booking: newSeatBooking,
        });
    } catch (error) {
        console.error("Error adding seat booking:", error);

        // Handle database or other errors
        res.status(500).json({ error: "Failed to add seat booking" });
    }
};

const holdSeatForShow = async (req, res) => {
    try {
        const { username, showId, seatId } = req.body;
        if (!username || !showId || !seatId === undefined) {
            return res.status(400).json({
                error: "ShowId, SeatId, and IsAvailable are required",
            });
        }

        const newRecord = await ShowSeatNotAvailability.create({
            Username: username,
            ShowId: parseInt(showId),
            SeatId: seatId,
            IsAvailable: false,
        });
        return res.status(201).json({
            message: "Seat availability added successfully",
            record: newRecord,
        });
    } catch (error) {
        console.error("Error holding seat for show:", error);
        res.status(500).json({ error: "Failed to hold seat for show" });
    }
};

const findSeatNotAvailable = async (req, res) => {
    try {
        const { showId } = req.query;
        console.log("findseat", req.query)
        // Validate that showId is provided
        if (!showId) {
            return res.status(400).json({ error: "ShowId is required" });
        }

        // Query the database for all SeatIds where ShowId matches
        const seatsNotAvailable = await ShowSeatNotAvailability.findAll({
            where: { ShowId: showId },
            attributes: ["SeatId"], // Only select the SeatId column
        });

        res.status(200).json({
            message: "Seats not available retrieved successfully",
            seats: seatsNotAvailable,
        });
    } catch (error) {
        console.error("Error finding unavailable seats:", error);

        // Handle errors
        res.status(500).json({ error: "Failed to retrieve unavailable seats" });
    }
};

const addSnackBooking = async (req, res) => {
    try{
        const {username, price, itemId, quantity, showBookingId} = req.body;

        const newSnackBooking = await SnackBooking.create({
            Username: username,
            Price: price,
            ItemId: itemId,
            Quantity: quantity,
            ShowBookingId: showBookingId
        });
        res.status(201).json({
            message: "Snack booking created successfully",
            booking: newSnackBooking,
        });
    }catch (error){
        res.status(500).json({ error: "Failed to add Snack Booking" });
    }
}

module.exports = {
    getNextIdCount,
    addShowBooking,
    addSeatBooking,
    holdSeatForShow,
    findSeatNotAvailable,
    addSnackBooking
};
