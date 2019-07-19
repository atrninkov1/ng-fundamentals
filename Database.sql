IF NOT EXISTS(SELECT name FROM master.dbo.sysdatabases WHERE ('[' + name + ']' = 'EventsDatabase' OR name = 'EventsDatabase'))
	BEGIN
		CREATE DATABASE EventsDatabase
	END

	USE EventsDatabase

	
DROP TABLE Voters
DROP TABLE Sessions
DROP TABLE Users
DROP TABLE Events
DROP TABLE Locations

CREATE TABLE Users(
	id INT NOT NULL,
	username VARCHAR(200) NOT NULL UNIQUE,
	password VARCHAR(512) NOT NULL,
	firstName VARCHAR(50) NULL DEFAULT('Unspecified First Name'),
	lastName VARCHAR(50) NULL DEFAULT('Unspecified Last Name'),
	CONSTRAINT PK_Users PRIMARY KEY(id)
)

CREATE TABLE Locations(
	id INT NOT NULL IDENTITY(1, 1),
	address VARCHAR(200) NOT NULL,
	city VARCHAR(50) NOT NULL,
	country VARCHAR(56) NOT NULL,
	CONSTRAINT PK_Locations PRIMARY KEY(Id)
)

CREATE TABLE Events(
	id INT NOT NULL,
	name VARCHAR(100) NOT NULL,
	date DATE NOT NULL,
	time TIME NOT NULL,
	price MONEY NOT NULL,
	imageUrl VARCHAR(1000) NOT NULL,
	locationId INT NULL CONSTRAINT FK_Events_Locations FOREIGN KEY REFERENCES Locations(Id),
	onlineUrl VARCHAR(200) NULL,
	CONSTRAINT PK_Events PRIMARY KEY(Id)
)

CREATE TABLE Sessions(
	id INT NOT NULL,
	name VARCHAR(100) NOT NULL,
	presenter VARCHAR(100) NOT NULL,
	duration INT NOT NULL,
	level VARCHAR(20) NOT NULL,
	abstract VARCHAR(1000) NOT NULL,
	eventId INT NOT NULL,
	CONSTRAINT PK_Sessions PRIMARY KEY(Id),
	CONSTRAINT FK_Sessions_Events FOREIGN KEY (EventId) REFERENCES Events(Id)
)

CREATE TABLE Voters(
	userId INT NOT NULL CONSTRAINT FK_Voters_Users FOREIGN KEY REFERENCES Users(Id),
	sessionId INT NOT NULL CONSTRAINT FK_Voters_Sessions FOREIGN KEY REFERENCES Sessions(Id)
)