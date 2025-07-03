const TaskDataLayer = require('../capa-datos/data_layer');

// Capa de lógica de negocio - maneja las reglas y validaciones
class TaskLogicLayer {
    constructor() {
        this.dataLayer = new TaskDataLayer();
        console.log("✅ Capa de lógica inicializada");
    }

    // Validaciones básicas de los datos de entrada
    _validateTaskData(taskData) {
        if (!taskData || typeof taskData.title !== 'string' || taskData.title.trim() === '') {
            throw new Error('El título es obligatorio y debe ser una cadena de texto.');
        }
        
        // Regla de negocio: El título no puede ser más largo de 100 caracteres
        if (taskData.title && taskData.title.length > 100) {
            throw new Error('El título no puede tener más de 100 caracteres');
        }
        
        // Regla de negocio: No se puede marcar una tarea como completada al crearla
        if (taskData.completed === true) {
            throw new Error('No se puede crear una tarea ya completada');
        }
    }

    // Verifica que el ID sea válido
    _validateTaskId(id) {
        if (isNaN(id) || id <= 0) {
            throw new Error('El ID debe ser un número positivo.');
        }
    }

    // Crea una tarea nueva con las reglas de negocio
    async createTask(taskData) {
        this._validateTaskData(taskData);
        console.log('✨ Lógica de negocio: creando tarea...');
        
        // Aplicar reglas de negocio adicionales
        const processedTaskData = {
            ...taskData,
            title: taskData.title.trim(),
            completed: false // Regla: siempre false al crear
        };
        
        return await this.dataLayer.createTask(processedTaskData);
    }

    // Busca una tarea por su ID
    async getTaskById(id) {
        this._validateTaskId(id);
        console.log(`✨ Lógica de negocio: buscando tarea ${id}...`);
        const task = await this.dataLayer.getTaskById(id);
        if (!task) {
            throw new Error(`Tarea con ID ${id} no encontrada.`);
        }
        
        // Aplicar transformaciones de negocio
        return {
            ...task,
            status: task.completed ? 'completada' : 'pendiente'
        };
    }

    // Obtiene todas las tareas con info adicional
    async getAllTasks() {
        console.log('✨ Lógica de negocio: obteniendo todas las tareas...');
        const tasks = await this.dataLayer.getAllTasks();
        
        // Aplicamos reglas de negocio a la respuesta
        return tasks.map(task => ({
            ...task,
            status: task.completed ? 'completada' : 'pendiente',
            priority: this._calculatePriority(task)
        }));
    }

    // Actualiza una tarea existente
    async updateTask(id, updates) {
        this._validateTaskId(id);
        if (!updates || Object.keys(updates).length === 0) {
            throw new Error('Debe proporcionar al menos un campo para actualizar.');
        }
        
        // Validar los datos de actualización
        if (updates.title !== undefined) {
            this._validateTaskData({ title: updates.title, completed: false });
        }
        
        console.log(`✨ Lógica de negocio: actualizando tarea ${id}...`);
        
        // Procesar los datos según reglas de negocio
        const processedUpdates = {
            ...updates,
            title: updates.title ? updates.title.trim() : undefined
        };
        
        const updatedTask = await this.dataLayer.updateTask(id, processedUpdates);
        if (!updatedTask) {
            throw new Error(`Tarea con ID ${id} no encontrada.`);
        }
        
        // Aplicar transformaciones de negocio
        return {
            ...updatedTask,
            status: updatedTask.completed ? 'completada' : 'pendiente'
        };
    }

    // Elimina una tarea
    async deleteTask(id) {
        this._validateTaskId(id);
        console.log(`✨ Lógica de negocio: eliminando tarea ${id}...`);
        
        const deletedTask = await this.dataLayer.deleteTask(id);
        if (!deletedTask) {
            throw new Error(`Tarea con ID ${id} no encontrada.`);
        }
        return deletedTask;
    }

    // Calcula la prioridad basada en la fecha de creación
    _calculatePriority(task) {
        const now = new Date();
        const created = new Date(task.createdAt);
        const daysDiff = Math.floor((now - created) / (1000 * 60 * 60 * 24));
        
        if (task.completed) return 'completada';
        if (daysDiff > 7) return 'alta';
        if (daysDiff > 3) return 'media';
        return 'baja';
    }

    // Genera estadísticas de las tareas
    async getTaskStatistics() {
        console.log('✨ Lógica de negocio: calculando estadísticas...');
        const tasks = await this.dataLayer.getAllTasks();
        
        return {
            total: tasks.length,
            completed: tasks.filter(t => t.completed).length,
            pending: tasks.filter(t => !t.completed).length,
            priorities: {
                high: tasks.filter(t => this._calculatePriority(t) === 'alta').length,
                medium: tasks.filter(t => this._calculatePriority(t) === 'media').length,
                low: tasks.filter(t => this._calculatePriority(t) === 'baja').length
            }
        };
    }
}

module.exports = TaskLogicLayer; 