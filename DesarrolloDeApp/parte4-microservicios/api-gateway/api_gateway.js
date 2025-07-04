// API Gateway - redirije las peticiones a los microservicios
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// acá van las URLs de los servicios
const services = {
    tasks: {
        url: 'http://localhost:5001'
    }
};

// ver qué llega
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// mandar todo /tasks al servicio de tareas
app.use('/tasks', createProxyMiddleware({
    target: services.tasks.url,
    changeOrigin: true,
    pathRewrite: {
        '^/tasks': '/tasks'
    },
    onError: (err, req, res) => {
        console.error('Error:', err);
        res.status(500).json({ error: 'No se pudo conectar al servicio' });
    }
}));

// para ver si funciona
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// rutas que no existen
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no existe' });
});

// arrancar
const PORT = 5002;
app.listen(PORT, () => {
    console.log(`Gateway en puerto ${PORT}`);
}); 