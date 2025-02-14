const API_URL = "http://localhost/backend/api.php";

// Obtener todas las tareas
async function getTasks() {
    const response = await fetch(`${API_URL}?action=getTasks`);
    return response.json();
}

// Crear una nueva tarea
async function createTask(title, description) {
    const response = await fetch(`${API_URL}?action=createTask`, {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" }
    });
    return response.json();
}

// Eliminar tarea
async function deleteTask(id) {
    const response = await fetch(`${API_URL}?action=deleteTask&id=${id}`, { method: "DELETE" });
    return response.json();
}