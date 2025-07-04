// Acá pongo las validaciones y eso
const dataLayer = require('../capa-datos/data_layer');

const logicLayer = {
    getAllTareas: () => {
        return dataLayer.getAllTareas();
    },

    createTarea: (title) => {
        // validar que no esté vacío
        if (!title || title.trim() === '') {
            throw new Error('Necesitas poner un título');
        }
        return dataLayer.createTarea(title);
    },

    updateTarea: (id, datos) => {
        if (!id) {
            throw new Error('Falta el ID');
        }
        if (datos.title && datos.title.trim() === '') {
            throw new Error('El título no puede estar vacío');
        }
        return dataLayer.updateTarea(id, datos);
    },

    deleteTarea: (id) => {
        if (!id) {
            throw new Error('Falta el ID');
        }
        return dataLayer.deleteTarea(id);
    }
};

module.exports = logicLayer; 