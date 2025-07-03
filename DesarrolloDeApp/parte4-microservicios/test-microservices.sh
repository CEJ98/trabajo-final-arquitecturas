#!/bin/bash

# Script para probar que los microservicios funcionan
# Asegúrate de que los servicios estén corriendo antes de ejecutar este script

echo "🧪 Probando microservicios..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para probar endpoint
test_endpoint() {
    local method=$1
    local url=$2
    local expected_status=$3
    local data=$4
    local description=$5
    
    echo -n "Testing $description... "
    
    if [ -n "$data" ]; then
        response=$(curl -s -w "%{http_code}" -X $method -H "Content-Type: application/json" -d "$data" "$url")
    else
        response=$(curl -s -w "%{http_code}" -X $method "$url")
    fi
    
    status_code="${response: -3}"
    body="${response%???}"
    
    if [ "$status_code" -eq "$expected_status" ]; then
        echo -e "${GREEN}✅ PASS${NC} (Status: $status_code)"
        if [ -n "$body" ] && [ "$body" != "null" ]; then
            echo "   Response: $body"
        fi
    else
        echo -e "${RED}❌ FAIL${NC} (Expected: $expected_status, Got: $status_code)"
        if [ -n "$body" ]; then
            echo "   Response: $body"
        fi
    fi
}

# URLs de los servicios
GATEWAY_URL="http://localhost:5000"
TASKS_SERVICE_URL="http://localhost:5001"

echo -e "${YELLOW}=== Probando API Gateway ===${NC}"

# Test 1: Health check del gateway
test_endpoint "GET" "$GATEWAY_URL/health" 200 "" "Gateway health check"

# Test 2: Obtener tareas a través del gateway (debería estar vacío inicialmente)
test_endpoint "GET" "$GATEWAY_URL/tasks" 200 "" "Get tasks via gateway"

# Test 3: Crear una tarea a través del gateway
test_endpoint "POST" "$GATEWAY_URL/tasks" 201 '{"title":"Tarea de prueba","completed":false}' "Create task via gateway"

# Test 4: Obtener tareas nuevamente (debería tener 1 tarea)
test_endpoint "GET" "$GATEWAY_URL/tasks" 200 "" "Get tasks after creation"

echo -e "${YELLOW}=== Probando Servicio de Tareas Directo ===${NC}"

# Test 5: Acceso directo al servicio de tareas
test_endpoint "GET" "$TASKS_SERVICE_URL/tasks" 200 "" "Direct access to tasks service"

# Test 6: Crear otra tarea directo en el servicio
test_endpoint "POST" "$TASKS_SERVICE_URL/tasks" 201 '{"title":"Tarea directa","completed":false}' "Create task directly"

echo -e "${YELLOW}=== Probando Endpoints Específicos ===${NC}"

# Test 7: Obtener tarea específica (ID 1)
test_endpoint "GET" "$GATEWAY_URL/tasks/1" 200 "" "Get specific task via gateway"

# Test 8: Actualizar tarea
test_endpoint "PUT" "$GATEWAY_URL/tasks/1" 200 '{"title":"Tarea actualizada","completed":true}' "Update task via gateway"

# Test 9: Eliminar tarea
test_endpoint "DELETE" "$GATEWAY_URL/tasks/2" 204 "" "Delete task via gateway"

echo ""
echo -e "${GREEN}🎉 Pruebas completadas${NC}"
echo ""
echo "Para más pruebas manuales, puedes usar:"
echo "  curl $GATEWAY_URL/health"
echo "  curl $GATEWAY_URL/tasks"
echo "  curl -X POST $GATEWAY_URL/tasks -H 'Content-Type: application/json' -d '{\"title\":\"Mi tarea\"}'" 