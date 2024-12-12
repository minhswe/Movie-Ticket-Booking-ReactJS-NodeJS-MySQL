const ShowBooking = require("../models/showBooking");
const Show = require("../models/show");
const Movie = require("../models/movie");

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

// const runApp = async () => {

//     const topMovies = await getTop3BookedMovies();
//     console.log("Top 3 Booked Movies:");
//     console.log(topMovies);
// };

// runApp().catch((error) => console.error("An error occurred:", error));

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

module.exports = {
    getTop3BookedMovies,
    getTotalSeatsBooked
}
