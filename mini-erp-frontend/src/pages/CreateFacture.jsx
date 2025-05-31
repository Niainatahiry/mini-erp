import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CreateFacture() {
  const [clients, setClients] = useState([]);
  const [produits, setProduits] = useState([]);
  const [facture, setFacture] = useState({
    clientId: '',
    date: new Date().toISOString().slice(0, 10),
    statut: 'En attente',
  });
  const [lignes, setLignes] = useState([
    { produitId: '', quantite: 1, prixUnitaire: 0 },
  ]);

  // Charger clients et produits
  useEffect(() => {
    axios.get('http://localhost:3001/api/clients').then((res) => setClients(res.data));
    axios.get('http://localhost:3001/api/produits').then((res) => setProduits(res.data));
  }, []);

  // Gérer changement facture
  const handleFactureChange = (e) => {
    setFacture({ ...facture, [e.target.name]: e.target.value });
  };

  // Gérer changement ligne avec mise à jour du prix selon le produit
  const handleLigneChange = (index, field, value) => {
    setLignes((prevLignes) => {
      const newLignes = [...prevLignes];
      const ligne = { ...newLignes[index], [field]: value };

      if (field === 'produitId') {
        const produit = produits.find(p => p.id === parseInt(value));
        if (produit) {
          ligne.prixUnitaire = produit.prix;
        } else {
          ligne.prixUnitaire = 0;
        }
      }

      if (field === 'quantite' || field === 'prixUnitaire') {
        ligne[field] = parseFloat(value) || 0;
      }

      newLignes[index] = ligne;
      return newLignes;
    });
  };

  // Ajouter ligne
  const addLigne = () => {
    setLignes([...lignes, { produitId: '', quantite: 1, prixUnitaire: 0 }]);
  };

  // Supprimer ligne
  const removeLigne = (index) => {
    const newLignes = lignes.filter((_, i) => i !== index);
    setLignes(newLignes);
  };

  // Calculer total
  const total = lignes.reduce((acc, l) => acc + (l.quantite * l.prixUnitaire || 0), 0);

  // Soumettre formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...facture, total, lignes };
    axios.post('http://localhost:3001/api/factures', data).then(() => {
      alert('Facture ajoutée');
    }).catch(err => {
      console.error(err);
      alert('Erreur lors de la création');
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Nouvelle Facture</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Client */}
        <div>
          <label htmlFor="clientId" className="block mb-1 font-semibold text-gray-700">Client :</label>
          <select
            id="clientId"
            name="clientId"
            value={facture.clientId}
            onChange={handleFactureChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Sélectionner --</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.nom}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block mb-1 font-semibold text-gray-700">Date :</label>
          <input
            type="date"
            id="date"
            name="date"
            value={facture.date}
            onChange={handleFactureChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Statut */}
        <div>
          <label htmlFor="statut" className="block mb-1 font-semibold text-gray-700">Statut :</label>
          <select
            id="statut"
            name="statut"
            value={facture.statut}
            onChange={handleFactureChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>En attente</option>
            <option>Payée</option>
            <option>Annulée</option>
          </select>
        </div>

        {/* Lignes */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Lignes</h3>
          <div className="space-y-4">
            {lignes.map((ligne, index) => (
              <div
                key={index}
                className="flex flex-wrap gap-4 items-center border border-gray-200 rounded-md p-4"
              >
                <select
                  value={ligne.produitId}
                  onChange={(e) => handleLigneChange(index, 'produitId', e.target.value)}
                  required
                  className="flex-grow min-w-[150px] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Produit --</option>
                  {produits.map(p => (
                    <option key={p.id} value={p.id}>{p.nom}</option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Quantité"
                  value={ligne.quantite}
                  onChange={(e) => handleLigneChange(index, 'quantite', e.target.value)}
                  min="1"
                  required
                  className="w-24 border border-gray-300 rounded-md px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="number"
                  placeholder="Prix Unitaire"
                  value={ligne.prixUnitaire}
                  readOnly
                  className="w-32 bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-right focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => removeLigne(index)}
                  className="text-red-600 hover:text-red-800 font-bold px-3 py-1 rounded-md transition"
                  aria-label="Supprimer la ligne"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addLigne}
            className="mt-4 inline-block bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
          >
            ➕ Ajouter une ligne
          </button>
        </div>

        {/* Total */}
        <div className="text-right text-xl font-bold text-gray-800">
          Total : {total.toFixed(2)} €
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-semibold transition"
        >
          Créer Facture
        </button>
      </form>
    </div>
  );
}

export default CreateFacture;
