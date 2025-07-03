// Capa de datos - maneja el almacenamiento de tareas
class TaskDataLayer {
    constructor() {
        this.tasks = new Map();
        this.nextId = 1;
        console.log("✅ Capa de datos inicializada (en memoria)");
    }

    // Guarda una nueva tarea
    async createTask(taskData) {
        const task = {
            id: this.nextId++,
            title: taskData.title,
            completed: taskData.completed || false,
            createdAt: new Date().toISOString()
        };

        this.tasks.set(task.id, task);
        console.log('💾 Tarea guardada en la capa de datos:', task);
        return task;
    }

    // Busca una tarea por ID
    async getTaskById(id) {
        const task = this.tasks.get(id);
        if (!task) {
            console.log(`🔍 Tarea no encontrada en la capa de datos: ${id}`);
            return null;
        }
        console.log('📥 Tarea recuperada de la capa de datos:', task);
        return task;
    }

    // Obtiene todas las tareas
    async getAllTasks() {
        const tasks = Array.from(this.tasks.values());
        console.log(`📚 Recuperadas ${tasks.length} tareas de la capa de datos`);
        return tasks;
    }

    // Actualiza una tarea existente
    async updateTask(id, updates) {
        const task = this.tasks.get(id);
        if (!task) {
            console.log(`❌ No se puede actualizar: tarea ${id} no encontrada`);
            return null;
        }

        const updatedTask = {
            ...task,
            ...updates,
            updatedAt: new Date().toISOString()
        };

        this.tasks.set(id, updatedTask);
        console.log('🔄 Tarea actualizada en la capa de datos:', updatedTask);
        return updatedTask;
    }

    // Elimina una tarea
    async deleteTask(id) {
        const task = this.tasks.get(id);
        if (!task) {
            console.log(`❌ No se puede eliminar: tarea ${id} no encontrada`);
            return null;
        }

        this.tasks.delete(id);
        console.log('🗑️  Tarea eliminada de la capa de datos:', task);
        return task;
    }
}

module.exports = TaskDataLayer; 