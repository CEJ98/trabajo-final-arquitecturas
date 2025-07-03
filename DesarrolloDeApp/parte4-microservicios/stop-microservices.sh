#!/bin/bash

# Script para detener microservicios

echo "🛑 Deteniendo microservicios..."

# Verificar si hay contenedores Docker corriendo
if docker-compose ps -q > /dev/null 2>&1; then
    echo "📦 Deteniendo contenedores Docker..."
    docker-compose down
    echo "✅ Contenedores Docker detenidos"
fi

# Detener procesos de desarrollo si existen
if [ -f .gateway.pid ]; then
    GATEWAY_PID=$(cat .gateway.pid)
    if kill -0 $GATEWAY_PID > /dev/null 2>&1; then
        echo "🛑 Deteniendo API Gateway (PID: $GATEWAY_PID)..."
        kill $GATEWAY_PID
    fi
    rm .gateway.pid
fi

if [ -f .tasks.pid ]; then
    TASK_PID=$(cat .tasks.pid)
    if kill -0 $TASK_PID > /dev/null 2>&1; then
        echo "🛑 Deteniendo Servicio de Tareas (PID: $TASK_PID)..."
        kill $TASK_PID
    fi
    rm .tasks.pid
fi

# Matar cualquier proceso Node.js que esté corriendo en los puertos
echo "🧹 Limpiando procesos en puertos 5000 y 5001..."
pkill -f "node.*api_gateway.js" 2>/dev/null || true
pkill -f "node.*task_service.js" 2>/dev/null || true

echo "✅ Todos los microservicios han sido detenidos" 