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
    console.log("Entrando a createTask...");
    
    const response = await fetch(`${API_URL}`, {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" }
    });

    console.log("Vamos a mostrar la respuesta:");
    console.log(response);

    // Validar si la respuesta tiene contenido
    const text = await response.text();
    console.log("Respuesta como texto:", text);

    try {
        return JSON.parse(text); // Intentar convertir solo si el texto no está vacío
    } catch (error) {
        console.error("Error al parsear JSON:", error);
        return {}; // Retornar un objeto vacío en caso de error
    }
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