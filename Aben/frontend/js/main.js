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
            const taskText = document.createElement("span");
            taskText.textContent = `${task.title} - ${task.description}`;

            // Botón de eliminar
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.onclick = () => openDeleteModal(task.id);

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

    // Cancelar la creación
    cancelCreate.addEventListener("click", () => {
        confirmCreateModal.style.display = "none"; 
    });

    await loadTasks();
});
