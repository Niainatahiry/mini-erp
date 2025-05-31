// routes/produitRoutes.js
const express = require('express');
const router = express.Router();
const ProduitDAO = require('../dao/produitsDAO');

// GET /api/produits - Liste des produits
router.get('/', (req, res) => {
  ProduitDAO.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
    res.json(rows);
  });
});

// GET /api/produits/:id - Détail d'un produit
router.get('/:id', (req, res) => {
  ProduitDAO.getById(req.params.id, (err, row) => {
    if (err || !row) return res.status(404).json({ error: 'Produit non trouvé' });
    res.json(row);
  });
});

// POST /api/produits - Création d’un produit
router.post('/', (req, res) => {
  ProduitDAO.create(req.body, (err, id) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la création du produit' });
    res.status(201).json({ message: 'Produit créé', id });
  });
});

// PUT /api/produits/:id - Mise à jour
router.put('/:id', (req, res) => {
  ProduitDAO.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la mise à jour' });
    res.json({ message: 'Produit mis à jour' });
  });
});

// DELETE /api/produits/:id - Suppression
router.delete('/:id', (req, res) => {
  ProduitDAO.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la suppression' });
    res.json({ message: 'Produit supprimé' });
  });
});

module.exports = router;
