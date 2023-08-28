create database HotelDumbo;
use HotelDumbo;
CREATE TABLE Empleado (
    IdEmpleado INT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    ApellidoP VARCHAR(50) NOT NULL,
    ApellidoM VARCHAR(50) NOT NULL,
    Genero BIT NOT NULL,
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
    Genero BIT NOT NULL,
    Pais VARCHAR(50) NOT NULL,
    Celular INT NOT NULL,
    CI VARCHAR(20) NOT NULL,
    FechaNacimiento DATE NOT NULL
);

-- Creación de la tabla Usuario
use HotelDumbo;
CREATE TABLE Usuario (
    IdEmpleado INT PRIMARY KEY,
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
    Vigente DATE NOT NULL
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

use HotelDumbo;
INSERT INTO Cliente (IdCliente, Nombre, ApellidoP, ApellidoM, Genero, Pais, Celular, CI, FechaNacimiento)
VALUES 
    (1, 'Ana', 'Rodríguez', 'López', 1, 'México', 765434598, '123456789 LP', '1990-08-15'),
    (2, 'Juan', 'García', 'Pérez', 0, 'España', 98765432, '987654321 SCZ', '1995-03-22');
    
use HotelDumbo;
INSERT INTO Paquete (IdPaquete, Tipo, Precio, FechaInicio, FechaTermino, Vigente)
VALUES 
    (1, 'Matrimonia', 800, '2023-09-01', '2023-09-10', '2023-09-15'),
    (2, 'Simple', 300 , '2023-10-01', '2023-10-15', '2023-10-20');
    
use HotelDumbo;    
INSERT INTO Servicio (IdServicio, Descripcion)
VALUES 
    (1, 'Piscina'),
    (2, 'Servicio de Restaurante');

use HotelDumbo;    
INSERT INTO Paquete_Servicio (IdPaquete, IdServicio)
VALUES 
    (1, 1),
    (1, 2);


select * from Empleado;
select * from Cliente;
select * from Paquete;
select * from Servicio;
select * from Paquete_Servicio;
select * from Reserva;
