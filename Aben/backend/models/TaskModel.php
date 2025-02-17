<?php
require_once __DIR__ . '/../db/database.php';

class TaskModel {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAllTasks() {
        $query = "SELECT * FROM tasks";
        $result = $this->conn->query($query);
        return $result ? $result->fetch_all(MYSQLI_ASSOC) : [];
    }

    public function getTaskById($id) {
        $query = "SELECT * FROM tasks WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function createTask($title, $description, $status) {
        // Verificar que title no sea NULL o vacío
        if (!$title || trim($title) === '') {
            echo json_encode(["error" => "El campo 'title' es obligatorio"]);
            return false;
        }
    
        // Verificar que status sea 0 o 1 (tinyint)
        if (!in_array($status, [0, 1], true)) {
            echo json_encode(["error" => "El campo 'status' debe ser 0 o 1"]);
            return false;
        }

        // Preparar la consulta
        $query = "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($query);
    
        if (!$stmt) {
            echo json_encode(["error" => "Error en la preparación de la consulta: " . $this->conn->error]);
            return false;
        }
    
        // Bind de parámetros
        $stmt->bind_param("ssi", $title, $description, $status);
    
        // Ejecutar la consulta y verificar errores
        if (!$stmt->execute()) {
            echo json_encode(["error" => "Error al insertar en la base de datos: " . $stmt->error]);
            return false;
        }

        return true;
    }

    












    public function updateTask($id, $title, $description, $status) {
        // Validar ID
        if (!is_numeric($id) || $id <= 0) {
            return ["success" => false, "message" => "ID inválido"];
        }
    
        $fields = [];
        $params = [];
        $types = "";
    
        // Si el valor NO es null, agregarlo a la consulta
        if ($title !== null) {
            $fields[] = "title = ?";
            $params[] = $title;
            $types .= "s";
        }
        if ($description !== null) {
            $fields[] = "description = ?";
            $params[] = $description;
            $types .= "s";
        }
        if ($status !== null) {
            $fields[] = "status = ?";
            $params[] = $status;
            $types .= "i";
        }
    
        // Si no hay valores para actualizar, no ejecutamos la consulta
        if (empty($fields)) {
            return ["success" => false, "message" => "Debes proporcionar al menos un campo para actualizar"];
        }
    
        // Construcción de la consulta
        $query = "UPDATE tasks SET " . implode(", ", $fields) . " WHERE id = ?";
        $params[] = $id;
        $types .= "i";
    
        // Preparar la consulta
        $stmt = $this->conn->prepare($query);
        if (!$stmt) {
            return ["success" => false, "message" => "Error en la consulta"];
        }
    
        // Vincular parámetros
        $stmt->bind_param($types, ...$params);
        
        // Ejecutar consulta
        $success = $stmt->execute();

        return ["success" => $success, "message" => $success ? "Tarea actualizada correctamente" : "No se pudo actualizar la tarea"];
    }
















    public function deleteTask($id) {
        // Validar que el ID sea un número entero válido
        if (!is_numeric($id) || $id <= 0) {
            return false;
        }
    
        // Preparar la consulta SQL
        $query = "DELETE FROM tasks WHERE id = ?";
        $stmt = $this->conn->prepare($query);
    
        if (!$stmt) {
            return false;
        }
    
        // Asignar el parámetro
        $stmt->bind_param("i", $id);
    
        // Ejecutar la consulta
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
?>
