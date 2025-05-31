const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./erp.sqlite');

db.serialize(() => {
  // Supprimer les données existantes (reset)
  db.run("DELETE FROM ligne_facture");
  db.run("DELETE FROM factures");
  db.run("DELETE FROM produits");
  db.run("DELETE FROM clients");
  db.run("DELETE FROM fournisseurs");

  // Réinitialiser les compteurs AUTOINCREMENT
  db.run("DELETE FROM sqlite_sequence WHERE name='ligne_facture'");
  db.run("DELETE FROM sqlite_sequence WHERE name='factures'");
  db.run("DELETE FROM sqlite_sequence WHERE name='produits'");
  db.run("DELETE FROM sqlite_sequence WHERE name='clients'");
  db.run("DELETE FROM sqlite_sequence WHERE name='fournisseurs'");

  // Insertion clients (Madagascar)
  db.run(`INSERT INTO clients (nom, email, telephone, adresse, ville, codePostal, pays, entreprise, dateCreation, type, statut, note)
          VALUES 
          ('Rakotondrazaka Hery', 'hery.rakoto@example.mg', '0341234567', 'Lot II M 45 Ankadimbahoaka', 'Antananarivo', '101', 'Madagascar', 'Hery SARL', '2025-05-31', 'Particulier', 'Actif', 5),
          ('Rasoanandrianina Mialy', 'mialy.rasoa@example.mg', '0329876543', 'Rue de la Révolution, Ambohijatovo', 'Antananarivo', '101', 'Madagascar', 'Mialy Entreprise', '2025-04-15', 'Entreprise', 'Actif', 4)`);

  // Insertion fournisseurs (Madagascar)
  db.run(`INSERT INTO fournisseurs (nom, email, telephone, adresse, ville, codePostal, pays, entreprise, dateCreation, type, statut, note)
          VALUES 
          ('Sarl Fanafana', 'contact@fanafana.mg', '0202223344', 'Zone Industrielle, Ivato', 'Antananarivo', '101', 'Madagascar', 'Fanafana SARL', '2024-11-10', 'Fournisseur', 'Actif', 3),
          ('Société Malgache de Matériel', 'info@socmat.mg', '0203334455', 'Lot I G 123, Tana', 'Antananarivo', '101', 'Madagascar', 'SMM SA', '2025-01-22', 'Fournisseur', 'Actif', 4)`);

  // Insertion produits (locaux ou importés courants à Madagascar)
  db.run(`INSERT INTO produits (nom, description, prix, quantite, categorie)
          VALUES
          ('Riz Local 50kg', 'Riz de qualité, récolte récente', 80000, 20, 'Alimentation'),
          ('Bidon d''huile végétale 5L', 'Huile de cuisson raffinée', 35000, 50, 'Alimentation'),
          ('Batterie de voiture', 'Batterie 12V 60Ah', 250000, 15, 'Automobile')`);

  // Insertion factures
  db.run(`INSERT INTO factures (clientId, date, total, statut)
          VALUES
          (1, '2025-05-20', 115000, 'Payée'),
          (2, '2025-05-29', 250000, 'En attente')`);

  // Insertion lignes de factures
  db.run(`INSERT INTO ligne_facture (factureId, produitId, quantite, prixUnitaire)
          VALUES
          (1, 1, 1, 80000),
          (1, 2, 1, 35000),
          (2, 3, 1, 250000)`);
});

db.close(() => {
  console.log("Base réinitialisée et données de test malgaches insérées.");
});
