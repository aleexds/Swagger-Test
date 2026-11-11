const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

async function preguntar(texto, system) {
  const response = await client.chat.completions.create({
    model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
    messages: [
      { role: 'system', content: system ?? 'Eres un asistente útil. Responde en español.' },
      { role: 'user', content: texto }
    ],
    max_tokens: 1024,
  });

  return {
    respuesta: response.choices[0].message.content,
    uso: response.usage,
  };
}

module.exports = { preguntar };