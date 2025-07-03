# Aplicación Monolítica - TODO List

Esta es una aplicación simple de TODO list implementada como una arquitectura monolítica.

## ¿Qué es una arquitectura monolítica?

Una arquitectura monolítica es cuando toda la aplicación está en un solo programa. En nuestro caso, todo el código (servidor, lógica de negocio y datos) está en un solo archivo `app.js`.

## Ventajas de una arquitectura monolítica:

- Fácil de desarrollar y entender
- Fácil de probar
- Fácil de desplegar (solo un programa)
- Mejor rendimiento (no hay comunicación entre servicios)

## Desventajas:

- No escala bien (todo crece junto)
- Es difícil mantener el código cuando crece
- Un error puede afectar a toda la aplicación
- Es difícil trabajar en equipo

## ¿Cuándo usar una arquitectura monolítica?

- Aplicaciones pequeñas
- Proyectos de aprendizaje
- Prototipos rápidos
- Cuando el equipo es pequeño

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
curl -X POST -H "Content-Type: application/json" -d '{"titulo":"Hacer la tarea"}' http://localhost:3000/api/tasks

# Ver todas las tareas
curl http://localhost:3000/api/tasks

# Actualizar una tarea
curl -X PUT -H "Content-Type: application/json" -d '{"completada":true}' http://localhost:3000/api/tasks/1

# Eliminar una tarea
curl -X DELETE http://localhost:3000/api/tasks/1
``` 