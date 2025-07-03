// Capa de Datos
// Guarda y recupera los datos

// Array para guardar las tareas
let tareas = [];
let idActual = 1;

// Funciones para manejar los datos
const dataLayer = {
    // Obtener todas las tareas
    getAllTareas: () => {
        return tareas;
    },

    // Crear una nueva tarea
    createTarea: (titulo) => {
        const nuevaTarea = {
            id: idActual++,
            titulo: titulo,
            completada: false
        };
        tareas.push(nuevaTarea);
        return nuevaTarea;
    },

    // Actualizar una tarea
    updateTarea: (id, datos) => {
        const tarea = tareas.find(t => t.id === id);
        if (!tarea) return null;

        if (datos.titulo) tarea.titulo = datos.titulo;
        if (datos.completada !== undefined) tarea.completada = datos.completada;
        
        return tarea;
    },

    // Eliminar una tarea
    deleteTarea: (id) => {
        const index = tareas.findIndex(t => t.id === id);
        if (index === -1) return false;

        tareas.splice(index, 1);
        return true;
    }
};

module.exports = dataLayer; 