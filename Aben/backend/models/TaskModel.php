<?php
require_once __DIR__ . '/../db/database.php';

class TaskModel {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
        echo "TaskModel initialized\n";
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
    
        echo json_encode(["success" => true, "message" => "Task creada exitosamente"]);
        return true;
    }

    public function updateTask($id, $title, $description, $status) {
        echo "Executing updateTask($id)\n";
        $query = "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("sssi", $title, $description, $status, $id);
        return $stmt->execute();
    }

    public function deleteTask($id) {
        echo "Executing deleteTask($id)\n";
        $query = "DELETE FROM tasks WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
}
?>
