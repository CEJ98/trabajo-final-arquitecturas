# Examen Práctico: Evolución de una Aplicación

**Estudiante:** Jorge Costilla  
**Materia:** EAD.DESWEB  

---

## Parte 1: Arquitectura Monolítica

### Código Implementado
**Archivo:** `parte1-monolito/app.js`

```javascript
// App monolítica para manejar tareas
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Almacenamiento en memoria
let tareas = [];
let contadorId = 1;

// Rutas de la API
app.get('/api/tasks', (req, res) => {
    res.json(tareas);
});

app.post('/api/tasks', (req, res) => {
    const nuevaTarea = {
        id: contadorId++,
        title: req.body.title,
        completed: false
    };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);
    
    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    tarea.title = req.body.title || tarea.title;
    tarea.completed = req.body.completed !== undefined ? req.body.completed : tarea.completed;
    
    res.json(tarea);
});

app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = tareas.findIndex(t => t.id === id);
    
    if (indice === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    tareas.splice(indice, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Aplicación monolítica corriendo en puerto ${PORT}`);
});
```

### Funcionalidades y Objetivos
- **CRUD completo** de tareas (Create, Read, Update, Delete)
- **API REST básica** con endpoints estándar
- **Almacenamiento en memoria** para simplicidad
- **Validación básica** de datos
- **Respuestas JSON** consistentes

### Pros y Contras

#### Pros:
- **Simplicidad**: Todo en un solo archivo, fácil de entender
- **Desarrollo rápido**: No hay complejidad de comunicación entre servicios
- **Debugging sencillo**: Un solo proceso para depurar
- **Deployment simple**: Una sola aplicación para desplegar
- **Transacciones fáciles**: No hay problemas de consistencia distribuida

#### Contras:
- **Escalabilidad limitada**: No puedes escalar partes específicas
- **Acoplamiento fuerte**: Cambios en una parte afectan todo
- **Tecnología única**: Estás atado a una sola tecnología
- **Despliegue de todo**: Cualquier cambio requiere redesplegar toda la app

### Situaciones Adecuadas
- **Aplicaciones pequeñas** (menos de 100K usuarios)
- **Equipos pequeños** (1-5 desarrolladores)
- **Prototipos o MVPs** que necesitas sacar rápido
- **Aplicaciones con lógica simple**
- **Startups** que recién comienzan

### Patrones de Diseño Aplicables
- **Singleton**: Para instancias únicas (conexión DB, configuración)
- **Factory**: Para crear objetos de diferentes tipos
- **Strategy**: Para diferentes algoritmos de negocio
- **Observer**: Para notificaciones internas
- **Repository**: Para abstraer el acceso a datos

---

## Parte 2: Arquitectura de 3 Capas Distribuida

### Código Implementado

#### Capa de Presentación (`parte2-3-capas/app.js`)
```javascript
const express = require('express');
const LogicLayer = require('./capa-logica/logic_layer');
const app = express();
const PORT = 3001;

app.use(express.json());

const logicLayer = new LogicLayer();

// Rutas que delegan a la capa de lógica
app.get('/api/tasks', async (req, res) => {
    try {
        const tareas = await logicLayer.obtenerTareas();
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/tasks', async (req, res) => {
    try {
        const nuevaTarea = await logicLayer.crearTarea(req.body);
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ... más rutas
```

#### Capa de Lógica (`parte2-3-capas/capa-logica/logic_layer.js`)
```javascript
const DataLayer = require('../capa-datos/data_layer');

class LogicLayer {
    constructor() {
        this.dataLayer = new DataLayer();
    }

    async obtenerTareas() {
        return await this.dataLayer.obtenerTodas();
    }

    async crearTarea(datosTarea) {
        // Validación de negocio
        if (!datosTarea.title || datosTarea.title.trim() === '') {
            throw new Error('El título es requerido');
        }

        const tarea = {
            title: datosTarea.title.trim(),
            completed: false
        };

        return await this.dataLayer.crear(tarea);
    }

    // ... más métodos de lógica
}

module.exports = LogicLayer;
```

#### Capa de Datos (`parte2-3-capas/capa-datos/data_layer.js`)
```javascript
class DataLayer {
    constructor() {
        this.tareas = [];
        this.contadorId = 1;
    }

    async obtenerTodas() {
        return [...this.tareas];
    }

    async crear(tarea) {
        const nuevaTarea = {
            id: this.contadorId++,
            ...tarea
        };
        this.tareas.push(nuevaTarea);
        return nuevaTarea;
    }

    // ... más métodos CRUD
}

module.exports = DataLayer;
```

### Pros y Contras

#### Pros:
- **Separación clara** de responsabilidades
- **Mantenibilidad** mejorada
- **Testeo independiente** de cada capa
- **Escalabilidad** por capas
- **Flexibilidad** para cambiar implementaciones

#### Contras:
- **Complejidad adicional** sin beneficios distribuidos reales
- **Overhead** de comunicación entre capas
- **Más código** para mantener
- **Posible sobre-ingeniería** para apps simples

### Situaciones Preferibles
- **Aplicaciones medianas** con lógica compleja
- **Equipos especializados** en diferentes capas
- **Cuando necesitas** separar UI, lógica y datos
- **Sistemas que evolucionarán** a distribuidos

### Patrones de Diseño Útiles
- **Layered Architecture**: Organización en capas
- **Data Access Object (DAO)**: Para la capa de datos
- **Service Layer**: Para la lógica de negocio
- **Model-View-Controller (MVC)**: Para la presentación
- **Dependency Injection**: Para desacoplar capas

---

## Parte 3: Arquitectura REST

### Código Implementado (`parte3-rest/app.js`)
```javascript
const express = require('express');
const app = express();
const PORT = 3002;

app.use(express.json());

// Almacenamiento en memoria
let tareas = [];
let contadorId = 1;

// Middleware para logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Recursos REST completos
app.get('/api/tasks', (req, res) => {
    res.json({
        success: true,
        data: tareas,
        count: tareas.length
    });
});

app.get('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);
    
    if (!tarea) {
        return res.status(404).json({
            success: false,
            error: 'Tarea no encontrada'
        });
    }
    
    res.json({
        success: true,
        data: tarea
    });
});

app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    
    if (!title || title.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'El título es requerido'
        });
    }
    
    const nuevaTarea = {
        id: contadorId++,
        title: title.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tareas.push(nuevaTarea);
    
    res.status(201).json({
        success: true,
        data: nuevaTarea
    });
});

// ... más endpoints REST
```

### Pros y Contras

#### Pros:
- **Estándar universal** bien conocido
- **Stateless**: Cada request es independiente
- **Cacheable**: Respuestas pueden ser cacheadas
- **Interfaz uniforme**: Verbos HTTP estándar
- **Interoperabilidad** entre diferentes sistemas

#### Contras:
- **Múltiples requests** para operaciones complejas
- **Overhead HTTP** en cada llamada
- **Limitado para tiempo real**: No es ideal para actualizaciones instantáneas
- **Versionado complejo** de APIs

### Cuándo es Apropiado
- **APIs públicas** que otros van a consumir
- **Integración** entre sistemas diferentes
- **Aplicaciones web** tradicionales
- **Cuando necesitas** un estándar bien establecido

### Patrones de Diseño Específicos
- **Resource-Based URLs**: URLs que representan recursos
- **HTTP Status Codes**: Uso correcto de códigos de estado
- **Content Negotiation**: Manejo de diferentes formatos
- **Rate Limiting**: Control de acceso a la API
- **Pagination**: Para grandes conjuntos de datos

---

## Parte 4: Arquitectura de Microservicios

### Código Implementado

#### API Gateway (`DesarrolloDeApp/parte4-microservicios/api-gateway/api_gateway.js`)
```javascript
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = 5000;

app.use(express.json());

// Para ver qué peticiones llegan al gateway
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.path}`);
    next();
});

// Proxy hacia el servicio de tareas
app.use('/tasks', createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true,
    pathRewrite: {
        '^/tasks': '/tasks'
    }
}));

// Health check del gateway
app.get('/health', (req, res) => {
    res.json({
        service: 'API Gateway',
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`🚀 API Gateway corriendo en puerto ${PORT}`);
});
```

#### Servicio de Tareas (`DesarrolloDeApp/parte4-microservicios/servicio-tareas/task_service.js`)
```javascript
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Almacenamiento en memoria
let tasks = [];
let taskIdGenerator = 1;

// Validar que los datos estén bien
function validateTaskFormat(task) {
    if (!task.title || typeof task.title !== 'string' || task.title.trim() === '') {
        throw new Error('El título es requerido y no puede estar vacío');
    }
    if (task.completed !== undefined && typeof task.completed !== 'boolean') {
        throw new Error('El estado completado debe ser true o false');
    }
}

// Rutas del servicio de tareas
app.get('/tasks', (req, res) => {
    try {
        res.json({
            success: true,
            data: tasks,
            count: tasks.length,
            service: 'task-service'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            service: 'task-service'
        });
    }
});

app.post('/tasks', (req, res) => {
    try {
        validateTaskFormat(req.body);
        
        const newTask = {
            id: taskIdGenerator++,
            title: req.body.title.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        tasks.push(newTask);
        
        res.status(201).json({
            success: true,
            data: newTask,
            service: 'task-service'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
            service: 'task-service'
        });
    }
});

// ... más endpoints
```

### Análisis Detallado: Pros y Contras

#### Pros:
- **Escalabilidad independiente**: Cada servicio escala por separado
- **Tecnologías diversas**: Cada servicio puede usar tecnologías diferentes
- **Equipos independientes**: Diferentes equipos pueden trabajar en paralelo
- **Tolerancia a fallos**: El fallo de un servicio no afecta a todos
- **Despliegue independiente**: Actualizaciones sin afectar otros servicios

#### Contras:
- **Complejidad operacional**: Muchos servicios que monitorear
- **Latencia de red**: Comunicación entre servicios añade latencia
- **Consistencia eventual**: Transacciones distribuidas son complejas
- **Overhead de comunicación**: Más llamadas de red
- **Debugging difícil**: Trazear problemas entre servicios

### Situaciones Ideales para Implementación
- **Aplicaciones grandes** con múltiples dominios de negocio
- **Equipos grandes** (más de 20 desarrolladores)
- **Alta escalabilidad** requerida
- **Diferentes tecnologías** por servicio
- **Despliegues frecuentes** e independientes

### Patrones de Diseño Específicos
- **API Gateway**: Punto de entrada único
- **Service Registry**: Descubrimiento de servicios
- **Circuit Breaker**: Prevención de cascadas de fallos
- **Saga**: Transacciones distribuidas
- **Event Sourcing**: Manejo de eventos entre servicios
- **CQRS**: Separación de comandos y consultas

---

## Pipeline de Integración Continua

### Herramientas Necesarias

#### 1. **GitHub Actions** (Seleccionada para este proyecto)
```yaml
name: CI/CD Microservicios
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd DesarrolloDeApp/parte4-microservicios/api-gateway
          npm install
          cd ../servicio-tareas
          npm install
      - name: Run tests
        run: |
          cd DesarrolloDeApp/parte4-microservicios
          npm test
```

#### 2. **Docker** para Containerización
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5001
CMD ["npm", "start"]
```

#### 3. **Alternativas de Herramientas**
- **Jenkins**: Para máxima flexibilidad
- **GitLab CI/CD**: Plataforma integrada
- **Azure DevOps**: Para entornos Microsoft
- **CircleCI**: Para proyectos complejos

### Pasos del Pipeline
1. **Checkout**: Descargar código
2. **Install**: Instalar dependencias
3. **Test**: Ejecutar pruebas unitarias
4. **Build**: Construir imágenes Docker
5. **Deploy**: Desplegar a staging/producción
6. **Monitor**: Verificar que todo funcione

---

## Conclusiones

Este proyecto demuestra la evolución práctica desde una arquitectura monolítica hasta microservicios, mostrando cómo cada arquitectura tiene sus propias ventajas y casos de uso específicos. La elección de arquitectura debe basarse en el tamaño del equipo, complejidad de la aplicación y requisitos de escalabilidad. 