<?php
require_once __DIR__ . '/../models/TaskModel.php';

class TaskController {
    private $taskModel;

    public function __construct($db) {
        $this->taskModel = new TaskModel($db);
        echo "TaskController initialized\n";
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
        $status = $data['status'] ?? 'pending';

        if (!$title) {
            echo "Error: Title is required\n";
            echo json_encode(["error" => "Title is required"]);
            return;
        }

        $result = $this->taskModel->createTask($title, $description, $status);
        echo json_encode(["success" => $result, "message" => $result ? "Task created successfully" : "Failed to create task"]);
    }

    public function updateTask($id, $data) {
        echo "Entering updateTask($id)\n";
        $title = $data['title'] ?? null;
        $description = $data['description'] ?? null;
        $status = $data['status'] ?? 'pending';

        $result = $this->taskModel->updateTask($id, $title, $description, $status);
        echo "Exiting updateTask($id)\n";
        echo json_encode(["success" => $result, "message" => $result ? "Task updated successfully" : "Failed to update task"]);
    }

    public function deleteTask($id) {
        echo "Entering deleteTask($id)\n";
        $result = $this->taskModel->deleteTask($id);
        echo "Exiting deleteTask($id)\n";
        echo json_encode(["success" => $result, "message" => $result ? "Task deleted successfully" : "Failed to delete task"]);
    }
}
?>
