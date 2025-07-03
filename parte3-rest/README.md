# API REST - TODO List

Esta es una aplicación simple de TODO list implementada como una API REST.

## ¿Qué es una API REST?

REST es un estilo de arquitectura para crear servicios web. Las APIs REST:
- Usan HTTP para comunicarse
- Son stateless (no guardan estado)
- Tienen URLs que representan recursos
- Usan métodos HTTP para las operaciones

## Características de esta API:

1. **URLs:**
   - `/api/tasks` - Recurso de tareas
   - `/api/tasks/:id` - Tarea específica

2. **Métodos HTTP:**
   - GET - Obtener datos
   - POST - Crear datos
   - PUT - Actualizar datos
   - DELETE - Eliminar datos
   - PATCH - Actualización parcial

## Ventajas:

- Fácil de entender y usar
- Independiente de la plataforma
- Escalable
- Cacheable

## Desventajas:

- Puede ser más lenta que otras arquitecturas
- No mantiene estado
- Puede ser menos segura si no se configura bien

## ¿Cuándo usar una API REST?

- Cuando necesitas una API pública
- Cuando quieres que sea fácil de usar
- Cuando necesitas escalabilidad
- Cuando trabajas con diferentes plataformas

## Cómo usar esta API

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
- GET /api/tasks/:id - Ver una tarea específica
- POST /api/tasks - Crear una tarea
- PUT /api/tasks/:id - Actualizar una tarea
- DELETE /api/tasks/:id - Eliminar una tarea
- PATCH /api/tasks/completar-todas - Marcar todas como completadas

## Ejemplo de uso:

```bash
# Crear una tarea
curl -X POST -H "Content-Type: application/json" -d '{"titulo":"Hacer la tarea"}' http://localhost:3002/api/tasks

# Ver todas las tareas
curl http://localhost:3002/api/tasks

# Ver una tarea específica
curl http://localhost:3002/api/tasks/1

# Actualizar una tarea
curl -X PUT -H "Content-Type: application/json" -d '{"completada":true}' http://localhost:3002/api/tasks/1

# Eliminar una tarea
curl -X DELETE http://localhost:3002/api/tasks/1

# Marcar todas como completadas
curl -X PATCH http://localhost:3002/api/tasks/completar-todas
``` 