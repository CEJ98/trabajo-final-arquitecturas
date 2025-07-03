#!/bin/bash

# Script para levantar los microservicios
# Uso: ./start-microservices.sh [development|production]

MODE=${1:-development}

echo "🚀 Iniciando microservicios en modo: $MODE"

if [ "$MODE" = "production" ]; then
    echo "📦 Usando Docker Compose..."
    
    # Verificar si Docker está corriendo
    if ! docker info > /dev/null 2>&1; then
        echo "❌ Error: Docker no está corriendo"
        exit 1
    fi
    
    # Construir y levantar los servicios
    docker-compose up --build -d
    
    echo "✅ Microservicios iniciados en contenedores"
    echo "🔍 API Gateway: http://localhost:5000"
    echo "📋 Servicio de Tareas: http://localhost:5001"
    echo ""
    echo "Para ver los logs: docker-compose logs -f"
    echo "Para detener: docker-compose down"
    
elif [ "$MODE" = "development" ]; then
    echo "🛠️  Modo desarrollo (Node.js directo)..."
    
    # Instalar dependencias si no existen
    echo "📦 Instalando dependencias..."
    cd servicio-tareas && npm install && cd ..
    cd api-gateway && npm install && cd ..
    
    # Iniciar servicios en segundo plano
    echo "🚀 Iniciando Servicio de Tareas..."
    cd servicio-tareas
    npm start &
    TASK_SERVICE_PID=$!
    cd ..
    
    # Esperar un momento para que el servicio se inicie
    sleep 3
    
    echo "🚀 Iniciando API Gateway..."
    cd api-gateway
    npm start &
    GATEWAY_PID=$!
    cd ..
    
    echo "✅ Microservicios iniciados"
    echo "🔍 API Gateway: http://localhost:5000"
    echo "📋 Servicio de Tareas: http://localhost:5001"
    echo ""
    echo "PIDs: Gateway=$GATEWAY_PID, Tasks=$TASK_SERVICE_PID"
    echo "Para detener: kill $GATEWAY_PID $TASK_SERVICE_PID"
    
    # Guardar PIDs en archivo para poder detenerlos después
    echo "$GATEWAY_PID" > .gateway.pid
    echo "$TASK_SERVICE_PID" > .tasks.pid
    
else
    echo "❌ Modo no válido. Usa: development o production"
    exit 1
fi 