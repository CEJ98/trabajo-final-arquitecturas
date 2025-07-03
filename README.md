# Trabajo Final - Evolución de Arquitecturas de Software

**Estudiante:** Jorge Costilla  
**Materia:** EAD.DESWEB  

## Descripción

Este proyecto muestra cómo una aplicación simple de TODO list puede implementarse usando diferentes arquitecturas de software. Empezando desde un monolito básico hasta llegar a microservicios con Docker.

## Las 4 Arquitecturas

### 1. Monolito (`parte1-monolito/`)
Todo en un solo archivo. Simple pero efectivo para empezar.
- Puerto: 3000

### 2. 3 Capas (`parte2-3-capas/`)
Separé la aplicación en capas: presentación, lógica y datos.
- Puerto: 3001

### 3. REST API (`parte3-rest/`)
Implementación completa de una API RESTful con todos los verbos HTTP.
- Puerto: 3002

### 4. Microservicios (`DesarrolloDeApp/parte4-microservicios/`)
API Gateway + servicio independiente. Con Docker para containerización.
- Puertos: 5000 (Gateway), 5001 (Servicio)

## 🚀 Cómo Ejecutar el Proyecto

### Prerequisitos
```bash
# Instalar Node.js (versión 16 o superior)
node --version
npm --version
```

### Instalación
```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd Proyectos

# Instalar dependencias en cada arquitectura
cd parte1-monolito && npm install && cd ..
cd parte2-3-capas && npm install && cd ..
cd parte3-rest && npm install && cd ..
cd DesarrolloDeApp/parte4-microservicios/api-gateway && npm install && cd ../../..
cd DesarrolloDeApp/parte4-microservicios/servicio-tareas && npm install && cd ../../..
```

### Ejecución Individual
```bash
# Monolito
cd parte1-monolito && node app.js

# 3 Capas  
cd parte2-3-capas && node app.js

# REST API
cd parte3-rest && node app.js

# Microservicios
cd DesarrolloDeApp/parte4-microservicios
chmod +x start-microservices.sh
./start-microservices.sh
```

## 🌐 URLs de Acceso

- **Monolito:** `http://localhost:3000/api/tasks`
- **3 Capas:** `http://localhost:3001/api/tasks`
- **REST API:** `http://localhost:3002/api/tasks`
- **API Gateway:** `http://localhost:5000/api/tasks`
- **Servicio Tareas:** `http://localhost:5001/tasks`

## 📊 Operaciones Disponibles

Todas las arquitecturas soportan:
- **GET** `/api/tasks` - Listar todas las tareas
- **POST** `/api/tasks` - Crear nueva tarea
- **PUT** `/api/tasks/:id` - Actualizar tarea
- **DELETE** `/api/tasks/:id` - Eliminar tarea

## 🎯 Cumplimiento de Consignas

- ✅ **Parte 1:** Arquitectura monolítica con análisis completo
- ✅ **Parte 2:** Arquitectura 3 capas distribuida
- ✅ **Parte 3:** Arquitectura REST con servicios
- ✅ **Parte 4:** Arquitectura microservicios + pipeline CI/CD
- ✅ **Documentación:** Análisis teórico completo
- ✅ **Patrones:** Identificación y descripción por arquitectura

