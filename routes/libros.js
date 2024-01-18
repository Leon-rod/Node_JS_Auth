const express = require('express');
const router = express.Router();

const Libro = require('../models/Libro');
const { requiredScopes } = require('express-oauth2-jwt-bearer');

// Obtener todos los libros
router.get('/', requiredScopes('read:libros'), async (req,res)=>{
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los libros"} );
    }
});

// Crear un nuevo libro
router.post('/', requiredScopes("write:libros"), async(req,res)=>{
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch(error) {
        res.status(500).json({ error: "Error al crear el nuevo libro"})
    }
});

// Actualizar un libro existente
router.put('/:id', requiredScopes("write:libros"), async(req,res)=>{
    try {
        const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(libro);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el libro"})
    }
});

// Eliminar un libro
router.delete('/:id', requiredScopes("write:libros"), async(req,res) =>{
    try {
        await Libro.findByIdAndDelete(req.params.id)
        res.json({ message: 'Libro eliminado correctamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el Libro'})
    }
});

module.exports = router;