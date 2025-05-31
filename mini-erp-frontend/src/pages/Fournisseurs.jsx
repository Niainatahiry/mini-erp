import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Fournisseurs() {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Recherche
  const [search, setSearch] = useState("");

  // Tri
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    axios.get("http://localhost:3001/api/fournisseurs")
      .then((res) => {
        setFournisseurs(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des fournisseurs");
        setLoading(false);
      });
  }, []);

  // Gérer le clic sur un en-tête de colonne
  function requestSort(key) {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }

  // Filtrer + trier
  const filteredFournisseurs = useMemo(() => {
    let filtered = fournisseurs;

    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(fournisseur =>
        (fournisseur.nom?.toLowerCase().includes(lowerSearch) ||
         fournisseur.email?.toLowerCase().includes(lowerSearch) ||
         fournisseur.ville?.toLowerCase().includes(lowerSearch))
      );
    }

    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        const aKey = (a[sortConfig.key] ?? "").toString().toLowerCase();
        const bKey = (b[sortConfig.key] ?? "").toString().toLowerCase();

        if (aKey < bKey) return sortConfig.direction === "asc" ? -1 : 1;
        if (aKey > bKey) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [fournisseurs, search, sortConfig]);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  const SortArrow = ({ column }) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className="w-full max-w-full mx-auto p-6 bg-white rounded-xl shadow-lg px-6 md:px-12 lg:px-24">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-green-700">Liste des fournisseurs</h1>

      <input
        type="text"
        placeholder="Rechercher par nom, email ou ville..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-6 w-full max-w-md mr-auto border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 block"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-green-700 text-white cursor-pointer">
            <tr>
              <th
                className="py-4 px-6 text-left font-semibold border-b border-green-800"
                onClick={() => requestSort("nom")}
              >
                Nom<FournisseurSortArrow column="nom" />
              </th>
              <th
                className="py-4 px-6 text-left font-semibold border-b border-green-800"
                onClick={() => requestSort("email")}
              >
                Email<FournisseurSortArrow column="email" />
              </th>
              <th
                className="py-4 px-6 text-left font-semibold border-b border-green-800"
                onClick={() => requestSort("telephone")}
              >
                Téléphone<FournisseurSortArrow column="telephone" />
              </th>
              <th
                className="py-4 px-6 text-left font-semibold border-b border-green-800"
                onClick={() => requestSort("ville")}
              >
                Ville<FournisseurSortArrow column="ville" />
              </th>
              <th
                className="py-4 px-6 text-left font-semibold border-b border-green-800"
                onClick={() => requestSort("type")}
              >
                Type<FournisseurSortArrow column="type" />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFournisseurs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-600">
                  Aucun fournisseur trouvé.
                </td>
              </tr>
            ) : (
              filteredFournisseurs.map(fournisseur => (
                <tr
                  key={fournisseur.id}
                  onClick={() => navigate(`/fournisseurs/${fournisseur.id}`)}
                  className="even:bg-gray-50 hover:bg-green-100 transition-colors cursor-pointer shadow-sm"
                >
                  <td className="py-3 px-6 align-middle text-gray-800">{fournisseur.nom}</td>
                  <td className="py-3 px-6 align-middle text-gray-700">{fournisseur.email}</td>
                  <td className="py-3 px-6 align-middle text-gray-700">{fournisseur.telephone}</td>
                  <td className="py-3 px-6 align-middle text-gray-700">{fournisseur.ville}</td>
                  <td className="py-3 px-6 align-middle text-green-700 capitalize font-medium">{fournisseur.type}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// On peut réutiliser la même fonction pour la flèche de tri
function FournisseurSortArrow({ column, sortConfig }) {
  if (sortConfig?.key !== column) return null;
  return sortConfig.direction === "asc" ? " ▲" : " ▼";
}

export default Fournisseurs;
