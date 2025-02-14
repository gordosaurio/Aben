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
        echo "Executing getTaskById($id)\n";
        $query = "SELECT * FROM tasks WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function createTask($title, $description, $status) {
        echo "Executing createTask()\n";
        $query = "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("sss", $title, $description, $status);
        return $stmt->execute();
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
