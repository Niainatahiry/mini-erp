import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListeFacture() {
  const [factures, setFactures] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/factures')
      .then(res => {
        console.log('factures API response:', res.data);
        setFactures(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Liste des Factures</h2>
      <div className="overflow-x-auto border rounded-lg shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">ID</th>
              <th className="px-6 py-3 text-left font-semibold">Client</th>
              <th className="px-6 py-3 text-left font-semibold">Date</th>
              <th className="px-6 py-3 text-right font-semibold">Total (AR)</th>
              <th className="px-6 py-3 text-left font-semibold">Statut</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {factures.length > 0 ? (
              factures.map(f => (
                <tr
                  key={f.id}
                  className="even:bg-gray-100 hover:bg-blue-50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-700">{f.id}</td>
                  <td className="px-6 py-4 text-gray-800 font-medium">{f.clientNom}</td>
                  <td className="px-6 py-4 text-gray-700">{new Date(f.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right text-gray-800 font-semibold">{f.total.toFixed(2)}</td>
                  <td className={`px-6 py-4 font-semibold ${
                    f.statut === 'payé' ? 'text-green-600' :
                    f.statut === 'en attente' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {f.statut}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/factures/${f.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Voir détails
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-gray-500">
                  Aucune facture trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListeFacture;
