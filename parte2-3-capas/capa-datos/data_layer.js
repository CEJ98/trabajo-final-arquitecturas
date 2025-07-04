// Acá están los datos - como si fuera la base de datos
let tareas = [];
let contador = 1;

const dataLayer = {
    getAllTareas: () => {
        return tareas;
    },

    createTarea: (title) => {
        const tarea = {
            id: contador++,
            title: title,
            completed: false
        };
        tareas.push(tarea);
        return tarea;
    },

    updateTarea: (id, datos) => {
        const tarea = tareas.find(t => t.id === id);
        if (!tarea) return null;

        // cambiar solo lo que viene
        if (datos.title) tarea.title = datos.title;
        if (datos.completed !== undefined) tarea.completed = datos.completed;
        
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