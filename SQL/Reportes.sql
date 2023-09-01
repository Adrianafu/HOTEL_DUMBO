use HotelDumbo;

CREATE VIEW Solicitados AS
SELECT
    DATE_FORMAT(R.Fecha, '%Y-%m') AS Mes,
    P.IdPaquete,
    P.Tipo,
    P.Dias,
    COUNT(R.IdReserva) AS CantidadReservas
FROM
    Reserva R
JOIN
    Paquete P ON R.IdPaquete = P.IdPaquete
WHERE
    R.Fecha BETWEEN DATE_SUB(P.FechaInicio, INTERVAL P.Dias - 1 DAY) AND P.FechaTermino
GROUP BY
    Mes, P.IdPaquete, P.Tipo, P.Dias
ORDER BY
    Mes DESC, CantidadReservas DESC;
    
CREATE VIEW Menos AS
SELECT
    E.IdEmpleado,
    CONCAT(E.Nombre, ' ', E.ApellidoP) AS NombreCompleto,
    COUNT(R.IdReserva) AS CantidadReservas
FROM
    Empleado E
LEFT JOIN
    Reserva R ON E.IdEmpleado = R.IdEmpleado
GROUP BY
    E.IdEmpleado, NombreCompleto
ORDER BY
    CantidadReservas ASC
LIMIT 25;

--
CREATE VIEW Mas AS
SELECT
    S.IdServicio,
    S.Descripcion,
    COUNT(PS.IdServicio) AS CantidadReservas
FROM
    Servicio S
LEFT JOIN
    Paquete_Servicio PS ON S.IdServicio = PS.IdServicio
GROUP BY
    S.IdServicio, S.Descripcion
ORDER BY
    CantidadReservas DESC
LIMIT 10;

SELECT * FROM Mas;

CREATE OR REPLACE VIEW PaquetesMasSolicitados AS 
SELECT P.IdPaquete, P.Tipo, COUNT(R.IdReserva) AS CantidadReservas
FROM Paquete P
JOIN Reserva R ON P.IdPaquete = R.IdPaquete
GROUP BY P.IdPaquete, P.Tipo
ORDER BY CantidadReservas DESC
LIMIT 10;

Select * FROM PaquetesMasSolicitados;


SELECT p.IdPaquete, p.Tipo, COUNT(r.IdReserva) AS TotalReservas
FROM Paquete p
JOIN Reserva r ON p.IdPaquete = r.IdPaquete
WHERE r.Fecha BETWEEN p.FechaInicio AND p.FechaTermino
GROUP BY p.IdPaquete, p.Tipo
ORDER BY TotalReservas DESC
LIMIT 10;

CREATE OR REPLACE VIEW Paquetes_EstadoCivil AS 
SELECT EstadoCivil, Genero, Tipo From (Cliente 
INNER JOIN Reserva ON Cliente.IdCliente = Reserva.IdCliente)
INNER JOIN Paquete ON Paquete.IdPaquete = Reserva.IdPaquete
Order by EstadoCivil, Genero, Tipo;

Select * FROM Paquetes_EstadoCivil;

CREATE OR REPLACE VIEW EmpleadoProductivo AS 
SELECT E.IdEmpleado, Nombre, ApellidoP, ApellidoM, COUNT(R.IdReserva) AS CantidadReservas
FROM Empleado E
JOIN Reserva R ON E.IdEmpleado = R.IdEmpleado
GROUP BY E.IdEmpleado, Nombre, ApellidoP, ApellidoM
ORDER BY CantidadReservas DESC
LIMIT 10;

Select * FROM EmpleadoProductivo;

CREATE OR REPLACE VIEW Vista_Reporte_Fechas_Paquetes_Solicitados AS
SELECT DATE_FORMAT(R.Fecha, '%Y-%m') AS Mes, P.IdPaquete, P.Tipo, COUNT(R.IdReserva) AS CantidadReservas
FROM Reserva R
JOIN Paquete P ON R.IdPaquete = P.IdPaquete
GROUP BY Mes, P.IdPaquete, P.Tipo
ORDER BY CantidadReservas DESC
LIMIT 10;

SELECT Mes, IdPaquete, Tipo, CantidadReservas
FROM Vista_Reporte_Fechas_Paquetes_Solicitados;