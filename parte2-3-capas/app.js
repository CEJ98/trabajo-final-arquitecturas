// Esta es la capa de presentación - solo maneja HTTP
const express = require('express');
const app = express();
const logicLayer = require('./capa-logica/logic_layer');

app.use(express.json());

// Rutas
app.get('/api/tasks', (req, res) => {
    const tareas = logicLayer.getAllTareas();
    res.json(tareas);
});

app.post('/api/tasks', (req, res) => {
    try {
        const nuevaTarea = logicLayer.createTarea(req.body.title);
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = logicLayer.updateTarea(id, req.body);
    if (!tarea) {
        return res.status(404).json({ error: 'No existe' });
    }
    res.json(tarea);
});

app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const eliminada = logicLayer.deleteTarea(id);
    if (!eliminada) {
        return res.status(404).json({ error: 'No existe' });
    }
    res.status(204).send();
});

// iniciar servidor
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor 3 capas en puerto ${PORT}`);
}); 