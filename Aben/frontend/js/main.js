document.addEventListener("DOMContentLoaded", async () => {
    const taskList = document.getElementById("taskList");
    const taskForm = document.getElementById("taskForm");

    // Cargar tareas
    async function loadTasks() {
        const taskList = document.getElementById("taskList"); // Asegurar que el elemento existe
        if (!taskList) return console.error("Elemento 'taskList' no encontrado.");
    
        taskList.innerHTML = ""; // Limpiar la lista antes de agregar nuevas tareas
        const data = await getTasks();
        const tasks = data.tasks || [];
    
        tasks.forEach(task => {
            const li = document.createElement("li");
            
            // Usar textContent en lugar de innerHTML por seguridad
            const taskText = document.createElement("span");
            taskText.textContent = `${task.title} - ${task.description}`;
    
            // Botón de eliminar
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.onclick = () => deleteTask(task.id);
    
            // Agregar elementos al <li>
            li.appendChild(taskText);
            li.appendChild(deleteButton);
            
            // Agregar la tarea a la lista
            taskList.appendChild(li);
        });
    }

    // Crear tarea
    taskForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        await createTask(title, description);
        loadTasks();
    });

    await loadTasks();
});