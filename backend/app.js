const express = require('express');
const swaggerUi = require('swagger-ui-express');
const spec = require('./config/swagger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));

// Rutas
app.use('/api/notas', require('./routes/notas.routes'));
app.use('/api/ia', require('./routes/ia.routes'));

// Manejador de errores (siempre al final)
app.use(errorHandler);

module.exports = app;