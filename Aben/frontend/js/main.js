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

    // Elementos del modal de confirmación de creación
    const confirmCreateModal = document.getElementById("confirmCreateModal");
    const confirmCreate = document.getElementById("confirmCreate");
    const cancelCreate = document.getElementById("cancelCreate");
    const createTaskTitle = document.getElementById("createTaskTitle");
    const createTaskDescription = document.getElementById("createTaskDescription");

    // Función para cargar tareas
    async function loadTasks() {
        taskList.innerHTML = "";
        const data = await getTasks();
        const tasks = data.tasks || [];

        tasks.forEach(task => {
            const li = document.createElement("li");

            // esilos lista
            li.style.display = "flex";
            li.style.alignItems = "center";

            // icono plus
            const icon = document.createElement("i");
            icon.classList.add("fa-solid", "fa-plus");
            icon.classList.add("size-li");
            icon.style.flex = "0 0 5%";

            // descripcion tarea
            const taskText = document.createElement("span");
            taskText.textContent = `${task.title} - ${task.description}`;
            if (task.status === "0") {
                taskText.classList.add("strikethrough");
            }
            taskText.classList.add("text-li");
            taskText.classList.add("size-li");
            taskText.style.flex = "0 0 60%";

            // Botón de eliminar
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteButton.classList.add("color-icon");
            deleteButton.classList.add("size-li");
            deleteButton.onclick = () => openDeleteModal(task.id);
            deleteButton.style.flex = "0 0 10%";

            // Botón de editar
            const updateButton = document.createElement("button");
            updateButton.innerHTML = '<i class="fa-solid fa-pencil"></i>';
            updateButton.classList.add("color-icon");
            updateButton.classList.add("size-li");
            updateButton.onclick = () => openEditModal(task);
            updateButton.style.flex = "0 0 10%";

            // Botón activar
            const activateButton = document.createElement("button");
            activateButton.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
            activateButton.classList.add("color-icon");
            activateButton.classList.add("size-li");
            activateButton.onclick = () => openActivateModal(task.id);
            activateButton.style.flex = "0 0 10%";

            // Botón desactivar
            const deactivateButton = document.createElement("button");
            deactivateButton.innerHTML = '<i class="fa-solid fa-check"></i>';
            deactivateButton.classList.add("color-icon");
            deactivateButton.classList.add("size-li");
            deactivateButton.onclick = () => openDeactivateModal(task.id);
            deactivateButton.style.flex = "0 0 10%";

            li.appendChild(icon);
            li.appendChild(taskText);
            li.appendChild(deleteButton);
            li.appendChild(updateButton);

            if (task.status === "1") {
                li.appendChild(deactivateButton);
            } else {
                li.appendChild(activateButton);
            }
            taskList.appendChild(li);
        });
    }

    // Función para abrir el modal de activación
    function openActivateModal(id) {
        activateTaskId.value = id;
        confirmActivateModal.style.display = "flex";
    }

    // Función para abrir el modal de desactivación
    function openDeactivateModal(id) {
        deactivateTaskId.value = id;
        confirmDeactivateModal.style.display = "flex";
    }

    // Confirmar activación
    confirmActivate.addEventListener("click", async () => {
        const id = activateTaskId.value;
        await updateTaskStatus(id, 1); // 1 = Activar
        confirmActivateModal.style.display = "none"; // Cerrar modal
        await loadTasks();
    });

    // Confirmar desactivación
    confirmDeactivate.addEventListener("click", async () => {
        const id = deactivateTaskId.value;
        await updateTaskStatus(id, 0); // 0 = Desactivar
        confirmDeactivateModal.style.display = "none"; // Cerrar modal
        await loadTasks();
    });

    // Cancelar activación
    cancelActivate.addEventListener("click", () => {
        confirmActivateModal.style.display = "none";
    });

    // Cancelar desactivación
    cancelDeactivate.addEventListener("click", () => {
        confirmDeactivateModal.style.display = "none";
    });

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

    function closeEditModal() {
        editModal.style.display = "none";
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
        await loadTasks();
    });

    // Abrir modal de confirmación antes de crear una tarea
    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        createTaskTitle.value = document.getElementById("title").value;
        createTaskDescription.value = document.getElementById("description").value;
        confirmCreateModal.style.display = "flex"; 
    });

    // Confirmar la creación de la tarea
    confirmCreate.addEventListener("click", async () => {
        await createTask(createTaskTitle.value, createTaskDescription.value);
        confirmCreateModal.style.display = "none"; // Cerrar modal
        await loadTasks(); // Recargar lista
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
    });

    // Evento para enviar el formulario de edición
    editForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // 🔥 Evita recargar la página
        const id = editTaskId.value;
        const title = editTitle.value;
        const description = editDescription.value;

        try {
            console.log("entro a try");
            await updateTask(id, title, description);
            console.log("despue funcon");
            closeEditModal(); // 🔥 Cierra el modal tras actualizar
            await loadTasks(); // 🔥 Recarga la lista de tareas
        } catch (error) {
            console.error("Error al actualizar tarea:", error);
        }
    });

    // Cancelar la creación
    cancelCreate.addEventListener("click", () => {
        confirmCreateModal.style.display = "none"; 
    });

    await loadTasks();
});
