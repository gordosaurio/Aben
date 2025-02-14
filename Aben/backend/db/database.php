<?php
require_once __DIR__ . '/../config/config.php';

class Database {
    private static $instance = null;
    private $conn;

    private function __construct() {
        echo "🔄 Intentando conectar a la base de datos...\n";
        
        $this->conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        if ($this->conn->connect_error) {
            die("❌ Error de conexión: " . $this->conn->connect_error);
        }

        echo "✅ Conexión exitosa a la base de datos.\n";
    }

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Database();
        }
        return self::$instance->conn;
    }
}
?>
