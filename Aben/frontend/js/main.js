document.addEventListener("DOMContentLoaded", async () => {
    const taskList = document.getElementById("taskList");
    const taskForm = document.getElementById("taskForm");

    // Cargar tareas
    async function loadTasks() {
        if (!taskList) return console.error("Elemento 'taskList' no encontrado.");
    
        taskList.innerHTML = ""; // Limpiar la lista antes de agregar nuevas tareas
        const data = await getTasks();
        const tasks = data.tasks || [];
    
        tasks.forEach(task => {
            const li = document.createElement("li");
            
            const taskText = document.createElement("span");
            taskText.textContent = `${task.title} - ${task.description}`;
    
            // Botón de eliminar
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.onclick = async () => {
                await deleteTask(task.id);
                await loadTasks(); // 🔄 Recargar lista después de eliminar
            };
    
            li.appendChild(taskText);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }

    // Crear tarea
    taskForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        await createTask(title, description);
        await loadTasks();
    });

    await loadTasks();
});
