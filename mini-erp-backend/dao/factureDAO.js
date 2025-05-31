    // factureDAO.js
    const db = require('../db/database');


    const FactureDAO = {
    getAll: (callback) => {
        const sql = `
        SELECT f.*, c.nom AS clientNom
        FROM factures f
        LEFT JOIN clients c ON f.clientId = c.id
        ORDER BY f.date DESC
        `;
        db.all(sql, [], callback);
    },

    getById: (id, callback) => {
        const sql = `
        SELECT f.*, c.nom AS clientNom
        FROM factures f
        LEFT JOIN clients c ON f.clientId = c.id
        WHERE f.id = ?
        `;
        db.get(sql, [id], callback);
    },

    getLignesByFactureId: (factureId, callback) => {
        const sql = `
          SELECT lf.*, p.nom AS produitNom
          FROM ligne_facture lf
          JOIN produits p ON lf.produitId = p.id
          WHERE lf.factureId = ?
        `;
        db.all(sql, [factureId], (err, rows) => {
          if (err) return callback(err);
          const lignes = rows.map(row => ({
            id: row.id,
            factureId: row.factureId,
            produitId: row.produitId,
            quantite: row.quantite,
            prixUnitaire: row.prixUnitaire,
            produit: {
              id: row.produitId,
              nom: row.produitNom
            }
          }));
          callback(null, lignes);
        });
      },
      
    getTotalByFactureId: (factureId, callback) => {
        const sql = `
          SELECT SUM(quantite * prixUnitaire) AS total
          FROM ligne_facture
          WHERE factureId = ?
        `;
        db.get(sql, [factureId], (err, row) => {
          if (err) return callback(err);
          const total = row?.total || 0;
          callback(null, total);
        });
      },

      updateTotal: (factureId, callback) => {
        FactureDAO.getTotalByFactureId(factureId, (err, total) => {
          if (err) return callback(err);
          db.run(
            `UPDATE factures SET total = ? WHERE id = ?`,
            [total, factureId],
            callback
          );
        });
      },
      
      

    create: (facture, lignes, callback) => {
        const { clientId, date, total, statut } = facture;

        db.run(
        `INSERT INTO factures (clientId, date, total, statut) VALUES (?, ?, ?, ?)`,
        [clientId, date, total, statut],
        function (err) {
            if (err) return callback(err);

            const factureId = this.lastID;

            const stmt = db.prepare(
            `INSERT INTO ligne_facture (factureId, produitId, quantite, prixUnitaire) VALUES (?, ?, ?, ?)`
            );

            for (const ligne of lignes) {
            stmt.run([factureId, ligne.produitId, ligne.quantite, ligne.prixUnitaire]);
            }

            stmt.finalize((err) => {
            if (err) return callback(err);
            callback(null, factureId);
            });
        }
        );
    },

    update: (id, facture, callback) => {
        const { clientId, date, total, statut } = facture;
        const sql = `UPDATE factures SET clientId = ?, date = ?, total = ?, statut = ? WHERE id = ?`;
        db.run(sql, [clientId, date, total, statut, id], callback);
    },

    delete: (id, callback) => {
        db.run(`DELETE FROM ligne_facture WHERE factureId = ?`, [id], (err) => {
        if (err) return callback(err);

        db.run(`DELETE FROM factures WHERE id = ?`, [id], callback);
        });
    },
    };

    module.exports = FactureDAO;
