import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Recherche
  const [search, setSearch] = useState("");
  
  // Tri
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    axios.get("http://localhost:3001/api/clients")
      .then((res) => {
        setClients(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des clients");
        setLoading(false);
      });
  }, []);

  // Fonction pour gérer le clic sur un en-tête de colonne
  function requestSort(key) {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }

  // Calcul du tableau filtré + trié
  const filteredClients = useMemo(() => {
    let filtered = clients;

    // Filtrage par recherche (sur nom, email, ville)
    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(client =>
        (client.nom?.toLowerCase().includes(lowerSearch) ||
         client.email?.toLowerCase().includes(lowerSearch) ||
         client.ville?.toLowerCase().includes(lowerSearch))
      );
    }

    // Tri si défini
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
  }, [clients, search, sortConfig]);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  // Fonction pour afficher une flèche selon le tri actif
  const SortArrow = ({ column }) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className="w-full max-w-full mx-auto p-6 bg-white rounded-xl shadow-lg px-6 md:px-12 lg:px-24">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-700">Liste des clients</h1>

      <input
        type="text"
        placeholder="Rechercher par nom, email ou ville..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-6 w-full max-w-md mr-auto border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 block"
        />


      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-blue-700 text-white cursor-pointer">
            <tr>
              <th
                className="py-4 px-6 text-left font-semibold border-b border-blue-800"
                onClick={() => requestSort("nom")}
              >
                Nom<SortArrow column="nom" />
              </th>
              <th
                className="py-4 px-6 text-left font-semibold border-b border-blue-800"
                onClick={() => requestSort("email")}
              >
                Email<SortArrow column="email" />
              </th>
              <th
                className="py-4 px-6 text-left font-semibold border-b border-blue-800"
                onClick={() => requestSort("telephone")}
              >
                Téléphone<SortArrow column="telephone" />
              </th>
              <th
                className="py-4 px-6 text-left font-semibold border-b border-blue-800"
                onClick={() => requestSort("ville")}
              >
                Ville<SortArrow column="ville" />
              </th>
              <th
                className="py-4 px-6 text-left font-semibold border-b border-blue-800"
                onClick={() => requestSort("typeClient")}
              >
                Type<SortArrow column="typeClient" />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-600">
                  Aucun client trouvé.
                </td>
              </tr>
            ) : (
              filteredClients.map(client => (
                <tr
                  key={client.id}
                  onClick={() => navigate(`/clients/${client.id}`)}
                  className="even:bg-gray-50 hover:bg-blue-100 transition-colors cursor-pointer shadow-sm"
                >
                  <td className="py-3 px-6 align-middle text-gray-800">{client.nom}</td>
                  <td className="py-3 px-6 align-middle text-gray-700">{client.email}</td>
                  <td className="py-3 px-6 align-middle text-gray-700">{client.telephone}</td>
                  <td className="py-3 px-6 align-middle text-gray-700">{client.ville}</td>
                  <td className="py-3 px-6 align-middle text-blue-700 capitalize font-medium">{client.type}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clients;
