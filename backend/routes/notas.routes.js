const router = require('express').Router();
const { z } = require('zod');
const validar = require('../middlewares/validar');
const notas = require('../services/notas.service');
const deepseek = require('../services/deepseek.service');

const notaSchema = z.object({
  titulo: z.string().min(1).max(100),
  contenido: z.string().min(1).max(5000),
});

/**
 * @openapi
 * /api/notas:
 *   get:
 *     summary: Lista todas las notas
 *     tags: [Notas]
 *     responses:
 *       200:
 *         description: Lista de notas obtenida con éxito
 */
router.get('/', async (req, res, next) => {
  try {
    const lista = await notas.listar();
    res.json(lista);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /api/notas:
 *   post:
 *     summary: Crea una nueva nota
 *     tags: [Notas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, contenido]
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *     responses:
 *       201:
 *         description: Nota creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', validar(notaSchema), async (req, res, next) => {
  try {
    const nuevaNota = await notas.crear(req.body);
    res.status(201).json(nuevaNota);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /api/notas/{id}:
 *   get:
 *     summary: Obtiene una nota por su ID
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nota encontrada
 *       404:
 *         description: Nota no encontrada
 */
router.get('/:id', async (req, res, next) => {
  try {
    const nota = await notas.buscar(Number(req.params.id));
    res.json(nota);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /api/notas/{id}:
 *   delete:
 *     summary: Elimina una nota por su ID
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Nota eliminada con éxito
 *       404:
 *         description: Nota no encontrada
 */
router.delete('/:id', async (req, res, next) => {
  try {
    await notas.eliminar(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /api/notas/{id}/resumen:
 *   post:
 *     summary: Resume una nota usando IA (DeepSeek)
 *     tags: [Notas, IA]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resumen generado exitosamente
 *       404:
 *         description: Nota no encontrada
 */
router.post('/:id/resumen', async (req, res, next) => {
  try {
    const nota = await notas.buscar(Number(req.params.id));
    const r = await deepseek.preguntar(
      nota.contenido,
      'Resume el texto en 3 viñetas breves, en español.'
    );
    res.json({ notaId: nota.id, resumen: r.respuesta, uso: r.uso });
  } catch (error) {
    next(error);
  }
});

module.exports = router;