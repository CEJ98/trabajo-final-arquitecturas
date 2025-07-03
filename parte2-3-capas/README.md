# Aplicación de 3 Capas - TODO List

Esta es una aplicación simple de TODO list implementada con una arquitectura de 3 capas.

## ¿Qué es una arquitectura de 3 capas?

Una arquitectura de 3 capas divide la aplicación en tres partes principales:

1. **Capa de Presentación** (`app.js`):
   - Maneja las peticiones HTTP
   - Muestra los resultados
   - Es la interfaz con el usuario

2. **Capa de Lógica** (`capa-logica/logic_layer.js`):
   - Contiene las reglas de negocio
   - Hace las validaciones
   - Procesa los datos

3. **Capa de Datos** (`capa-datos/data_layer.js`):
   - Guarda y recupera los datos
   - Maneja la base de datos
   - Almacena la información

## Ventajas:

- Código más organizado
- Más fácil de mantener
- Cada capa tiene una responsabilidad clara
- Más fácil de probar cada parte

## Desventajas:

- Más complejo que una aplicación monolítica
- Puede ser más lento por las llamadas entre capas
- Requiere más código

## ¿Cuándo usar una arquitectura de 3 capas?

- Aplicaciones medianas
- Cuando necesitas separar responsabilidades
- Cuando trabajas en equipo
- Cuando la aplicación puede crecer

## Cómo usar esta aplicación

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar el servidor:
```bash
npm start
```

3. Probar las rutas:
- GET /api/tasks - Ver todas las tareas
- POST /api/tasks - Crear una tarea
- PUT /api/tasks/:id - Actualizar una tarea
- DELETE /api/tasks/:id - Eliminar una tarea

## Ejemplo de uso:

```bash
# Crear una tarea
curl -X POST -H "Content-Type: application/json" -d '{"titulo":"Hacer la tarea"}' http://localhost:3001/api/tasks

# Ver todas las tareas
curl http://localhost:3001/api/tasks

# Actualizar una tarea
curl -X PUT -H "Content-Type: application/json" -d '{"completada":true}' http://localhost:3001/api/tasks/1

# Eliminar una tarea
curl -X DELETE http://localhost:3001/api/tasks/1
```