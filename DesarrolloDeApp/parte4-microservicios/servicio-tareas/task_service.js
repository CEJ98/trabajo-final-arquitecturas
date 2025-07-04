// Servicio de tareas - microservicio independiente
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// guardar las tareas acá
const tareas = new Map();
let contador = 1;

// ver todas las tareas
app.get('/tasks', (req, res) => {
    const lista = Array.from(tareas.values());
    res.json(lista);
});

// una tarea específica
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.get(id);
    
    if (!tarea) {
        return res.status(404).json({ error: 'No existe' });
    }
    
    res.json(tarea);
});

// crear tarea
app.post('/tasks', (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({ error: 'Falta el título' });
    }

    const tarea = {
        id: contador++,
        title: req.body.title,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tareas.set(tarea.id, tarea);
    res.status(201).json(tarea);
});

// actualizar tarea
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.get(id);
    
    if (!tarea) {
        return res.status(404).json({ error: 'No existe' });
    }

    if (req.body.title) tarea.title = req.body.title;
    if (req.body.completed !== undefined) tarea.completed = req.body.completed;
    tarea.updatedAt = new Date().toISOString();

    tareas.set(id, tarea);
    res.json(tarea);
});

// borrar tarea
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (!tareas.has(id)) {
        return res.status(404).json({ error: 'No existe' });
    }

    tareas.delete(id);
    res.status(204).send();
});

// arrancar servicio
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Servicio de tareas en puerto ${PORT}`);
}); 