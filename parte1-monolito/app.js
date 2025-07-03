// Importamos express
const express = require('express');
const app = express();
const port = 3000;

// Para leer JSON
app.use(express.json());

// Array para guardar las tareas
let tareas = [];

// Rutas para manejar las tareas

// 1. Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
    res.json(tareas);
});

// 2. Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
    const tarea = {
        id: tareas.length + 1,
        titulo: req.body.titulo,
        completada: false
    };
    tareas.push(tarea);
    res.status(201).json(tarea);
});

// 3. Marcar tarea como completada
app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completada = true;
        res.json(tarea);
    } else {
        res.status(404).json({ error: 'Tarea no encontrada' });
    }
});

// 4. Borrar una tarea
app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tareas = tareas.filter(t => t.id !== id);
    res.status(204).send();
});

// Iniciamos el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});