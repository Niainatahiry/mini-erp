// ClientDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/clients/${id}`)
      .then(res => {
        setClient(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement du client");
        setLoading(false);
      });
  }, [id]);

  function handleChange(e) {
    setClient({ ...client, [e.target.name]: e.target.value });
  }

  function handleSave() {
    axios.put(`http://localhost:3001/api/clients/${id}`, client)
      .then(() => alert("Client mis à jour !"))
      .catch(() => alert("Erreur lors de la mise à jour"));
  }

  function handleDelete() {
    if (window.confirm("Voulez-vous vraiment supprimer ce client ?")) {
      axios.delete(`http://localhost:3001/api/clients/${id}`)
        .then(() => {
          alert("Client supprimé");
          navigate("/clients");
        })
        .catch(() => alert("Erreur lors de la suppression"));
    }
  }

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!client) return null;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Fiche client #{client.id}</h2>

      <label className="block mb-2">
        Nom:
        <input
          type="text"
          name="nom"
          value={client.nom}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-2">
        Email:
        <input
          type="email"
          name="email"
          value={client.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-2">
        Téléphone:
        <input
          type="text"
          name="telephone"
          value={client.telephone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-2">
        Ville:
        <input
          type="text"
          name="ville"
          value={client.ville}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-4">
        Type:
        <input
          type="text"
          name="typeClient"
          value={client.typeClient}
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

export default ClientDetails;
