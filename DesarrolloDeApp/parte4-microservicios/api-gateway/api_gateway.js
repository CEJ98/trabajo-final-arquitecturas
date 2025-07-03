const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();

// Para permitir peticiones desde otros dominios
app.use(cors());

// Para leer JSON
app.use(express.json());

// Configuración de servicios
const services = {
    tasks: {
        url: process.env.TASKS_SERVICE_URL || 'http://localhost:5001',
        path: '/tasks'
    }
};

// Log de todas las peticiones que llegan al gateway
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.path}`);
    next();
});

// Proxy que redirige las peticiones al servicio de tareas
app.use('/tasks', createProxyMiddleware({
    target: services.tasks.url,
    changeOrigin: true,
    pathRewrite: {
        '^/tasks': '/tasks'
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log(`🔄 Redirigiendo a ${services.tasks.url}${req.path}`);
    },
    onError: (err, req, res) => {
        console.error('❌ Error en el proxy:', err);
        res.status(500).json({ 
            error: 'Error al comunicarse con el servicio de tareas',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
}));

// Endpoint para verificar que el gateway está funcionando
app.get('/health', (req, res) => {
    console.log('🏥 Verificando estado del gateway...');
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        services: Object.keys(services).map(service => ({
            name: service,
            url: services[service].url,
            status: 'ok'
        }))
    });
});

// Manejo de errores del gateway
app.use((err, req, res, next) => {
    console.error('❌ Error inesperado:', err);
    res.status(500).json({ 
        error: 'Error interno del gateway',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Si llega una ruta que no existe
app.use((req, res) => {
    console.log(`❌ Ruta no encontrada: ${req.method} ${req.path}`);
    res.status(404).json({ 
        error: 'Ruta no encontrada',
        path: req.path,
        method: req.method
    });
});

// Iniciamos el servidor  
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`🚀 API Gateway escuchando en http://localhost:${PORT}`);
    console.log('📊 Modo:', process.env.NODE_ENV || 'development');
    console.log('🔧 Configuración:', {
        port: PORT,
        environment: process.env.NODE_ENV || 'development',
        services: Object.entries(services).map(([name, config]) => ({
            name,
            url: config.url
        }))
    });
    console.log('📚 Endpoints disponibles:');
    console.log('  GET    /health');
    console.log('  GET    /tasks');
    console.log('  POST   /tasks');
    console.log('  GET    /tasks/:id');
    console.log('  PUT    /tasks/:id');
    console.log('  DELETE /tasks/:id');
}); 