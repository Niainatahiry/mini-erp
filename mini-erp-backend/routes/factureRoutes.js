// routes/factureRoutes.js
const express = require('express');
const router = express.Router();
const FactureDAO = require('../dao/factureDAO');

// GET toutes les factures
router.get('/', (req, res) => {
  FactureDAO.getAll((err, factures) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(factures);
  });
});

// GET une facture avec ses lignes
router.get('/:id', (req, res) => {
  const id = req.params.id;

  FactureDAO.getById(id, (err, facture) => {
    if (err || !facture) return res.status(404).json({ error: 'Facture non trouvée' });

    FactureDAO.getLignesByFactureId(id, (err, lignes) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ ...facture, lignes });
    });
  });
});

// POST création d’une facture + lignes
router.post('/', (req, res) => {
  const { clientId, date, total, statut, lignes } = req.body;

  if (!clientId || !date || !lignes || lignes.length === 0) {
    return res.status(400).json({ error: 'Données manquantes' });
  }

  const facture = { clientId, date, total, statut };

  FactureDAO.create(facture, lignes, (err, factureId) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: factureId });
  });
});

// PUT modification d’une facture
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const facture = req.body;

  FactureDAO.update(id, facture, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Facture mise à jour' });
  });
});

// DELETE une facture et ses lignes
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  FactureDAO.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Facture supprimée' });
  });
});

module.exports = router;
