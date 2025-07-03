// Capa de lógica de negocio
// Acá van las validaciones y reglas

const dataLayer = require('../capa-datos/data_layer');

const logicLayer = {
    getAllTareas: () => {
        return dataLayer.getAllTareas();
    },

    createTarea: (titulo) => {
        // Validar que el título no esté vacío
        if (!titulo || titulo.trim() === '') {
            throw new Error('El título no puede estar vacío');
        }
        return dataLayer.createTarea(titulo);
    },

    updateTarea: (id, datos) => {
        // Chequear que vengan los datos necesarios
        if (!id) {
            throw new Error('Se requiere un ID');
        }
        if (datos.titulo && datos.titulo.trim() === '') {
            throw new Error('El título no puede estar vacío');
        }
        return dataLayer.updateTarea(id, datos);
    },

    deleteTarea: (id) => {
        // Verificar que hay ID
        if (!id) {
            throw new Error('Se requiere un ID');
        }
        return dataLayer.deleteTarea(id);
    }
};

module.exports = logicLayer; 