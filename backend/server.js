const express = require("express");
const app = express();
const db = require("./utilities/database");
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const movieRoutes = require("./routes/movieRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");

const path = require("path");
app.use('/public', express.static(path.join(__dirname, 'public')));
db.dbConnection();

app.use(cors());

app.use(express.json());

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);
app.use("/booking", bookingRoutes)
app.use("/admin", adminRoutes);

app.listen(8080, () => {
    console.log("Server is running at http://localhost:8080");
}).on("error", function (err) {
    process.once("SIGUSR2", function () {
        process.kill(process.pid, "SIGUSR2");
    });
    process.on("SIGINT", function () {
        // this is only called on ctrl+c, not restart
        process.kill(process.pid, "SIGINT");
    });
});
