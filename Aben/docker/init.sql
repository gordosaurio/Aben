-- Crear la base de datos (si no existe)
CREATE DATABASE IF NOT EXISTS aben_data;

-- Usar la base de datos
USE aben_data;

-- Crear la tabla 'tasks'
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar 10 registros de ejemplo
INSERT INTO tasks (title, description, status) VALUES
('Tarea 1', 'Descripcion de la tarea 1', 1),
('Tarea 2', 'Descripcion de la tarea 2', 0),
('Tarea 3', 'Descripcion de la tarea 3', 1),
('Tarea 4', 'Descripcion de la tarea 4', 0),
('Tarea 5', 'Descripcion de la tarea 5', 1),
('Tarea 6', 'Descripcion de la tarea 6', 0),
('Tarea 7', 'Descripcion de la tarea 7', 1),
('Tarea 8', 'Descripcion de la tarea 8', 0),
('Tarea 9', 'Descripcion de la tarea 9', 1),
('Tarea 10', 'Descripcion de la tarea 10', 0);
