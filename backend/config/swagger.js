const swaggerJsdoc = require('swagger-jsdoc');

module.exports = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de notas e inteligencia artificial',
      description: 'API REST para administrar notas y consultar DeepSeek.',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: {
        Nota: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            titulo: { type: 'string', example: 'Mi nota' },
            contenido: { type: 'string', example: 'Contenido de la nota.' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        NuevaNota: {
          type: 'object',
          required: ['titulo', 'contenido'],
          properties: {
            titulo: { type: 'string', minLength: 1, maxLength: 100, example: 'Mi nota' },
            contenido: {
              type: 'string',
              minLength: 1,
              maxLength: 5000,
              example: 'Contenido de la nota.',
            },
          },
        },
        Pregunta: {
          type: 'object',
          required: ['pregunta'],
          properties: {
            pregunta: {
              type: 'string',
              minLength: 3,
              maxLength: 2000,
              example: '¿Qué es una API REST?',
            },
          },
        },
        RespuestaIA: {
          type: 'object',
          properties: {
            respuesta: { type: 'string', example: 'Una API REST permite...' },
            uso: {
              type: 'object',
              properties: {
                prompt_tokens: { type: 'integer', example: 18 },
                completion_tokens: { type: 'integer', example: 142 },
                total_tokens: { type: 'integer', example: 160 },
              },
              additionalProperties: true,
            },
          },
        },
        ResumenNota: {
          type: 'object',
          properties: {
            notaId: { type: 'integer', example: 1 },
            resumen: {
              type: 'string',
              example: '- Idea principal\n- Segundo punto\n- Conclusión',
            },
            uso: {
              type: 'object',
              properties: {
                prompt_tokens: { type: 'integer', example: 18 },
                completion_tokens: { type: 'integer', example: 45 },
                total_tokens: { type: 'integer', example: 63 },
              },
              additionalProperties: true,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Nota no encontrada' },
          },
        },
        ErrorValidacion: {
          type: 'object',
          properties: {
            errores: {
              type: 'array',
              items: { type: 'object', additionalProperties: true },
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Lee las anotaciones de las rutas
});