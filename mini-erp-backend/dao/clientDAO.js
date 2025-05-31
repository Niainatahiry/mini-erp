const db = require('../db/database');

const ClientsDAO = {
  getAll: (callback) => {
    db.all('SELECT * FROM clients', [], (err, rows) => callback(err, rows));
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM clients WHERE id = ?', [id], (err, row) => callback(err, row));
  },

  create: (client, callback) => {
    const {
      nom, email, telephone, adresse, ville, codePostal,
      pays, entreprise, dateCreation, type, statut, note
    } = client;

    db.run(`
      INSERT INTO clients (
        nom, email, telephone, adresse, ville, codePostal,
        pays, entreprise, dateCreation, type, statut, note
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [nom, email, telephone, adresse, ville, codePostal,
        pays, entreprise, dateCreation, type, statut, note],
      function (err) {
        callback(err, { id: this.lastID, ...client });
      }
    );
  },

  delete: (id, callback) => {
    db.run('DELETE FROM clients WHERE id = ?', [id], (err) => callback(err));
  },

  update: (id, client, callback) => {
    const {
      nom, email, telephone, adresse, ville, codePostal,
      pays, entreprise, dateCreation, type, statut, note
    } = client;

    db.run(`
      UPDATE clients SET
        nom = ?, email = ?, telephone = ?, adresse = ?, ville = ?, codePostal = ?,
        pays = ?, entreprise = ?, dateCreation = ?, type = ?, statut = ?, note = ?
      WHERE id = ?
    `,
      [nom, email, telephone, adresse, ville, codePostal,
        pays, entreprise, dateCreation, type, statut, note, id],
      function (err) {
        callback(err, { id, ...client });
      }
    );
  }
};

module.exports = ClientsDAO;
