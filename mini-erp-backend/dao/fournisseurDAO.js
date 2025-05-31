const db = require('../db/database');

const FournisseurDAO = {
  getAll: (callback) => {
    db.all('SELECT * FROM fournisseurs', [], (err, rows) => callback(err, rows));
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM fournisseurs WHERE id = ?', [id], (err, row) => callback(err, row));
  },
  

  create: (fournisseur, callback) => {
    const {
      nom, email, telephone, adresse, ville, codePostal,
      pays, entreprise, dateCreation, type, statut, note
    } = fournisseur;

    db.run(`
      INSERT INTO fournisseurs (
        nom, email, telephone, adresse, ville, codePostal,
        pays, entreprise, dateCreation, type, statut, note
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [nom, email, telephone, adresse, ville, codePostal,
        pays, entreprise, dateCreation, type, statut, note],
      function (err) {
        callback(err, { id: this.lastID, ...fournisseur });
      }
    );
  },

  delete: (id, callback) => {
    db.run('DELETE FROM fournisseurs WHERE id = ?', [id], (err) => callback(err));
  },

  update: (id, fournisseur, callback) => {
    const {
      nom, email, telephone, adresse, ville, codePostal,
      pays, entreprise, dateCreation, type, statut, note
    } = fournisseur;

    db.run(`
      UPDATE fournisseurs SET
        nom = ?, email = ?, telephone = ?, adresse = ?, ville = ?, codePostal = ?,
        pays = ?, entreprise = ?, dateCreation = ?, type = ?, statut = ?, note = ?
      WHERE id = ?
    `,
      [nom, email, telephone, adresse, ville, codePostal,
        pays, entreprise, dateCreation, type, statut, note, id],
      function (err) {
        callback(err, { id, ...fournisseur });
      }
    );
  }
  
};

module.exports = FournisseurDAO;
