# Aplicación Monolítica - TODO List

Una app simple de tareas implementada como monolito. Todo el código está en un solo archivo.

## ¿Qué es un monolito?

Es cuando ponés toda la aplicación en un solo programa. En este caso, todo (servidor, lógica y datos) está en `app.js`.

## Ventajas:

- Super fácil de entender
- Testing simple
- Deploy directo - solo un archivo
- Mejor performance porque no hay network calls

## Desventajas:

- No escala bien - es todo o nada
- Cuando crece se vuelve difícil de mantener
- Si falla algo, falla todo
- Con equipos grandes es complicado trabajar

## ¿Cuándo usar monolito?

- Apps pequeñas
- Para aprender
- Prototipos que necesitas hacer rápido
- Equipos chicos

## Cómo correr esto

1. Instalar:
```bash
npm install
```

2. Correr:
```bash
npm start
```

3. Endpoints disponibles:
- GET /api/tasks - Ver tareas
- POST /api/tasks - Crear tarea
- PUT /api/tasks/:id - Actualizar tarea
- DELETE /api/tasks/:id - Borrar tarea

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