import { useState } from "react";
import axios from "axios";

function AddFournisseurs() {
  const [newFournisseur, setNewFournisseur] = useState({
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    ville: "",
    codePostal: "",
    entreprise: "",
    type: "", // exemple : particulier / entreprise
    dateCreation: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/fournisseurs", newFournisseur);
      setNewFournisseur({
        nom: "",
        email: "",
        telephone: "",
        adresse: "",
        ville: "",
        codePostal: "",
        entreprise: "",
        type: "",
        dateCreation: "",
      });
      setSuccessMessage("Fournisseur ajouté avec succès !");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      alert("Erreur lors de l'ajout du fournisseur");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {successMessage && (
        <div className="mb-4 text-green-700 bg-green-100 border border-green-300 px-4 py-2 rounded text-center">
          {successMessage}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4 text-center">Ajouter un fournisseur</h1>
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border px-3 py-2 rounded"
            placeholder="Nom"
            value={newFournisseur.nom}
            onChange={e => setNewFournisseur({ ...newFournisseur, nom: e.target.value })}
          />
          <input
            className="border px-3 py-2 rounded"
            placeholder="Email"
            value={newFournisseur.email}
            onChange={e => setNewFournisseur({ ...newFournisseur, email: e.target.value })}
          />
          <input
            className="border px-3 py-2 rounded"
            placeholder="Téléphone"
            value={newFournisseur.telephone}
            onChange={e => setNewFournisseur({ ...newFournisseur, telephone: e.target.value })}
          />
          <input
            className="border px-3 py-2 rounded"
            placeholder="Adresse"
            value={newFournisseur.adresse}
            onChange={e => setNewFournisseur({ ...newFournisseur, adresse: e.target.value })}
          />
          <input
            className="border px-3 py-2 rounded"
            placeholder="Ville"
            value={newFournisseur.ville}
            onChange={e => setNewFournisseur({ ...newFournisseur, ville: e.target.value })}
          />
          <input
            className="border px-3 py-2 rounded"
            placeholder="Code Postal"
            value={newFournisseur.codePostal}
            onChange={e => setNewFournisseur({ ...newFournisseur, codePostal: e.target.value })}
          />

          <select
            className="border px-3 py-2 rounded"
            value={newFournisseur.type}
            onChange={e => setNewFournisseur({ ...newFournisseur, type: e.target.value })}
          >
            <option value="">Type de fournisseur</option>
            <option value="particulier">Particulier</option>
            <option value="entreprise">Entreprise</option>
          </select>

          {/* Affichage conditionnel */}
          {newFournisseur.type === "entreprise" && (
            <input
              className="border px-3 py-2 rounded"
              placeholder="Entreprise"
              value={newFournisseur.entreprise}
              onChange={e => setNewFournisseur({ ...newFournisseur, entreprise: e.target.value })}
            />
          )}

          <input
            type="date"
            className="border px-3 py-2 rounded"
            value={newFournisseur.dateCreation}
            onChange={e => setNewFournisseur({ ...newFournisseur, dateCreation: e.target.value })}
          />

          <div className="col-span-1 md:col-span-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFournisseurs;
