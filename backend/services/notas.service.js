const { Nota } = require('../models');
const { AppError } = require('../utils/errors');

async function listar() {
    return await Nota.findAll();
}

async function buscar(id) {
    const nota = await Nota.findByPk(id);
    if (!nota) throw new AppError(404, 'Nota no encontrada');
    return nota;
}

async function crear({ titulo, contenido }) {
    return await Nota.create({ titulo, contenido });
}

async function eliminar(id) {
    const nota = await buscar(id); // Lanza 404 si no existe
    await nota.destroy();
    return true;
}

module.exports = { listar, buscar, crear, eliminar };