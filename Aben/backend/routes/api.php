<?php
require_once __DIR__ . '/../db/database.php';
require_once __DIR__ . '/../controllers/TaskController.php';

header("Content-Type: application/json");

// Usamos la conexión desde database.php
$conexion = Database::getInstance(); // Obtiene la conexión correcta

if ($conexion->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conexion->connect_error]));
}

$taskController = new TaskController($conexion);
$method = $_SERVER['REQUEST_METHOD'];
$uri = explode("/", trim($_SERVER['REQUEST_URI'], "/"));

if (!isset($uri[0]) || $uri[0] !== "tasks") {
    echo "Invalid endpoint\n";
    echo json_encode(["error" => "Invalid endpoint"]);
    exit;
}

switch ($method) {
    case "GET":
        if (isset($uri[1])) {
            $taskController->getTask($uri[1]);
        } else {
            $taskController->listTasks();
        }
        break;

    case "POST":
        echo "POST request detected\n";
        $data = json_decode(file_get_contents("php://input"), true);
        $taskController->createTask($data);
        break;

    case "PUT":
        echo "PUT request detected\n";
        if (isset($uri[1])) {
            $data = json_decode(file_get_contents("php://input"), true);
            $taskController->updateTask($uri[1], $data);
        } else {
            echo json_encode(["error" => "Task ID is required"]);
        }
        break;

    case "DELETE":
        echo "DELETE request detected\n";
        if (isset($uri[1])) {
            $taskController->deleteTask($uri[1]);
        } else {
            echo json_encode(["error" => "Task ID is required"]);
        }
        break;

    default:
        echo "Invalid request method\n";
        echo json_encode(["error" => "Invalid request method"]);
        break;
}

$conexion->close();
?>
