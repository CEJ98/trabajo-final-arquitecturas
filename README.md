# Examen Práctico - Evolución de una Aplicación

**Estudiante:** Jorge Costilla  
**Materia:** EAD.DESWEB  

## Arquitecturas Implementadas

### 1. Monolito (`parte1-monolito/`)
Todo en un solo archivo - Puerto: 3000

### 2. 3 Capas (`parte2-3-capas/`)
Separado en capas: presentación, lógica, datos - Puerto: 3001

### 3. REST API (`parte3-rest/`)
API completa con endpoints REST - Puerto: 3002

### 4. Microservicios (`DesarrolloDeApp/parte4-microservicios/`)
API Gateway + servicio independiente - Puertos: 5000 y 5001

## 🚀 Cómo Ejecutar

```bash
# Instalar dependencias
cd parte1-monolito && npm install && cd ..
cd parte2-3-capas && npm install && cd ..
cd parte3-rest && npm install && cd ..
cd DesarrolloDeApp/parte4-microservicios/api-gateway && npm install && cd ../../..
cd DesarrolloDeApp/parte4-microservicios/servicio-tareas && npm install && cd ../../..

# Ejecutar cada arquitectura
cd parte1-monolito && npm start          # Puerto 3000
cd parte2-3-capas && npm start           # Puerto 3001
cd parte3-rest && npm start              # Puerto 3002
cd DesarrolloDeApp/parte4-microservicios && ./start-microservices.sh  # Puertos 5000, 5001
```

## 📋 Documentación Completa

Ver **`EXAMEN_PRACTICO.md`** para:
- Código completo de cada arquitectura
- Análisis de pros y contras
- Patrones de diseño aplicables
- Pipeline de CI/CD
- Respuestas completas a las 4 partes del examen

