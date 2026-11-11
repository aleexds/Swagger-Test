const swaggerJsdoc = require('swagger-jsdoc');

module.exports = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'Lab: Notas + DeepSeek IA', version: '1.0.0' },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: {
        Pregunta: {
          type: 'object',
          required: ['pregunta'],
          properties: { pregunta: { type: 'string' } },
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Lee las anotaciones de las rutas
});