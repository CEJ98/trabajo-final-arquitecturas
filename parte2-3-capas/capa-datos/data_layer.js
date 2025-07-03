// Capa de datos - manejo de la información
// Simula una base de datos en memoria

let tareas = [];
let idActual = 1;

const dataLayer = {
    getAllTareas: () => {
        return tareas;
    },

    createTarea: (titulo) => {
        const nuevaTarea = {
            id: idActual++,
            titulo: titulo,
            completada: false
        };
        tareas.push(nuevaTarea);
        return nuevaTarea;
    },

    updateTarea: (id, datos) => {
        const tarea = tareas.find(t => t.id === id);
        if (!tarea) return null;

        // Actualizar solo los campos que vienen
        if (datos.titulo) tarea.titulo = datos.titulo;
        if (datos.completada !== undefined) tarea.completada = datos.completada;
        
        return tarea;
    },

    deleteTarea: (id) => {
        const index = tareas.findIndex(t => t.id === id);
        if (index === -1) return false;

        tareas.splice(index, 1);
        return true;
    }
};

module.exports = dataLayer; 