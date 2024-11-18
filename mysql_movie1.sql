CREATE DATABASE IF NOT EXISTS movie_ticket_booking_1;

USE movie_ticket_booking_1;

CREATE TABLE Addresses (
    Id VARCHAR(50) NOT NULL PRIMARY KEY, 
    AddressName VARCHAR(255) NOT NULL
);

CREATE TABLE Theaters (
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    TheaterName VARCHAR(100),
    NumberOfHall INT,
    AddressId varchar(50)
);

CREATE TABLE Halls (
	Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    HallNumber INT,
    NumberOfSeat INT,
    TheaterId INT
);

CREATE TABLE Seats (
	Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    SeatName varchar(10),
    SeatRow char(1),
    SeatCol INT,
    HallId INT,
    SeatTypeId INT
);

CREATE TABLE SeatTypes (
	Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	TypeName varchar(50),
    Price DOUBLE
);

CREATE TABLE Users (
	Username varchar(100) NOT NULL PRIMARY KEY,
    UserPassword varchar(1000),
    Email varchar(200),
    UserTypeId INT
);

CREATE TABLE UserTypes (
	Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    RoleName varchar(50)
);

CREATE TABLE Movies (
	Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	Title varchar(100),
    RunningTime TIME,
    MovieDescription varchar(1000),
    Poster varchar(100),
    ReleaseDate DATE,
    Trailer varchar(200),
    MovieStatusId INT
);

CREATE TABLE MovieStatuses (
	Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    StatusName varchar(100)
);

CREATE TABLE Genres (
	Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	GenreName varchar(50)
);

CREATE TABLE MoviesGenres (
	Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    MovieId INT,
    GenreId INT
);

CREATE TABLE Shows (
	Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ShowDate DATE,
    ShowTime TIME,
    Price DOUBLE,
    HallId INT,
    MovieId INT
);

CREATE TABLE Food (
	Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    FoodName varchar(100),
    Price DOUBLE
);

CREATE TABLE Drinks (
	Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    DrinkName varchar(50),
    Price DOUBLE
);

CREATE TABLE ShowBookings (
	Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    NumberOfSeat INT,
    TotalPrice DOUBLE,
	Username varchar(100),
    ShowId INT
);

CREATE TABLE SeatBookings (
	Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Username varchar(100),
    SeatId INT,
    ShowBookingId INT
);

CREATE TABLE ShowsSeatsNotAvailability (
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ShowId INT NOT NULL,
    SeatId INT NOT NULL,
    IsAvailable BOOLEAN DEFAULT FALSE
);


CREATE TABLE FoodBookings (
	Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	Username varchar(100),
    FoodId INT,
    ShowBookingId INT
);

CREATE TABLE DrinkBookings (
	Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Username varchar(100),
    DrinkId INT,
    ShowBookingId INT
);

-- Theaters -> Addresses
ALTER TABLE Theaters
ADD CONSTRAINT FK_Theater_Address FOREIGN KEY (AddressId) REFERENCES Addresses(Id);

-- Halls -> Theaters
ALTER TABLE Halls
ADD CONSTRAINT FK_Hall_Theater FOREIGN KEY (TheaterId) REFERENCES Theaters(Id);

-- Seats -> Halls
ALTER TABLE Seats
ADD CONSTRAINT FK_Seat_Hall FOREIGN KEY (HallId) REFERENCES Halls(Id);

-- Seats -> SeatTypes
ALTER TABLE Seats
ADD CONSTRAINT FK_Seat_SeatType FOREIGN KEY (SeatTypeId) REFERENCES SeatTypes(Id);

-- Users -> UserTypes
ALTER TABLE Users
ADD CONSTRAINT FK_User_UserType FOREIGN KEY (UserTypeId) REFERENCES UserTypes(Id);

-- Movies -> MovieStatuses
ALTER TABLE Movies
ADD CONSTRAINT FK_Movie_Status FOREIGN KEY (MovieStatusId) REFERENCES MovieStatuses(Id);

-- MoviesGenres -> Movies
ALTER TABLE MoviesGenres
ADD CONSTRAINT FK_MovieGenre_Movie FOREIGN KEY (MovieId) REFERENCES Movies(Id);

-- MoviesGenres -> Genres
ALTER TABLE MoviesGenres
ADD CONSTRAINT FK_MovieGenre_Genre FOREIGN KEY (GenreId) REFERENCES Genres(Id);

-- Shows -> Halls
ALTER TABLE Shows
ADD CONSTRAINT FK_Show_Hall FOREIGN KEY (HallId) REFERENCES Halls(Id);

-- Shows -> Movies
ALTER TABLE Shows
ADD CONSTRAINT FK_Show_Movie FOREIGN KEY (MovieId) REFERENCES Movies(Id);

-- ShowBookings -> Users
ALTER TABLE ShowBookings
ADD CONSTRAINT FK_ShowBooking_User FOREIGN KEY (Username) REFERENCES Users(Username);

-- ShowBookings -> Shows
ALTER TABLE ShowBookings
ADD CONSTRAINT FK_ShowBooking_Show FOREIGN KEY (ShowId) REFERENCES Shows(Id);

-- SeatBookings -> Users
ALTER TABLE SeatBookings
ADD CONSTRAINT FK_SeatBooking_User FOREIGN KEY (Username) REFERENCES Users(Username);

-- SeatBookings -> Seats
ALTER TABLE SeatBookings
ADD CONSTRAINT FK_SeatBooking_Seat FOREIGN KEY (SeatId) REFERENCES Seats(Id);

-- SeatBookings -> ShowBookings
ALTER TABLE SeatBookings
ADD CONSTRAINT FK_SeatBooking_ShowBooking FOREIGN KEY (ShowBookingId) REFERENCES ShowBookings(Id);

-- FoodBookings -> Users
ALTER TABLE FoodBookings
ADD CONSTRAINT FK_FoodBooking_User FOREIGN KEY (Username) REFERENCES Users(Username);

-- FoodBookings -> Food
ALTER TABLE FoodBookings
ADD CONSTRAINT FK_FoodBooking_Food FOREIGN KEY (FoodId) REFERENCES Food(Id);

-- FoodBookings -> ShowBookings
ALTER TABLE FoodBookings
ADD CONSTRAINT FK_FoodBooking_ShowBooking FOREIGN KEY (ShowBookingId) REFERENCES ShowBookings(Id);

-- DrinkBookings -> Users
ALTER TABLE DrinkBookings
ADD CONSTRAINT FK_DrinkBooking_User FOREIGN KEY (Username) REFERENCES Users(Username);

-- DrinkBookings -> Drinks
ALTER TABLE DrinkBookings
ADD CONSTRAINT FK_DrinkBooking_Drink FOREIGN KEY (DrinkId) REFERENCES Drinks(Id);

-- DrinkBookings -> ShowBookings
ALTER TABLE DrinkBookings
ADD CONSTRAINT FK_DrinkBooking_ShowBooking FOREIGN KEY (ShowBookingId) REFERENCES ShowBookings(Id);

-- ShowsSeatsNotAvailability -> Shows
ALTER TABLE ShowsSeatsNotAvailability
ADD CONSTRAINT FK_ShowsSeatsNotAvailability_Show FOREIGN KEY (ShowId) REFERENCES Shows(Id);

-- ShowsSeatsNotAvailability -> Seats
ALTER TABLE ShowsSeatsNotAvailability
ADD CONSTRAINT FK_ShowsSeatsNotAvailability_Seat FOREIGN KEY (SeatId) REFERENCES Seats(Id);

-- initialize values

-- Addresses
insert into Addresses
values ("binhthanh_1", "12x Điện Biên Phủ, Quận Bình Thạnh"),
("binhthanh_2", "23x Nơ Trang Long, Quận Bình Thạnh"),
("govap_1", "45x Phạm Văn Đồng, Quận Gò Vấp"),
("govap_2", "78x Phan Văn Trị, Quận Gò Vấp");

-- Theaters
INSERT INTO Theaters (TheaterName, NumberOfHall, AddressId)
values ("Cinema Điện Biên Phủ", 4, "binhthanh_1"),
("Cinema Nơ Trang Long", 4, "binhthanh_2"),
("Cinema Phạm Văn Đồng", 4, "govap_1"),
("Cinema Phan Văn Trị", 4, "govap_2");

-- Halls
INSERT INTO Halls (HallNumber, NumberOfSeat, TheaterId)
values (1, 120, 1),
(2, 120, 1),
(3, 80, 1),
(4, 80, 1),
(1, 120, 2),
(2, 120, 2),
(3, 80, 2),
(4, 80, 2),
(1, 120, 3),
(2, 120, 3),
(3, 80, 3),
(4, 80, 3),
(1, 120, 4),
(2, 120, 4),
(3, 80, 4),
(4, 80, 4);

INSERT INTO SeatTypes(TypeName, Price)
values ("Regular", 30000), ("VIP", 80000);

INSERT INTO Genres (GenreName)
values ("Action"),
("Adventure"),
("Animation"),
("Comedy"),
("Crime"),
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

INSERT INTO MovieStatuses(StatusName)
values ("Now Showing"),
("Comming Soon");

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

INSERT INTO moviesgenres(MovieId, GenreId)
values (1, 1), (1, 2), (1, 5), (1, 10),
(2, 9),
(3, 2), (3, 14), (3, 10), 
(4, 4), (4, 7), (4, 12), (4, 15);

INSERT INTO Shows(ShowDate, ShowTime, Price, HallId, MovieId)
values ("2024-11-10", "19:30:00", 100000, 1, 1),
("2024-11-20", "19:30:00", 100000, 2, 2),
("2024-11-20", "22:30:00", 100000, 1, 1),
("2024-11-20", "23:30:00", 100000, 2, 2),
("2024-11-20", "19:30:00", 100000, 5, 1),
("2024-11-20", "22:30:00", 100000, 5, 1),
("2024-11-20", "19:30:00", 100000, 6, 2),
("2024-11-20", "21:30:00", 100000, 6, 1),
("2024-11-22", "19:30:00", 100000, 1, 2),
("2024-11-23", "19:30:00", 100000, 2, 2),
("2024-11-24", "19:30:00", 100000, 5, 1),
("2024-11-25", "19:30:00", 100000, 6, 2);

insert into usertypes(RoleName) values ("Admin"), ("Regular User");

select * from seattypes;

DELIMITER //

CREATE PROCEDURE GenerateSeats(IN hallId INT, IN numberOfSeat INT)
BEGIN
    DECLARE rowChar CHAR(1);
    DECLARE colNum INT;
    DECLARE seatCount INT DEFAULT 0;

    SET rowChar = 'A';
    SET colNum = 1;

    generate_loop: WHILE seatCount < numberOfSeat DO
        -- Determine the SeatTypeId: 1 for first row, 2 for others
        IF rowChar = 'A' THEN
            INSERT INTO Seats (SeatName, SeatRow, SeatCol, HallId, SeatTypeId)
            VALUES (CONCAT(rowChar, colNum), rowChar, colNum, hallId, 1);
        ELSE
            INSERT INTO Seats (SeatName, SeatRow, SeatCol, HallId, SeatTypeId)
            VALUES (CONCAT(rowChar, colNum), rowChar, colNum, hallId, 2);
        END IF;

        -- Increment seat count and column number
        SET seatCount = seatCount + 1;
        SET colNum = colNum + 1;

        -- Move to the next row if column number exceeds 10
        IF colNum > 10 THEN
            SET colNum = 1;
            SET rowChar = CHAR(ASCII(rowChar) + 1); -- Move to the next row (A -> B -> C ...)
        END IF;

        -- Stop if we exceed row Z
        IF rowChar > 'Z' THEN
            LEAVE generate_loop;
        END IF;
    END WHILE generate_loop;
END //

DELIMITER ;

select * from halls;
CALL GenerateSeats(1, 120);
CALL GenerateSeats(2, 120);
CALL GenerateSeats(3, 80);
CALL GenerateSeats(4, 80);
CALL GenerateSeats(5, 120);
CALL GenerateSeats(6, 120);
CALL GenerateSeats(7, 80);
CALL GenerateSeats(8, 80);
CALL GenerateSeats(9, 120);
CALL GenerateSeats(10, 120);
CALL GenerateSeats(11, 80);
CALL GenerateSeats(12, 80);
CALL GenerateSeats(13, 120);
CALL GenerateSeats(14, 120);
CALL GenerateSeats(15, 80);
CALL GenerateSeats(16, 80);

select * from seats;


