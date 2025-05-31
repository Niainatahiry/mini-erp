const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./erp.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    email TEXT,
    telephone TEXT,
    adresse TEXT,
    ville TEXT,
    codePostal TEXT,
    pays TEXT,
    entreprise TEXT,
    dateCreation TEXT,
    type TEXT,
    statut TEXT,
    note INTEGER
  )`);
});
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS fournisseurs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    email TEXT,
    telephone TEXT,
    adresse TEXT,
    ville TEXT,
    codePostal TEXT,
    pays TEXT,
    entreprise TEXT,
    dateCreation TEXT,
    type TEXT,
    statut TEXT,
    note INTEGER
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS produits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    description TEXT,
    prix REAL NOT NULL,
    quantite INTEGER,
    categorie TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS factures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clientId INTEGER,
    date TEXT NOT NULL,
    total REAL,
    statut TEXT,
    FOREIGN KEY (clientId) REFERENCES clients(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS ligne_facture (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    factureId INTEGER,
    produitId INTEGER,
    quantite INTEGER,
    prixUnitaire REAL,
    FOREIGN KEY (factureId) REFERENCES factures(id),
    FOREIGN KEY (produitId) REFERENCES produits(id)
  )`);
});

module.exports = db;
  