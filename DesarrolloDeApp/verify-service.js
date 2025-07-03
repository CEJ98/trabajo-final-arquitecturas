const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

// Configuración de servicios
const services = [
    {
        name: 'Monolito',
        port: 5001,
        dir: 'parte1-monolito',
        file: 'app.js'
    },
    {
        name: '3 Capas',
        port: 5002,
        dir: 'parte2-3-capas',
        file: 'app.js'
    },
    {
        name: 'REST',
        port: 5003,
        dir: 'parte3-rest',
        file: 'api.js'
    },
    {
        name: 'Servicio de Tareas',
        port: 5004,
        dir: 'parte4-microservicios/servicio-tareas',
        file: 'task_service.js'
    },
    {
        name: 'API Gateway',
        port: 5005,
        dir: 'parte4-microservicios/api-gateway',
        file: 'api_gateway.js'
    }
];

// Función para verificar si un puerto está en uso
function isPortInUse(port) {
    return new Promise((resolve) => {
        const server = http.createServer();
        server.once('error', () => resolve(true));
        server.once('listening', () => {
            server.close();
            resolve(false);
        });
        server.listen(port);
    });
}

// Función para iniciar un servicio
async function startService(service) {
    console.log(`🚀 Iniciando ${service.name}...`);
    
    // Verificar si el puerto está en uso
    const portInUse = await isPortInUse(service.port);
    if (portInUse) {
        console.error(`❌ El puerto ${service.port} ya está en uso`);
        return false;
    }

    // Construir la ruta completa
    const serviceDir = path.join(__dirname, service.dir);
    const serviceFile = path.join(serviceDir, service.file);

    try {
        // Iniciar el servicio usando spawn
        const childProcess = spawn('node', [serviceFile], {
            cwd: serviceDir,
            env: { ...process.env, PORT: service.port.toString() },
            stdio: 'pipe'
        });
        
        childProcess.stdout.on('data', (data) => {
            console.log(`[${service.name}] ${data.toString().trim()}`);
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`[${service.name}] Error: ${data.toString().trim()}`);
        });

        childProcess.on('error', (error) => {
            console.error(`[${service.name}] Error al iniciar: ${error.message}`);
        });

        childProcess.on('exit', (code) => {
            console.log(`[${service.name}] Proceso terminado con código ${code}`);
        });

        return true;
    } catch (error) {
        console.error(`[${service.name}] Error al iniciar: ${error.message}`);
        return false;
    }
}

// Función principal
async function main() {
    console.log('🔍 Verificando servicios...');
    
    for (const service of services) {
        const started = await startService(service);
        if (started) {
            console.log(`✅ ${service.name} iniciado en puerto ${service.port}`);
        } else {
            console.error(`❌ No se pudo iniciar ${service.name}`);
        }
    }

    // Mantener el proceso principal vivo
    process.stdin.resume();
    console.log('\nPresiona Ctrl+C para detener todos los servicios...');
}

// Manejar la terminación del proceso
process.on('SIGINT', () => {
    console.log('\n🛑 Deteniendo todos los servicios...');
    process.exit(0);
});

// Ejecutar el script
main().catch(console.error); 