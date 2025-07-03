// API REST para TODO list
const express = require('express');
const app = express();

// Para leer JSON
app.use(express.json());

// Array para guardar las tareas
let tareas = [];
let idActual = 1;

// Log de peticiones
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Manejo de errores
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
};

// Rutas RESTful

// 1. Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
    res.json(tareas);
});

// 2. Obtener una tarea específica
app.get('/api/tasks/:id', (req, res) => {
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(tarea);
});

// 3. Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
    if (!req.body.titulo) {
        return res.status(400).json({ error: 'El título es requerido' });
    }

    const nuevaTarea = {
        id: idActual++,
        titulo: req.body.titulo,
        completada: false,
        fechaCreacion: new Date().toISOString()
    };

    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

// 4. Actualizar una tarea
app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);
    
    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    if (req.body.titulo) tarea.titulo = req.body.titulo;
    if (req.body.completada !== undefined) tarea.completada = req.body.completada;
    tarea.fechaActualizacion = new Date().toISOString();

    res.json(tarea);
});

// 5. Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tareas.findIndex(t => t.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    tareas.splice(index, 1);
    res.status(204).send();
});

// 6. Marcar todas las tareas como completadas
app.patch('/api/tasks/completar-todas', (req, res) => {
    tareas.forEach(tarea => {
        tarea.completada = true;
        tarea.fechaActualizacion = new Date().toISOString();
    });
    res.json(tareas);
});

// Aplicar el middleware de errores
app.use(errorHandler);

// Iniciar el servidor
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Servidor REST corriendo en http://localhost:${PORT}`);
}); 