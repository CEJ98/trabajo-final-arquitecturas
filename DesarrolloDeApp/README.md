# Trabajo Final Integrador - Evolución de una Aplicación

Este proyecto demuestra la evolución de una aplicación de gestión de tareas (Todo List) a través de diferentes arquitecturas de software.

## 🏗️ Arquitecturas Implementadas

### 1. Monolito (`parte1-monolito/`)
- Arquitectura simple y monolítica
- Todo el código en un solo archivo
- Ideal para aplicaciones pequeñas y prototipos

### 2. Arquitectura de 3 Capas (`parte2-3-capas/`)
- Separación en capas de datos, lógica y presentación
- Mejor organización del código
- Mayor mantenibilidad

### 3. API REST (`parte3-rest/`)
- Implementación de endpoints RESTful
- Manejo de recursos HTTP
- Comunicación mediante servicios REST

### 4. Microservicios (`parte4-microservicios/`)
- Servicios independientes
- API Gateway
- Comunicación entre servicios

## 🚀 Instalación

1. Instalar dependencias para cada arquitectura:
```bash
# Monolito
cd parte1-monolito && npm install

# 3 Capas
cd ../parte2-3-capas && npm install

# REST API
cd ../parte3-rest && npm install

# Microservicios
cd ../parte4-microservicios/api-gateway && npm install
cd ../servicio-tareas && npm install
```

## 📝 Uso

Cada arquitectura puede ser ejecutada de forma independiente:

```bash
# Monolito (Puerto 3000)
cd parte1-monolito && npm start

# 3 Capas (Puerto 3001)
cd parte2-3-capas && npm start

# REST API (Puerto 3002)
cd parte3-rest && npm start

# Microservicios (Puertos 5001 y 5002)
cd parte4-microservicios && ./start-microservices.sh development
```

## 🧪 Scripts de Verificación

Para verificar que todo funcione correctamente:

```bash
# Verificar todas las arquitecturas
./verificar-todo.sh

# Iniciar todas las arquitecturas juntas
./ver-todo-completo.sh

# Iniciar arquitecturas individuales
./visualizar-arquitecturas.sh
```

## 📚 Documentación

- `ANALISIS_ARQUITECTURAS.md`: Análisis teórico de cada arquitectura
- `PATRONES.md`: Patrones de diseño aplicables
- `CI-CD.md`: Información sobre integración continua y despliegue continuo

Cada carpeta de arquitectura contiene su propio README con detalles específicos de implementación. 