<?php
require_once __DIR__ . '/../db/database.php';
require_once __DIR__ . '/../controllers/TaskController.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
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
        $data = json_decode(file_get_contents("php://input"), true);
        $taskController->createTask($data);
        break;

    case "PUT":
        if (isset($uri[1])) {
            $data = json_decode(file_get_contents("php://input"), true);
            $taskController->updateTask($uri[2], $data);
        } else {
            echo json_encode(["error" => "Task ID is required"]);
        }
        break;

    case "DELETE":
        if (isset($uri[1])) {
            $taskController->deleteTask($uri[1]);
        } else {
            echo json_encode(["error" => "Task ID is required"]);
        }
        break;

    default:
        echo json_encode(["error" => "Invalid request method"]);
        break;
}

$conexion->close();
?>
