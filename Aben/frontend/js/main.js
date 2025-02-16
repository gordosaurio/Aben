document.addEventListener("DOMContentLoaded", async () => {
    const taskList = document.getElementById("taskList");
    const taskForm = document.getElementById("taskForm");

    // Elementos del modal de edición
    const editModal = document.getElementById("editModal");
    const editForm = document.getElementById("editForm");
    const editTaskId = document.getElementById("editTaskId");
    const editTitle = document.getElementById("editTitle");
    const editDescription = document.getElementById("editDescription");
    const closeModal = document.getElementById("closeModal");

    // Elementos del modal de confirmación de eliminación
    const confirmDeleteModal = document.getElementById("confirmDeleteModal");
    const deleteTaskId = document.getElementById("deleteTaskId");
    const confirmDelete = document.getElementById("confirmDelete");
    const cancelDelete = document.getElementById("cancelDelete");

    // Función para cargar tareas
    async function loadTasks() {
        taskList.innerHTML = ""; 
        const data = await getTasks();
        const tasks = data.tasks || [];

        tasks.forEach(task => {
            const li = document.createElement("li");
            const taskText = document.createElement("span");
            taskText.textContent = `${task.title} - ${task.description}`;

            // Botón de eliminar
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.onclick = () => openDeleteModal(task.id); // Abre modal de confirmación

            // Botón de editar
            const updateButton = document.createElement("button");
            updateButton.textContent = "Editar";
            updateButton.onclick = () => openEditModal(task);

            li.appendChild(taskText);
            li.appendChild(deleteButton);
            li.appendChild(updateButton);
            taskList.appendChild(li);
        });
    }

    // Función para abrir el modal de edición
    function openEditModal(task) {
        editTaskId.value = task.id;
        editTitle.value = task.title;
        editDescription.value = task.description;
        editModal.style.display = "flex";
    }

    // Función para abrir el modal de confirmación de eliminación
    function openDeleteModal(id) {
        deleteTaskId.value = id;
        confirmDeleteModal.style.display = "flex";
    }

    // Cerrar el modal de edición
    closeModal.addEventListener("click", () => {
        editModal.style.display = "none";
    });

    // Cerrar el modal de eliminación al cancelar
    cancelDelete.addEventListener("click", () => {
        confirmDeleteModal.style.display = "none";
    });

    // Confirmar eliminación de la tarea
    confirmDelete.addEventListener("click", async () => {
        const id = deleteTaskId.value;
        await deleteTask(id);
        confirmDeleteModal.style.display = "none"; // Cerrar modal
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
