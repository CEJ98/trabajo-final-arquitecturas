# Arquitectura de Microservicios

Esta implementación demuestra una arquitectura de microservicios básica con un **API Gateway** y un **Servicio de Tareas**.

## Estructura

```
parte4-microservicios/
├── api-gateway/                 # API Gateway
│   ├── api_gateway.js          # Servidor del gateway
│   ├── package.json            # Dependencias del gateway
│   └── Dockerfile              # Container del gateway
├── servicio-tareas/            # Microservicio de tareas
│   ├── task_service.js         # Servidor del servicio
│   ├── package.json            # Dependencias del servicio
│   └── Dockerfile              # Container del servicio
├── docker-compose.yml          # Orquestación de servicios
├── start-microservices.sh      # Script para iniciar servicios
├── stop-microservices.sh       # Script para detener servicios
└── test-microservices.sh       # Script para probar servicios
```

## Cómo usar

### Iniciar los servicios
```bash
./start-microservices.sh
```

### Detener los servicios
```bash
./stop-microservices.sh
```

### Probar los servicios
```bash
./test-microservices.sh
```

## Endpoints Disponibles

### API Gateway (Puerto 5002)
- **GET** `/tasks` - Listar todas las tareas
- **POST** `/tasks` - Crear nueva tarea
- **GET** `/tasks/:id` - Obtener tarea específica
- **PUT** `/tasks/:id` - Actualizar tarea
- **DELETE** `/tasks/:id` - Eliminar tarea

### Servicio de Tareas (Puerto 5001)
- **GET** `/tasks` - Listar todas las tareas
- **POST** `/tasks` - Crear nueva tarea
- **GET** `/tasks/:id` - Obtener tarea específica
- **PUT** `/tasks/:id` - Actualizar tarea
- **DELETE** `/tasks/:id` - Eliminar tarea

## Ejemplos de uso

### Crear una tarea
```bash
curl -X POST http://localhost:5002/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi primera tarea","completed":false}'
```

### Listar tareas
```bash
curl http://localhost:5002/tasks
```

### Actualizar tarea
```bash
curl -X PUT http://localhost:5002/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Tarea actualizada","completed":true}'
```

### Eliminar tarea
```bash
curl -X DELETE http://localhost:5002/tasks/1
```

## Ventajas de los Microservicios

1. **Escalabilidad**: Cada servicio se puede escalar por separado
2. **Tecnología**: Cada servicio puede usar diferentes tecnologías
3. **Despliegue**: Actualizaciones sin afectar otros servicios
4. **Resiliencia**: El fallo de un servicio no afecta a otros
5. **Equipos**: Cada equipo puede trabajar independientemente

## Desventajas

1. **Complejidad**: Más servicios para manejar
2. **Latencia**: Comunicación entre servicios por red
3. **Consistencia**: Transacciones distribuidas complejas
4. **Testing**: Pruebas de integración más difíciles
5. **Debugging**: Errores en múltiples servicios

## ¿Cuándo usar Microservicios?

- Aplicaciones grandes
- Equipos grandes
- Necesidad de escalabilidad
- Diferentes tecnologías por servicio
- Despliegues independientes 