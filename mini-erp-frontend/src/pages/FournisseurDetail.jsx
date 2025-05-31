import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function FournisseurDetail() {
  const { id } = useParams();
  const [fournisseur, setFournisseur] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Charger fournisseur
  useEffect(() => {
    axios.get(`http://localhost:3001/api/fournisseurs/${id}`)
      .then(res => {
        setFournisseur(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Fournisseur introuvable");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  // Gérer la modification du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFournisseur(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:3001/api/fournisseurs/${id}`, fournisseur)
      .then(() => alert("Fournisseur modifié avec succès"))
      .catch(() => alert("Erreur lors de la modification"));
  };

  const handleDelete = () => {
    if (window.confirm("Voulez-vous vraiment supprimer ce fournisseur ?")) {
      axios.delete(`http://localhost:3001/api/fournisseurs/${id}`)
        .then(() => {
          alert("Fournisseur supprimé");
          navigate("/fournisseurs");
        })
        .catch(() => alert("Erreur lors de la suppression"));
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Fiche fournisseur #{fournisseur.id}</h2>

      <label className="block mb-2">
        Nom:
        <input
          type="text"
          name="nom"
          value={fournisseur.nom}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-2">
        Email:
        <input
          type="email"
          name="email"
          value={fournisseur.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-2">
        Téléphone:
        <input
          type="text"
          name="telephone"
          value={fournisseur.telephone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-2">
        Ville:
        <input
          type="text"
          name="ville"
          value={fournisseur.ville}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-4">
        Type:
        <input
          type="text"
          name="typeFournisseur"
          value={fournisseur.typeFournisseur}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Sauvegarder
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default FournisseurDetail;
