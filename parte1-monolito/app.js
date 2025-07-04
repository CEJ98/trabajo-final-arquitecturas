// TODO list simple - todo en un archivo
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// acá guardo las tareas
let tareas = [];

// GET - ver todas las tareas
app.get('/api/tasks', (req, res) => {
    res.json(tareas);
});

// POST - agregar nueva tarea
app.post('/api/tasks', (req, res) => {
    const tarea = {
        id: tareas.length + 1,
        title: req.body.title,
        completed: false
    };
    tareas.push(tarea);
    res.status(201).json(tarea);
});

// PUT - cambiar una tarea
app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        if (req.body.title) tarea.title = req.body.title;
        if (req.body.completed !== undefined) tarea.completed = req.body.completed;
        res.json(tarea);
    } else {
        res.status(404).json({ error: 'No existe esa tarea' });
    }
});

// DELETE - borrar tarea
app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tareas = tareas.filter(t => t.id !== id);
    res.status(204).send();
});

// arrancar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});