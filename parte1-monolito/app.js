// Aplicación monolítica para gestión de tareas
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Lista de tareas en memoria
let tareas = [];

// Endpoints de la API

// GET - Listar tareas
app.get('/api/tasks', (req, res) => {
    res.json(tareas);
});

// POST - Crear tarea nueva
app.post('/api/tasks', (req, res) => {
    const tarea = {
        id: tareas.length + 1,
        titulo: req.body.titulo,
        completada: false
    };
    tareas.push(tarea);
    res.status(201).json(tarea);
});

// PUT - Actualizar tarea
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

// DELETE - Eliminar tarea
app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tareas = tareas.filter(t => t.id !== id);
    res.status(204).send();
});

// Levantar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});