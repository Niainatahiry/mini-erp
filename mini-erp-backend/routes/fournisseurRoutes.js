const express = require('express');
const router = express.Router();
const fournisseurDAO = require('../dao/fournisseurDAO');

// GET /api/fournisseurs - récupérer tous les fournisseurs
router.get('/', (req, res) => {
  fournisseurDAO.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET /api/fournisseurs/:id - récupérer un fournisseur par id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  fournisseurDAO.getById(id, (err, fournisseur) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (!fournisseur) return res.status(404).json({ error: "Fournisseur non trouvé" });
    res.json(fournisseur);
  });
});

// POST /api/fournisseurs - créer un nouveau fournisseur
router.post('/', (req, res) => {
  const fournisseur = req.body;
  if (!fournisseur.nom) {
    return res.status(400).json({ error: 'Le champ "nom" est obligatoire.' });
  }
  if (!fournisseur.dateCreation) {
    fournisseur.dateCreation = new Date().toISOString().split('T')[0];
  }
  fournisseurDAO.create(fournisseur, (err, createdFournisseur) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(createdFournisseur);
  });
});

// PUT /api/fournisseurs/:id - mettre à jour un fournisseur
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const fournisseur = req.body;
  fournisseurDAO.update(id, fournisseur, (err, updatedFournisseur) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(updatedFournisseur);
  });
});

// DELETE /api/fournisseurs/:id - supprimer un fournisseur
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  fournisseurDAO.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Fournisseur supprimé' });
  });
});

module.exports = router;
