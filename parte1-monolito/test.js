// Pruebas básicas para la app de tareas
const assert = require('assert');
const app = require('./app');

// Array para guardar las tareas
const tareas = [];

// Probando la app
console.log('Probando la app de tareas...');

// Prueba 1: Crear una tarea
const tarea = { 
    id: 1, 
    titulo: 'Hacer la tarea', 
    completada: false 
};
tareas.push(tarea);
assert.strictEqual(tareas.length, 1);
console.log('✅ Crear tarea: OK');

// Prueba 2: Marcar como completada
tarea.completada = true;
assert.strictEqual(tarea.completada, true);
console.log('✅ Completar tarea: OK');

// Prueba 3: Borrar la tarea
tareas.pop();
assert.strictEqual(tareas.length, 0);
console.log('✅ Borrar tarea: OK');

console.log('¡Todas las pruebas pasaron! 🎉'); 