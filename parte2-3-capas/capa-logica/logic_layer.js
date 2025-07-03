// Capa de Lógica
// Reglas de negocio y validaciones

const dataLayer = require('../capa-datos/data_layer');

const logicLayer = {
    // Obtener todas las tareas
    getAllTareas: () => {
        return dataLayer.getAllTareas();
    },

    // Crear una nueva tarea
    createTarea: (titulo) => {
        // Validación simple
        if (!titulo || titulo.trim() === '') {
            throw new Error('El título no puede estar vacío');
        }
        return dataLayer.createTarea(titulo);
    },

    // Actualizar una tarea
    updateTarea: (id, datos) => {
        // Validación simple
        if (!id) {
            throw new Error('Se requiere un ID');
        }
        if (datos.titulo && datos.titulo.trim() === '') {
            throw new Error('El título no puede estar vacío');
        }
        return dataLayer.updateTarea(id, datos);
    },

    // Eliminar una tarea
    deleteTarea: (id) => {
        // Validación simple
        if (!id) {
            throw new Error('Se requiere un ID');
        }
        return dataLayer.deleteTarea(id);
    }
};

module.exports = logicLayer; 