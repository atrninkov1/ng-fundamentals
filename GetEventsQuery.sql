/****** Script for SelectTopNRows command from SSMS  ******/
SELECT Event.Id, Event.Name, Date, Time, Price, ImageUrl, Address, City, Country, Sessions.Id, Sessions.Name, Presenter, Duration, Level, Abstract, Username FROM
	(SELECT e.Id AS Id, Name, Date, Time, Price, ImageUrl, OnlineUrl, Address, City, Country FROM Events e LEFT OUTER JOIN Locations l ON e.LocationId = l.Id) as Event INNER JOIN 
	(SELECT s.Id, Name, Presenter, Duration, Level, Abstract, EventId, Username FROM Sessions s INNER JOIN Voters v ON s.Id = v.SessionId INNER JOIN Users u ON
	u.id = v.UserId) as Sessions ON Sessions.EventId = Event.Id ORDER BY Event.Id