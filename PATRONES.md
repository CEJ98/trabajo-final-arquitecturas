# Patrones de Diseño por Arquitectura

## Arquitectura Monolítica

- **Singleton**: Para gestionar recursos compartidos como conexiones a la base de datos
- **Factory Method**: Para crear objetos tarea de diferentes tipos
- **Strategy**: Para diferentes algoritmos de ordenamiento de tareas

## Arquitectura de 3 Capas

- **Repository**: La capa de datos abstrae el acceso a los datos
- **Service Layer**: La capa de lógica contiene las reglas de negocio
- **Data Transfer Object (DTO)**: Objetos que se pasan entre capas
- **Facade**: La capa de lógica simplifica la interfaz para la capa de presentación

## Arquitectura REST

- **Controller**: Funciones que manejan las rutas HTTP
- **Resource**: Las tareas se modelan como recursos con URLs
- **Data Transfer Object (DTO)**: Los JSON enviados y recibidos
- **Error Handling Middleware**: Manejo centralizado de errores

## Arquitectura de Microservicios

- **API Gateway**: Entrada única a los microservicios
- **Service Discovery**: Para que los servicios se encuentren entre sí
- **Circuit Breaker**: Protege de fallos en cascada
- **Database per Service**: Cada servicio tiene su propia base de datos
- **Saga**: Para transacciones que abarcan múltiples servicios

## Consideraciones

1. **Simplicidad**: No sobre-ingenieriar, aplicar patrones solo cuando resuelven problemas reales
2. **Contexto**: La idoneidad depende del problema específico y la arquitectura
3. **Evolución**: Las arquitecturas pueden evolucionar según crecen los requisitos