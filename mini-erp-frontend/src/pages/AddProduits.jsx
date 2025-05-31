import React, { useState } from 'react';
import axios from 'axios';

function AddProduits() {
  const [form, setForm] = useState({
    nom: '',
    description: '',
    prix: '',
    quantite: '',
    categorie: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage('');
    setErrorMessage('');

    if (!form.nom || !form.prix) {
      setErrorMessage("Le nom et le prix sont obligatoires.");
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/produits', {
        ...form,
        prix: parseFloat(form.prix),
        quantite: parseInt(form.quantite || '0', 10)
      });
      setSuccessMessage('Produit ajouté avec succès.');
      setForm({ nom: '', description: '', prix: '', quantite: '', categorie: '' });
    } catch (error) {
      console.error(error);
      setErrorMessage("Erreur lors de l'ajout du produit.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Ajouter un Produit</h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nom"
          placeholder="Nom du produit"
          value={form.nom}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="number"
          name="prix"
          placeholder="Prix (Ar)"
          value={form.prix}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          step="0.01"
        />
        <input
          type="number"
          name="quantite"
          placeholder="Quantité en stock"
          value={form.quantite}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="categorie"
          placeholder="Catégorie"
          value={form.categorie}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}

export default AddProduits;
