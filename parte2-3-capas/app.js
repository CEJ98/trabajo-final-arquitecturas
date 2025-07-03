// Capa de Presentación
// Maneja las peticiones HTTP

const express = require('express');
const app = express();
const logicLayer = require('./capa-logica/logic_layer');

// Para leer JSON
app.use(express.json());

// Rutas para manejar las tareas

// 1. Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
    try {
        const tareas = logicLayer.getAllTareas();
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
    try {
        const nuevaTarea = logicLayer.createTarea(req.body.titulo);
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 3. Actualizar una tarea
app.put('/api/tasks/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const tarea = logicLayer.updateTarea(id, req.body);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(tarea);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 4. Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const eliminada = logicLayer.deleteTarea(id);
        if (!eliminada) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Iniciamos el servidor
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 