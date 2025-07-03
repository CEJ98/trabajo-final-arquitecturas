# Trabajo Final Integrador - Evolución de Arquitecturas

**Estudiante:** Jorge Costilla  
**Materia:** EAD.DESWEB  
**Tema:** Evolución de una Aplicación a través de Diferentes Arquitecturas

## 📋 Descripción del Proyecto

Este proyecto demuestra la evolución de una aplicación de gestión de tareas (TODO List) implementada en **4 arquitecturas diferentes**, cumpliendo con todas las consignas del trabajo final integrador.

## 🏗️ Arquitecturas Implementadas

### 1. **Monolito** (`parte1-monolito/`)
- ✅ Arquitectura simple y monolítica
- ✅ Funcionalidades básicas en un solo componente
- ✅ Análisis de pros, contras y patrones aplicables
- **Puerto:** 3000

### 2. **3 Capas Distribuida** (`parte2-3-capas/`)
- ✅ Separación en capas: Presentación, Lógica y Datos
- ✅ Comunicación distribuida entre componentes
- ✅ Análisis de ventajas y desventajas
- **Puerto:** 3001

### 3. **REST** (`parte3-rest/`)
- ✅ API RESTful con endpoints estándar
- ✅ Comunicación mediante servicios REST
- ✅ Implementación de todos los verbos HTTP
- **Puerto:** 3002

### 4. **Microservicios** (`DesarrolloDeApp/parte4-microservicios/`)
- ✅ API Gateway y Servicio de Tareas independientes
- ✅ Contenedores Docker para cada servicio
- ✅ Scripts de automatización
- **Puertos:** 5000 (Gateway), 5001 (Servicio)

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

