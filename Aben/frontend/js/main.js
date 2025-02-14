document.addEventListener("DOMContentLoaded", async () => {
    const taskList = document.getElementById("taskList");
    const taskForm = document.getElementById("taskForm");

    // Cargar tareas
    async function loadTasks() {
        taskList.innerHTML = "";
        const tasks = await getTasks();
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `${task.title} - ${task.description} 
                <button onclick="deleteTask(${task.id})">Eliminar</button>`;
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