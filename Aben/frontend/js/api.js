const API_URL = "http://localhost:8000/tasks";

// Obtener todas las tareas
async function getTasks() {
    try {
        const response = await fetch(`${API_URL}`);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        // Obtener el contenido como texto antes de intentar parsear JSON
        const text = await response.text();

        // Intentar convertir a JSON
        const data = JSON.parse(text);
        return data;

    } catch (error) {
        return [];
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
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

        console.log("vamos a mostrar la respuesta de eliminar");
        console.log(response);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        return data;

    } catch (error) {
        console.error("Error al eliminar tarea:", error);
        return { success: false, error: error.message };
    }
}