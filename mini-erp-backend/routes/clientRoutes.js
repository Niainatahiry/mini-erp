  const express = require('express');
  const router = express.Router();
  const clientDAO = require('../dao/clientDAO');

  // GET /api/clients - récupérer tous les clients
  router.get('/', (req, res) => {
    clientDAO.getAll((err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  router.get("/:id", (req, res) => {
    const id = req.params.id;
    clientDAO.getById(id, (err, client) => {
      if (err) return res.status(500).json({ error: "Erreur serveur" });
      if (!client) return res.status(404).json({ error: "Client non trouvé" });
      res.json(client);
    });
  });

  // POST /api/clients - créer un nouveau client
  router.post('/', (req, res) => {
    const client = req.body;

    // Validation simple (tu peux améliorer avec Joi ou Zod)
    if (!client.nom) {
      return res.status(400).json({ error: 'Le champ "nom" est obligatoire.' });
    }

    // Si pas de date fournie, mettre aujourd'hui
    if (!client.dateCreation) {
      client.dateCreation = new Date().toISOString().split('T')[0];
    }

    clientDAO.create(client, (err, createdClient) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(createdClient);
    });
  });
  // PUT /api/clients/:id - mettre à jour un client
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const client = req.body;

    clientDAO.update(id, client, (err, updatedClient) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(updatedClient);
    });
  });

  // DELETE /api/clients/:id - supprimer un client
  router.delete('/:id', (req, res) => {
    const id = req.params.id;

    clientDAO.delete(id, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(204).end();
    });
  });

  module.exports = router;
