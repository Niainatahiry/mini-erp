import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Produits() {
  const [produits, setProduits] = useState([]);
  const [filtreCategorie, setFiltreCategorie] = useState('');
  const [recherche, setRecherche] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/produits');
      setProduits(response.data);
      // Extraire les catégories uniques
      const uniqueCategories = [...new Set(response.data.map(p => p.categorie).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    }
  };

  const produitsFiltres = produits.filter((produit) => {
    return (
      produit.nom.toLowerCase().includes(recherche.toLowerCase()) &&
      (filtreCategorie === '' || produit.categorie === filtreCategorie)
    );
  });

  return (
<div className="p-6 max-w-6xl mx-auto">
  <h2 className="text-3xl font-bold mb-8 text-blue-700 text-center">Liste des Produits</h2>

  {/* Filtres */}
  <div className="flex flex-wrap gap-4 mb-8 justify-between">
    <input
      type="text"
      placeholder="Rechercher un produit..."
      value={recherche}
      onChange={(e) => setRecherche(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2 lg:w-1/3"
    />

    <select
      value={filtreCategorie}
      onChange={(e) => setFiltreCategorie(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/3 lg:w-1/4"
    >
      <option value="">Toutes les catégories</option>
      {categories.map((cat, index) => (
        <option key={index} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  </div>

  {/* Table des produits */}
  <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
    <table className="min-w-full table-auto bg-white">
      <thead className="bg-blue-600 text-white text-sm uppercase text-left">
        <tr>
          <th className="px-6 py-3">Nom</th>
          <th className="px-6 py-3">Description</th>
          <th className="px-6 py-3">Prix</th>
          <th className="px-6 py-3">Quantité</th>
          <th className="px-6 py-3">Catégorie</th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {produitsFiltres.map((produit) => (
          <tr
            key={produit.id}
            className="hover:bg-blue-50 transition-colors even:bg-gray-50"
          >
            <td className="px-6 py-4">{produit.nom}</td>
            <td className="px-6 py-4">{produit.description}</td>
            <td className="px-6 py-4">{produit.prix} Ar</td>
            <td className="px-6 py-4">{produit.quantite}</td>
            <td className="px-6 py-4 capitalize">{produit.categorie}</td>
          </tr>
        ))}
        {produitsFiltres.length === 0 && (
          <tr>
            <td
              colSpan="5"
              className="text-center py-6 text-gray-500 italic bg-gray-50"
            >
              Aucun produit trouvé
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

  );
}

export default Produits;
