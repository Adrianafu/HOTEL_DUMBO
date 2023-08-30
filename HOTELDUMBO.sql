create database HotelDumbo;
use HotelDumbo;
CREATE TABLE Empleado (
    IdEmpleado INT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    ApellidoP VARCHAR(50) NOT NULL,
    ApellidoM VARCHAR(50) NOT NULL,
    Genero CHAR (1) NOT NULL,
    Celular INT NOT NULL,
    Direccion VARCHAR(100) NOT NULL,
    Cargo CHAR(1) NOT NULL,
    CI VARCHAR(20) NOT NULL,
    FechaNacimiento DATE NOT NULL
);

-- Creación de la tabla Cliente
use HotelDumbo;
CREATE TABLE Cliente (
    IdCliente INT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    ApellidoP VARCHAR(50) NOT NULL,
    ApellidoM VARCHAR(50) NOT NULL,
    EstadoCivil CHAR (1) NOT NULL,
    Genero CHAR (1) NOT NULL,
    Pais VARCHAR(50) NOT NULL,
    Celular INT NOT NULL,
    CI VARCHAR(20) NOT NULL,
    FechaNacimiento DATE NOT NULL
);

-- Creación de la tabla Usuario
use HotelDumbo;
CREATE TABLE Usuario (
    IdUsuario INT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Codigo VARCHAR(50) NOT NULL
);

-- Creación de la tabla Paquete
use HotelDumbo;
CREATE TABLE Paquete (
    IdPaquete INT PRIMARY KEY,
    Tipo VARCHAR(50) NOT NULL,
    Precio DECIMAL(10, 2) NOT NULL,
    FechaInicio DATE NOT NULL,
    FechaTermino DATE NOT NULL,
    Dias int NOT NULL,
    Vigente CHAR (1) NOT NULL
);

-- Creación de la tabla Servicio
use HotelDumbo;
CREATE TABLE Servicio (
    IdServicio INT PRIMARY KEY,
    Descripcion VARCHAR(100) NOT NULL
);

-- Creación de la tabla Paquete_Servicio
use HotelDumbo;
CREATE TABLE Paquete_Servicio (
    IdPaquete INT NOT NULL,
    IdServicio INT NOT NULL,
    
    FOREIGN KEY (IdPaquete) REFERENCES Paquete(IdPaquete),
    FOREIGN KEY (IdServicio) REFERENCES Servicio(IdServicio),
    PRIMARY KEY (idPaquete, idServicio)
);

-- Creación de la tabla Reserva
use HotelDumbo;
CREATE TABLE Reserva (
    IdReserva INT PRIMARY KEY,
    IdCliente INT NOT NULL,
    IdEmpleado INT NOT NULL,
    IdPaquete INT NOT NULL,
    Fecha DATE NOT NULL,
    Cantidad INT NOT NULL,
    TipoPago VARCHAR(20) NOT NULL,
    Pago DECIMAL(10, 2) NOT NULL,
    Estado BIT NOT NULL,
    
    FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente),
    FOREIGN KEY (idEmpleado) REFERENCES Empleado(idEmpleado),
    FOREIGN KEY (idPaquete) REFERENCES Paquete(idPaquete)
);

select * from Empleado;
select * from Cliente;
select * from Paquete;
select * from Servicio;
select * from Paquete_Servicio;
select * from Reserva;
select * from Usuario;

use HotelDumbo;   
SELECT P.IdPaquete, P.Tipo, COUNT(R.IdReserva) AS CantidadReservas
FROM Paquete P
JOIN Reserva R ON P.IdPaquete = R.IdPaquete
GROUP BY P.IdPaquete, P.Tipo
ORDER BY CantidadReservas DESC
LIMIT 10;

use HotelDumbo;   
SELECT p.IdPaquete, p.Tipo, COUNT(r.IdReserva) AS TotalReservas
FROM Paquete p
JOIN Reserva r ON p.IdPaquete = r.IdPaquete
WHERE r.Fecha BETWEEN p.FechaInicio AND p.FechaTermino
GROUP BY p.IdPaquete, p.Tipo
ORDER BY TotalReservas DESC
LIMIT 10;

