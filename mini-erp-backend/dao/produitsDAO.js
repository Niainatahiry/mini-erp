// dao/produitDAO.js
const db = require('../db/database');


const ProduitDAO = {
  // Récupérer tous les produits
  getAll(callback) {
    db.all('SELECT * FROM produits', callback);
  },

  // Récupérer un seul produit par ID
  getById(id, callback) {
    db.get('SELECT * FROM produits WHERE id = ?', [id], callback);
  },

  // Créer un nouveau produit
  create(produit, callback) {
    const { nom, description, prix, quantite, categorie } = produit;
    const query = `
      INSERT INTO produits (nom, description, prix, quantite, categorie)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(query, [nom, description, prix, quantite, categorie], function (err) {
      callback(err, this?.lastID);
    });
  },

  // Mettre à jour un produit
  update(id, produit, callback) {
    const { nom, description, prix, quantite, categorie } = produit;
    const query = `
      UPDATE produits SET nom = ?, description = ?, prix = ?, quantite = ?, categorie = ?
      WHERE id = ?
    `;
    db.run(query, [nom, description, prix, quantite, categorie, id], callback);
  },

  // Supprimer un produit
  delete(id, callback) {
    db.run('DELETE FROM produits WHERE id = ?', [id], callback);
  }
};

module.exports = ProduitDAO;
