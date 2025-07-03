#!/bin/bash

# Matar cualquier proceso que esté usando los puertos
pkill -f node

# Iniciar Monolito (puerto 5000)
cd parte1-monolito
PORT=5000 node app.js &
echo "🚀 Monolito iniciado en puerto 5000"

# Iniciar 3 Capas (puerto 5001)
cd ../parte2-3-capas
PORT=5001 node app.js &
echo "🚀 3 Capas iniciado en puerto 5001"

# Iniciar REST (puerto 5002)
cd ../parte3-rest
PORT=5002 node api.js &
echo "🚀 REST iniciado en puerto 5002"

# Iniciar Microservicios
cd ../parte4-microservicios/servicio-tareas
PORT=5003 node task_service.js &
echo "🚀 Servicio de Tareas iniciado en puerto 5003"

cd ../api-gateway
PORT=5004 node api_gateway.js &
echo "🚀 API Gateway iniciado en puerto 5004"

# Esperar a que todos los servicios estén listos
sleep 2

# Mostrar los puertos en uso
echo "📊 Puertos en uso:"
lsof -i :5000-5004 | grep LISTEN 