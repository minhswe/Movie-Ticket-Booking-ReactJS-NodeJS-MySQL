const ShowBooking = require("../models/showBooking");
const Show = require("../models/show");
const Movie = require("../models/movie");
const Genre = require("../models/genre");
const multer = require("multer");
const path = require('path');
const fs = require("fs");
// Associations
Movie.hasMany(Show, { foreignKey: "MovieId" });
Show.belongsTo(Movie, { foreignKey: "MovieId" });

Show.hasMany(ShowBooking, { foreignKey: "ShowId" });
ShowBooking.belongsTo(Show, { foreignKey: "ShowId" });

const { sequelize } = require("../utilities/database");

const getTop3BookedMovies = async (req, res) => {
    const query = `
    SELECT 
        m.Id AS MovieId,
        m.Title AS MovieTitle,
        SUM(sb.NumberOfSeat) AS TotalSeatsBooked
    FROM Movies m
    LEFT JOIN Shows s ON m.Id = s.MovieId
    LEFT JOIN ShowBookings sb ON s.Id = sb.ShowId
    GROUP BY m.Id, m.Title
    ORDER BY TotalSeatsBooked DESC
    LIMIT 3;
    `;
    try {
        const results = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).json(results)
    } catch (error) {
        console.error("Error fetching top 3 booked movies:", error);
    }
};


const getTotalSeatsBooked = async (req, res) => {
    try {
        const totalSeats = await ShowBooking.sum("NumberOfSeat");
        console.log(`Total Number of Seats Booked: ${totalSeats}`);
        res.status(200).json(totalSeats);
    } catch (error) {
        console.error("Error fetching total seats booked:", error);
        res.status(500).json(error);
    }
};

const getGenres = async (req, res) => {
    try{
        const genres = await Genre.findAll();
        res.status(200).json(genres);
    }catch (error){
        console.error("Error fetching movie's genres:", error);
        res.status(500).json(error);
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the folder where images will be saved (public/posters/)
        const uploadDir = "public/posters/";
        
        // Ensure the folder exists, create it if it doesn't
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Specify the file name (e.g., timestamp + original file name)
        const fileExtension = path.extname(file.originalname);
        const fileName = Date.now() + fileExtension;
        cb(null, fileName);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB file size limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const mimeType = allowedTypes.test(file.mimetype);
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimeType && extname) {
            return cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"));
        }
    }
});

const uploadPoster = async (req, res) => {
    console.log(req.file)
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Construct the file path to be used by the frontend
        const filePath = `/public/posters/${req.file.filename}`;

        // Send back the file path in the response
        res.status(200).json({ filePath });

    } catch (error) {
        console.error("Error uploading poster:", error);
        res.status(500).json({ error: "Image upload failed" });
    }
};



module.exports = {
    getTop3BookedMovies,
    getTotalSeatsBooked,
    getGenres,
    uploadPoster,
    upload,
}
