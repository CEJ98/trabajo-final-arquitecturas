const express = require('express');
const TaskLogicLayer = require('./capa-logica/logic_layer');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Inicialización de la capa de lógica
const taskLogic = new TaskLogicLayer();

const PORT = process.env.PORT || 5002;

// ===== ENDPOINTS =====
// Obtener todas las tareas
app.get('/tasks', async (req, res, next) => {
    try {
        console.log('GET /tasks - Obteniendo todas las tareas...');
        const tasks = await taskLogic.getAllTasks();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
});

// Obtener una tarea por ID
app.get('/tasks/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        console.log(`GET /tasks/${id} - Obteniendo tarea...`);
        const task = await taskLogic.getTaskById(id);
        res.json(task);
    } catch (error) {
        next(error);
    }
});

// Crear una nueva tarea
app.post('/tasks', async (req, res, next) => {
    try {
        console.log('POST /tasks - Creando nueva tarea...');
        const newTask = await taskLogic.createTask(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
});

// Actualizar una tarea
app.put('/tasks/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        console.log(`PUT /tasks/${id} - Actualizando tarea...`);
        const updatedTask = await taskLogic.updateTask(id, req.body);
        res.json(updatedTask);
    } catch (error) {
        next(error);
    }
});

// Eliminar una tarea
app.delete('/tasks/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        console.log(`DELETE /tasks/${id} - Eliminando tarea...`);
        await taskLogic.deleteTask(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

// Manejador global de errores
app.use((err, req, res, next) => {
    console.error('❌ Error no controlado:', err.message);
    res.status(500).json({ error: 'Algo salió mal en el servidor.' });
});

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor de 3 capas escuchando en http://localhost:${PORT}`);
    console.log(`🔧 Modo: ${process.env.NODE_ENV || 'development'}`);
}); 