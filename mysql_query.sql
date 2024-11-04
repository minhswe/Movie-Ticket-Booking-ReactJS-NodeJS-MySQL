CREATE DATABASE IF NOT EXISTS movie_ticket_booking;

USE movie_ticket_booking;

-- Create the Address table
CREATE TABLE Addresses (
    Id VARCHAR(100) NOT NULL PRIMARY KEY, 
    AddressName VARCHAR(255) NOT NULL
);

-- Create the Theaters table
CREATE TABLE Theaters (
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    TheaterName VARCHAR(255) NOT NULL,
    TotalHall INT NOT NULL,
    AddressId VARCHAR(100) NOT NULL,
    CONSTRAINT FK_Theaters_Addresses FOREIGN KEY (AddressId) REFERENCES Addresses(Id)
);

-- Create the Halls table
CREATE TABLE Halls (
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    HallNumber INT NOT NULL,
    TotalSeat INT NOT NULL,
    TheaterId INT NOT NULL,
    CONSTRAINT FK_Halls_Theaters FOREIGN KEY (TheaterId) REFERENCES Theaters(Id)
);

-- Create the SeatTypes table
CREATE TABLE SeatTypes (
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    SeatTypeName VARCHAR(50),
    Price DECIMAL(8,0)
);

-- Create the Seats table
CREATE TABLE Seats (
    Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    SeatNumber VARCHAR(20) NOT NULL,
    SeatRow VARCHAR(1) NOT NULL,
    SeatCol INT NOT NULL,
    HallId INT NOT NULL,
    SeatTypeId INT NOT NULL,
    CONSTRAINT FK_Seats_Halls FOREIGN KEY (HallId) REFERENCES Halls(Id),
    CONSTRAINT FK_Seats_SeatTypes FOREIGN KEY (SeatTypeId) REFERENCES SeatTypes(Id)
);

-- Create the Genres table
CREATE TABLE Genres (
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    GenreName VARCHAR(100) NOT NULL
);

-- Create the MovieStatuses table
CREATE TABLE MovieStatuses (
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    StatusName VARCHAR(100)
);

-- Create the Movies table
CREATE TABLE Movies (
    Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    RunningTime INT NOT NULL,
    MovieDescription VARCHAR(1000),
    Poster VARCHAR(255),
    ReleaseDate DATE,
    Trailer VARCHAR(255),
    MovieStatusId INT NOT NULL,
    CONSTRAINT FK_Movies_Status FOREIGN KEY (MovieStatusId) REFERENCES MovieStatuses(Id)
);

-- Create the MovieGenres table
CREATE TABLE MoviesGenres (
    Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    MovieId INT NOT NULL,
    GenreId INT NOT NULL,
    CONSTRAINT FK_MovieGenres_Movies FOREIGN KEY (MovieId) REFERENCES Movies(Id),
    CONSTRAINT FK_MovieGenres_Genres FOREIGN KEY (GenreId) REFERENCES Genres(Id)
);

-- Create the Shows table
CREATE TABLE Shows (
    Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    ShowDate DATE NOT NULL,
    ShowTime TIME NOT NULL,
    ShowPrice DECIMAL(8,0) NOT NULL,
    HallId INT NOT NULL,
    MovieId INT NOT NULL,
    CONSTRAINT FK_Shows_Halls FOREIGN KEY (HallId) REFERENCES Halls(Id),
    CONSTRAINT FK_Shows_Movies FOREIGN KEY (MovieId) REFERENCES Movies(Id)
);

-- Create the UserTypes table
CREATE TABLE UserTypes (
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Role VARCHAR(100) NOT NULL
);

-- Create the Users table
CREATE TABLE Users (
    Username VARCHAR(255) NOT NULL PRIMARY KEY,
    UserPassword VARCHAR(255) NOT NULL,
    Email VARCHAR(255),
    UserTypeId INT NOT NULL,
    CONSTRAINT FK_Users_UserTypes FOREIGN KEY (UserTypeId) REFERENCES UserTypes(Id)
);

-- Create the ShowBookings table
CREATE TABLE ShowBookings (
    Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255),
    ShowId INT NOT NULL,
    NumberOfSeat INT NOT NULL,
    Total DECIMAL(8,0),
    CONSTRAINT FK_ShowBookings_Users FOREIGN KEY (Username) REFERENCES Users(Username),
    CONSTRAINT FK_ShowBookings_Shows FOREIGN KEY (ShowId) REFERENCES Shows(Id)
);

-- Create the SeatBookings table
CREATE TABLE SeatBookings (
    Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    SeatId INT,
    Username VARCHAR(255),
    ShowBookingId INT NOT NULL,
    CONSTRAINT FK_SeatBookings_Seats FOREIGN KEY (SeatId) REFERENCES Seats(Id),
    CONSTRAINT FK_SeatBookings_Users FOREIGN KEY (Username) REFERENCES Users(Username),
    CONSTRAINT FK_SeatBookings_ShowBookings FOREIGN KEY (ShowBookingId) REFERENCES ShowBookings(Id)
);

-- Create the Foods table
CREATE TABLE Foods (
    Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FoodName VARCHAR(255) NOT NULL,
    Price DECIMAL(8,0) NOT NULL
);

-- Create the Drinks table
CREATE TABLE Drinks (
    Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    DrinkName VARCHAR(255) NOT NULL,
    Price DECIMAL(8,0) NOT NULL
);

-- Create the FoodBookings table
CREATE TABLE FoodBookings (
    Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255),
    FoodId INT NOT NULL,
    ShowBookingId INT NOT NULL,
    CONSTRAINT FK_FoodBookings_Users FOREIGN KEY (Username) REFERENCES Users(Username),
    CONSTRAINT FK_FoodBookings_Foods FOREIGN KEY (FoodId) REFERENCES Foods(Id),
    CONSTRAINT FK_FoodBookings_ShowBookings FOREIGN KEY (ShowBookingID) REFERENCES ShowBookings(ID)
);

-- Create the DrinkBookings table
CREATE TABLE DrinkBookings (
    Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255),
    DrinkId INT NOT NULL,
    ShowBookingID INT NOT NULL,
    CONSTRAINT FK_DrinkBookings_Users FOREIGN KEY (Username) REFERENCES Users(Username),
    CONSTRAINT FK_DrinkBookings_Drinks FOREIGN KEY (DrinkId) REFERENCES Drinks(Id),
    CONSTRAINT FK_DrinkBookings_ShowBookings FOREIGN KEY (ShowBookingId) REFERENCES ShowBookings(Id)
);

-- Insert initial values
-- Addresses
select * from Addresses;
insert into Addresses
select * from Addresses where Id like "binhthanh";
insert into Addresses
values ("binhthanh_1", "12x Điện Biên Phủ, Quận Bình Thạnh"),
("binhthanh_2", "23x Nơ Trang Long, Quận Bình Thạnh"),
("govap_1", "45x Phạm Văn Đồng, Quận Gò Vấp"),
("govap_2", "78x Phan Văn Trị, Quận Gò Vấp");

-- Insert initial values
-- Theaters
SELECT * FROM Theaters;
DESCRIBE Theaters;
INSERT INTO Theaters (TheaterName, TotalHall, AddressId)
values ("Cinema Điện Biên Phủ", 4, "binhthanh_1"),
("Cinema Nơ Trang Long", 4, "binhthanh_2"),
("Cinema Phạm Văn Đồng", 4, "govap_1"),
("Cinema Phan Văn Trị", 4, "govap_2");

-- Halls
DESCRIBE Halls;
SELECT * FROM Halls;
INSERT INTO Halls (HallNumber, TotalSeat, TheaterId)
values (1, 120, 3),
(2, 120, 3),
(3, 80, 3),
(4, 80, 3),
(1, 120, 4),
(2, 120, 4),
(3, 80, 4),
(4, 80, 4),
(1, 120, 5),
(2, 120, 5),
(3, 80, 5),
(4, 80, 5),
(1, 120, 6),
(2, 120, 6),
(3, 80, 6),
(4, 80, 6);

SELECT H.Id AS HallId, H.HallNumber, H.TotalSeat, T.TheaterName, A.AddressName
FROM Halls H
JOIN Theaters T ON H.TheaterId = T.Id
JOIN Addresses A ON T.AddressId = A.Id
WHERE T.TheaterName = 'Cinema Phan Văn Trị' 
  AND A.AddressName = 'Specific Address';
  
DESCRIBE seatTypes;
SELECT * FROM SeatTypes;
INSERT INTO SeatTypes (SeatTypeName, Price)
values ('Normal', 50000),
('VIP', 80000);

DELIMITER //

CREATE PROCEDURE AutoCreateSeatsForHall(
    IN totalSeats INT,    -- Total number of seats to generate
    IN hallId INT         -- The specific HallId to insert seats for
)
BEGIN
    DECLARE seatRow CHAR(1);
    DECLARE seatCol INT;
    DECLARE seatCount INT DEFAULT 0;    -- Counter for generated seats
    DECLARE maxCols INT DEFAULT 10;     -- Maximum columns per row (adjust as needed)
    DECLARE seatType INT;

    SET seatRow = 'A';
    SET seatCol = 1;

    WHILE seatCount < totalSeats DO
        -- Determine the SeatTypeId based on the current row
        IF seatRow IN ('A', 'B') THEN
            SET seatType = 1;
        ELSE
            SET seatType = 2;
        END IF;

        -- Insert a new seat with the determined SeatTypeId
        INSERT INTO Seats (SeatNumber, SeatRow, SeatCol, HallId, SeatTypeId)
        VALUES (CONCAT(seatRow, seatCol), seatRow, seatCol, hallId, seatType);

        -- Update counters
        SET seatCount = seatCount + 1;
        SET seatCol = seatCol + 1;

        -- Move to the next row if maxCols reached
        IF seatCol > maxCols THEN
            SET seatCol = 1;  -- Reset column to 1
            SET seatRow = CHAR(ASCII(seatRow) + 1);  -- Move to the next row (A -> B -> C, etc.)
        END IF;
    END WHILE;
END //

DELIMITER ;
SELECT * FROM Halls;
CALL AutoCreateSeatsForHall(120, 1);
CALL AutoCreateSeatsForHall(120, 2);
CALL AutoCreateSeatsForHall(80, 3);
CALL AutoCreateSeatsForHall(80, 4);
--
CALL AutoCreateSeatsForHall(120, 5);
CALL AutoCreateSeatsForHall(120, 6);
CALL AutoCreateSeatsForHall(80, 7);
CALL AutoCreateSeatsForHall(80, 8);
--
CALL AutoCreateSeatsForHall(120, 9);
CALL AutoCreateSeatsForHall(120, 10);
CALL AutoCreateSeatsForHall(80, 11);
CALL AutoCreateSeatsForHall(80, 12);
--
CALL AutoCreateSeatsForHall(120, 13);
CALL AutoCreateSeatsForHall(120, 14);
CALL AutoCreateSeatsForHall(80, 15);
CALL AutoCreateSeatsForHall(80, 16);
--
SELECT * FROM Seats;

--
DESCRIBE Genres;
INSERT INTO Genres (GenreName)
values ("Action"),
("Adventure"),
("Comedy"),
("Drama"),
("Fantasy"),
("Horror"),
("Musicals"),
("Mystery"),
("Romance"),
("Science fiction"),
("Sports"),
("Thriller"),
("Western");

--
DESCRIBE MovieStatuses;
INSERT INTO MovieStatuses(StatusName)
values ("Now Showing"),
("Comming Soon");
SELECT * FROM MovieStatuses;
--

DESCRIBE Movies;
INSERT INTO Movies(Title, RunningTime, MovieDescription, Poster, ReleaseDate, Trailer, MovieStatusId)
values("Venom: The Last Dance", 
109, 
"In Venom: The Last Dance, Tom Hardy returns as Venom, one of Marvel’s greatest and most complex characters, 
for the final film in the trilogy. Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that 
will bring the curtains down on Venom and Eddie's last dance.",
"/posters/venom.jpg",
'2024-10-25',
"https://www.youtube.com/watch?v=aFsGDcy-6hc",
1),
("Once Upon A Love Story",
135,
"Once Upon A Love Story revolves around the friendship and love between two boys and a girl from childhood to adulthood, 
facing the challenges of fate. Spanning four stages from 1987 to 2000, three friends of the same age - Vinh, Mien, and Phuc - have loved, 
stumbled through life together and overcame obstacles hand in hand.",
"/posters/ngayXuaCoMotChuyenTinh.jpg",
'2024-10-28',
"https://www.youtube.com/watch?v=3Q6ILUwMwM4",
1),
("The Wild Robot",
102,
"After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, 
Roz bonds with the island's animals and cares for an orphaned baby goose.",
"/posters/robotHoangDa.jpg",
'2024-10-11',
"https://www.youtube.com/watch?v=2l8_FNIBWLM",
1),
("Joker: Folie À Deux",
138,
'"Joker: Folie à Deux" finds Arthur Fleck institutionalized at Arkham awaiting trial for his crimes as Joker. While struggling with his dual identity, 
Arthur not only stumbles upon true love, but also finds the music that\'s always been inside him.',
'/posters/joker.jpg',
'2024-10-4',
'https://www.youtube.com/watch?v=xy8aJw1vYHo',
1);
SELECT * FROM Movies;








