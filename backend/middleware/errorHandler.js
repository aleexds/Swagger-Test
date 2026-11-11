const { AppError } = require('../utils/errors');
const { OpenAI } = require('openai');

module.exports = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message });
  }

  // Manejo de errores específicos de la API de DeepSeek/OpenAI
  if (err instanceof OpenAI.APIError) {
    console.error('DeepSeek API Error:', err.status, err.message);
    const status = err.status === 429 ? 429 : 502;
    return res.status(status).json({ error: 'IA_NO_DISPONIBLE' });
  }

  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
};