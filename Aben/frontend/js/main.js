document.addEventListener("DOMContentLoaded", async () => {
    const taskList = document.getElementById("taskList");
    const taskForm = document.getElementById("taskForm");

    // Elementos del modal
    const editModal = document.getElementById("editModal");
    const editForm = document.getElementById("editForm");
    const editTaskId = document.getElementById("editTaskId");
    const editTitle = document.getElementById("editTitle");
    const editDescription = document.getElementById("editDescription");
    const closeModal = document.getElementById("closeModal");

    // Función para cargar tareas
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

            // Botón de editar
            const updateButton = document.createElement("button");
            updateButton.textContent = "Editar";
            updateButton.onclick = () => openEditModal(task); // Abrir modal con datos de la tarea
    
            li.appendChild(taskText);
            li.appendChild(deleteButton);
            li.appendChild(updateButton);
            taskList.appendChild(li);
        });
    }

    // Función para abrir el modal y llenar los inputs con los datos de la tarea
    function openEditModal(task) {
        editTaskId.value = task.id;
        editTitle.value = task.title;
        editDescription.value = task.description;
        editModal.style.display = "flex";
    }

    // Cerrar el modal al hacer clic en "Cancelar"
    closeModal.addEventListener("click", () => {
        editModal.style.display = "none";
    });

    // Evento para actualizar la tarea cuando se envía el formulario del modal
    editForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const id = editTaskId.value;
        const title = editTitle.value;
        const description = editDescription.value;

        await updateTask(id, title, description); // Actualizar tarea en el backend
        editModal.style.display = "none"; // Cerrar modal
        await loadTasks(); // Recargar lista
    });

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
