# Patrones de Diseño Aplicados

## En el Monolito

- **Singleton**: Manejar cosas compartidas como la conexión a la DB
- **Factory Method**: Crear diferentes tipos de objetos tarea
- **Strategy**: Cambiar algoritmos de ordenamiento según necesites

## En 3 Capas

- **Repository**: La capa de datos esconde cómo accedes a la info
- **Service Layer**: La capa de lógica tiene todas las reglas de negocio
- **Data Transfer Object (DTO)**: Los objetos que pasan entre capas
- **Facade**: Simplifica la interfaz entre capas

## En REST

- **Controller**: Las funciones que manejan cada ruta HTTP
- **Resource**: Modelar las tareas como recursos con URLs
- **DTO**: Los JSONs que enviás y recibís
- **Error Handling Middleware**: Manejo centralizado de errores

## En Microservicios

- **API Gateway**: Un solo punto de entrada para todos los servicios
- **Service Discovery**: Para que los servicios se encuentren entre ellos
- **Circuit Breaker**: Evita que si se rompe uno se rompan todos
- **Database per Service**: Cada servicio maneja su propia DB
- **Saga**: Para transacciones que involucran varios servicios

## Reflexiones

- No te compliques con patrones si no los necesitas
- Depende mucho del contexto específico del proyecto
- Las arquitecturas pueden ir evolucionando según crece la aplicación