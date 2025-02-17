<?php
require_once __DIR__ . '/../models/TaskModel.php';

class TaskController {
    private $taskModel;

    public function __construct($db) {
        $this->taskModel = new TaskModel($db);
    }

    public function listTasks() {
        $tasks = $this->taskModel->getAllTasks();
        echo json_encode(["success" => true, "tasks" => $tasks]);
    }

    public function getTask($id) {
        $task = $this->taskModel->getTaskById($id);
        if ($task) {
            echo json_encode(["success" => true, "task" => $task]);
        } else {
            echo json_encode(["error" => "Task not found"]);
        }
    }

    public function createTask($data) {
        $title = $data['title'] ?? null;
        $description = $data['description'] ?? null;
        $status = isset($data['status']) ? (int)$data['status'] : 1; // Siempre 1 por defecto

        if (!$title) {
            echo json_encode(["error" => "Title is required"]);
            return;
        }
    
        $result = $this->taskModel->createTask($title, $description, $status);

        echo json_encode([
            "success" => $result, 
            "message" => $result ? "Task created successfully" : "Failed to create task"
        ]);
    }

    public function updateTask($id, $data) {
        $title = $data['title'] ?? null;
        $description = $data['description'] ?? null;
        $status = isset($data['status']) ? (int)$data['status'] : 1;
    
        $result = $this->taskModel->updateTask($id, $title, $description, $status);
    
        // Aquí solo se imprime JSON una vez
        echo json_encode($result);
    }

    public function deleteTask($id) {
        $result = $this->taskModel->deleteTask($id);
        echo json_encode(["success" => $result, "message" => $result ? "Task deleted successfully" : "Failed to delete task"]);
    }
}
?>
