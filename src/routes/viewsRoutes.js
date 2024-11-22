const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home/index');
});
router.get('/inventario', (req, res) => {
    res.render('inventario/lista');
});
//-----------------------
router.get('/articulos', (req, res) => {
    res.render('articulos/lista');
});
router.get('/articulos/nuevo', (req, res) => {
    res.render('articulos/nuevo-editar', { id: null });
});
router.get('/articulos/editar/:id', (req, res) => {
    res.render('articulos/nuevo-editar', { id: req.params.id });
});
//---------------------------
router.get('/entradas', (req, res) => {
    res.render('entradas/lista');
});
router.get('/entradas/nuevo', (req, res) => {
    res.render('entradas/nuevo-editar', { id: null });
});
router.get('/entradas/editar/:id', (req, res) => {
    res.render('entradas/nuevo-editar', { id: req.params.id });
});
//---------------------------
router.get('/salidas', (req, res) => {
    res.render('salidas/lista');
});
router.get('/salidas/nuevo', (req, res) => {
    res.render('salidas/nuevo-editar', { id: null });
});
router.get('/salidas/editar/:id', (req, res) => {
    res.render('salidas/nuevo-editar', { id: req.params.id });
});
//----------------------------
router.get('/tipos-documento', (req, res) => {
    res.render('tipos-documento/lista');
});
router.get('/tipos-documento/nuevo', (req, res) => {
    res.render('tipos-documento/nuevo-editar', { id: null });
});
router.get('/tipos-documento/editar/:id', (req, res) => {
    res.render('tipos-documento/nuevo-editar', { id: req.params.id });
});
//-----------------------------
router.get('/unidades-medida', (req, res) => {
    res.render('unidades-medida/lista');
});
router.get('/unidades-medida/nuevo', (req, res) => {
    res.render('unidades-medida/nuevo-editar', { id: null });
});
router.get('/unidades-medida/editar/:id', (req, res) => {
    res.render('unidades-medida/nuevo-editar', { id: req.params.id });
});
module.exports = router;
