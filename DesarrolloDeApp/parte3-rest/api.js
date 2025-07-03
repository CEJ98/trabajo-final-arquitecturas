const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Almacenamiento temporal
const taskStore = new Map();
let taskIdGenerator = 1;

// Validaciones
function validateTaskFormat(task) {
    if (!task.title || typeof task.title !== 'string' || task.title.trim() === '') {
        throw new Error('El título es requerido y debe ser una cadena no vacía');
    }
    if (task.completed !== undefined && typeof task.completed !== 'boolean') {
        throw new Error('El estado completado debe ser un booleano');
    }
}

// Validar ID de tarea
function validateTaskId(id) {
    const taskId = parseInt(id);
    if (isNaN(taskId) || taskId <= 0) {
        throw new Error('El ID de la tarea debe ser un número positivo');
    }
    return taskId;
}

// Endpoints REST
app.get('/tasks', (req, res) => {
    try {
        console.log('📋 Obteniendo lista de tareas...');
        const tasks = Array.from(taskStore.values());
        res.status(200).json(tasks);
    } catch (error) {
        console.error('❌ Error al obtener tareas:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// GET /tasks/:id - Obtener una tarea específica
app.get('/tasks/:id', (req, res) => {
    try {
        const taskId = validateTaskId(req.params.id);
        console.log(`🔍 Buscando tarea con ID: ${taskId}`);

        const task = taskStore.get(taskId);
        if (!task) {
            console.log(`❌ Tarea no encontrada: ${taskId}`);
            return res.status(404).json({ 
                error: `No existe una tarea con el ID ${taskId}` 
            });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error('❌ Error al buscar tarea:', error.message);
        res.status(400).json({ error: error.message });
    }
});

// POST /tasks - Crear una nueva tarea
app.post('/tasks', (req, res) => {
    try {
        const { title, completed = false } = req.body;
        console.log('📝 Intentando crear nueva tarea:', { title, completed });

        validateTaskFormat({ title, completed });

        const task = {
            id: taskIdGenerator++,
            title: title.trim(),
            completed,
            createdAt: new Date().toISOString()
        };

        taskStore.set(task.id, task);
        console.log('✅ Tarea creada exitosamente:', task);
        res.status(201).json(task);
    } catch (error) {
        console.error('❌ Error al crear tarea:', error.message);
        res.status(400).json({ error: error.message });
    }
});

// PUT /tasks/:id - Actualizar una tarea existente
app.put('/tasks/:id', (req, res) => {
    try {
        const taskId = validateTaskId(req.params.id);
        console.log(`🔄 Intentando actualizar tarea ${taskId}:`, req.body);

        if (Object.keys(req.body).length === 0) {
            throw new Error('Se requiere al menos un campo para actualizar');
        }

        const task = taskStore.get(taskId);
        if (!task) {
            console.log(`❌ Tarea no encontrada: ${taskId}`);
            return res.status(404).json({ 
                error: `No existe una tarea con el ID ${taskId}` 
            });
        }

        validateTaskFormat({ ...task, ...req.body });

        const updatedTask = {
            ...task,
            ...req.body,
            title: req.body.title ? req.body.title.trim() : task.title,
            updatedAt: new Date().toISOString()
        };

        taskStore.set(taskId, updatedTask);
        console.log('✅ Tarea actualizada:', updatedTask);
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('❌ Error al actualizar tarea:', error.message);
        res.status(400).json({ error: error.message });
    }
});

// PATCH /tasks/:id - Actualizar parcialmente una tarea
app.patch('/tasks/:id', (req, res) => {
    try {
        const taskId = validateTaskId(req.params.id);
        console.log(`🔄 Intentando actualizar parcialmente tarea ${taskId}:`, req.body);

        if (Object.keys(req.body).length === 0) {
            throw new Error('Se requiere al menos un campo para actualizar');
        }

        const task = taskStore.get(taskId);
        if (!task) {
            console.log(`❌ Tarea no encontrada: ${taskId}`);
            return res.status(404).json({ 
                error: `No existe una tarea con el ID ${taskId}` 
            });
        }

        const updatedTask = {
            ...task,
            ...req.body,
            title: req.body.title ? req.body.title.trim() : task.title,
            updatedAt: new Date().toISOString()
        };

        taskStore.set(taskId, updatedTask);
        console.log('✅ Tarea actualizada parcialmente:', updatedTask);
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('❌ Error al actualizar tarea:', error.message);
        res.status(400).json({ error: error.message });
    }
});

// DELETE /tasks/:id - Eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
    try {
        const taskId = validateTaskId(req.params.id);
        console.log(`🗑️  Intentando eliminar tarea ${taskId}`);

        const task = taskStore.get(taskId);
        if (!task) {
            console.log(`❌ Tarea no encontrada: ${taskId}`);
            return res.status(404).json({ 
                error: `No existe una tarea con el ID ${taskId}` 
            });
        }

        taskStore.delete(taskId);
        console.log('✅ Tarea eliminada:', task);
        res.status(204).send();
    } catch (error) {
        console.error('❌ Error al eliminar tarea:', error.message);
        res.status(400).json({ error: error.message });
    }
});

// HEAD /tasks - Verificar si hay tareas
app.head('/tasks', (req, res) => {
    try {
        console.log('🔍 Verificando existencia de tareas...');
        const hasTasks = taskStore.size > 0;
        res.status(hasTasks ? 200 : 404).end();
    } catch (error) {
        console.error('❌ Error al verificar tareas:', error.message);
        res.status(500).end();
    }
});

// OPTIONS /tasks - Obtener opciones disponibles
app.options('/tasks', (req, res) => {
    console.log('ℹ️  Obteniendo opciones disponibles...');
    res.set({
        'Allow': 'GET, POST, HEAD, OPTIONS',
        'Content-Type': 'application/json'
    }).status(200).end();
});

app.options('/tasks/:id', (req, res) => {
    console.log('ℹ️  Obteniendo opciones disponibles para tarea específica...');
    res.set({
        'Allow': 'GET, PUT, PATCH, DELETE, HEAD, OPTIONS',
        'Content-Type': 'application/json'
    }).status(200).end();
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('❌ Error inesperado:', err);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Iniciamos el servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`🚀 API REST escuchando en http://localhost:${PORT}`);
    console.log('📊 Modo:', process.env.NODE_ENV || 'development');
    console.log('🔧 Configuración:', {
        port: PORT,
        environment: process.env.NODE_ENV || 'development'
    });
    console.log('📚 Endpoints disponibles:');
    console.log('  GET    /tasks');
    console.log('  POST   /tasks');
    console.log('  GET    /tasks/:id');
    console.log('  PUT    /tasks/:id');
    console.log('  PATCH  /tasks/:id');
    console.log('  DELETE /tasks/:id');
    console.log('  HEAD   /tasks');
    console.log('  OPTIONS /tasks');
}); 