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

        console.log("vamos a mostrar el text");
        console.log(text);

        // Intentar convertir a JSON
        const data = JSON.parse(text);
        return data;

    } catch (error) {
        return [];
    }
}

// Crear una nueva tarea
async function createTask(title, description) {
    const response = await fetch(`${API_URL}`, {
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

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error al eliminar tarea:", error);
        return { success: false, error: error.message };
    }
}







async function updateTask(id, title, description) {
    console.log("Enviando solicitud PUT a:", `${API_URL}/tasks/${id}`);

    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }) // Enviar solo title y description
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la tarea");
    }

    return response.json();
}

async function updateTaskStatus(id, status) {
    console.log("Enviando solicitud PUT a:", `${API_URL}/tasks/${id}`);

    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la tarea");
    }

    return response.json();
}
