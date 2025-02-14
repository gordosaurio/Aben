const API_URL = "http://localhost:8000";

// Obtener todas las tareas
async function getTasks() {
    try {
        console.log("Iniciando solicitud para obtener tareas...");
        const response = await fetch(`${API_URL}/tasks`);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        // Obtener el contenido como texto antes de intentar parsear JSON
        const text = await response.text();
        console.log("Respuesta del servidor:", text);

        // Intentar convertir a JSON
        const data = JSON.parse(text);
        console.log("Tareas obtenidas con éxito:", data);
        return data;

    } catch (error) {
        console.error("Error al obtener tareas:", error);
        return [];
    } finally {
        console.log("Finalizando solicitud para obtener tareas.");
    }
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