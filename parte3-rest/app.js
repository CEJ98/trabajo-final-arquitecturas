// API REST - con todos los métodos HTTP
const express = require('express');
const app = express();

app.use(express.json());

let tareas = [];
let contador = 1;

// para ver qué llega
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// GET todas
app.get('/api/tasks', (req, res) => {
    res.json(tareas);
});

// GET una específica
app.get('/api/tasks/:id', (req, res) => {
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if (!tarea) {
        return res.status(404).json({ error: 'No existe' });
    }
    res.json(tarea);
});

// POST nueva tarea
app.post('/api/tasks', (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({ error: 'Falta el título' });
    }

    const tarea = {
        id: contador++,
        title: req.body.title,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tareas.push(tarea);
    res.status(201).json(tarea);
});

// PUT actualizar
app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);
    
    if (!tarea) {
        return res.status(404).json({ error: 'No existe' });
    }

    if (req.body.title) tarea.title = req.body.title;
    if (req.body.completed !== undefined) tarea.completed = req.body.completed;
    tarea.updatedAt = new Date().toISOString();

    res.json(tarea);
});

// DELETE borrar
app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tareas.findIndex(t => t.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'No existe' });
    }

    tareas.splice(index, 1);
    res.status(204).send();
});

// PATCH - completar todas
app.patch('/api/tasks/complete-all', (req, res) => {
    tareas.forEach(tarea => {
        tarea.completed = true;
        tarea.updatedAt = new Date().toISOString();
    });
    res.json(tareas);
});

// arrancar servidor
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`API REST en puerto ${PORT}`);
}); 