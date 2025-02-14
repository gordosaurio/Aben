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
        echo "Executing updateTask(id: $id)\n";
    
        // Validar que el ID sea un número válido
        if (!is_numeric($id) || $id <= 0) {
            echo "Error: ID inválido\n";
            echo json_encode(["error" => "ID inválido"]);
            return false;
        }
    
        // Construcción dinámica del query según los campos enviados
        $fields = [];
        $params = [];
        $types = "";
    
        if (!empty($title)) {
            $fields[] = "title = ?";
            $params[] = $title;
            $types .= "s";
        }
        if (!empty($description)) {
            $fields[] = "description = ?";
            $params[] = $description;
            $types .= "s";
        }
        if ($status !== null) {
            $fields[] = "status = ?";
            $params[] = $status;
            $types .= "i";
        }
    
        // Si no se proporcionó ningún campo válido, no se ejecuta la actualización
        if (empty($fields)) {
            echo "Error: No se proporcionaron campos para actualizar\n";
            echo json_encode(["error" => "Debes proporcionar al menos un campo para actualizar"]);
            return false;
        }
    
        // Construir la consulta SQL dinámicamente
        $query = "UPDATE tasks SET " . implode(", ", $fields) . " WHERE id = ?";
        $params[] = $id;
        $types .= "i";
    
        // Preparar y ejecutar la consulta
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param($types, ...$params);
        
        $success = $stmt->execute();
    
        if ($success) {
            echo "✅ Tarea actualizada exitosamente\n";
            echo json_encode(["success" => true, "message" => "Tarea actualizada correctamente"]);
        } else {
            echo "❌ Error al actualizar la tarea\n";
            echo json_encode(["error" => "No se pudo actualizar la tarea"]);
        }
    
        return $success;
    }

    public function deleteTask($id) {
        echo "🔹 Ejecutando deleteTask($id)...\n";
    
        // Validar que el ID sea un número entero válido
        if (!is_numeric($id) || $id <= 0) {
            echo "❌ Error: El ID proporcionado no es válido.\n";
            return false;
        }
    
        // Preparar la consulta SQL
        $query = "DELETE FROM tasks WHERE id = ?";
        $stmt = $this->conn->prepare($query);
    
        if (!$stmt) {
            echo "❌ Error al preparar la consulta: " . $this->conn->error . "\n";
            return false;
        }
    
        // Asignar el parámetro
        $stmt->bind_param("i", $id);
    
        // Ejecutar la consulta
        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo "✅ Tarea con ID $id eliminada exitosamente.\n";
            } else {
                echo "⚠️ Advertencia: No se encontró ninguna tarea con ID $id.\n";
            }
            return true;
        } else {
            echo "❌ Error al eliminar la tarea: " . $stmt->error . "\n";
            return false;
        }
    }
}
?>
