import { Routes, Route } from 'react-router-dom';
import AddClients from './pages/AddClients';
import Clients from './pages/Clients';
import ClientDetail from './pages/ClientDetail';
import AddFournisseurs from './pages/AddFournisseurs';
import Fournisseurs from './pages/Fournisseurs';
import FournisseurDetail from './pages/FournisseurDetail';
import Produits from './pages/Produits';
import AddProduits from './pages/AddProduits';

import ListeFacture from './pages/ListeFacture';
import CreateFacture from './pages/CreateFacture';
import FactureDetail from './pages/FactureDetail';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Clients */}
      <Route path="/clients/new" element={<AddClients />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/clients/:id" element={<ClientDetail />} />

      {/* Fournisseurs */}
      <Route path="/fournisseurs/new" element={<AddFournisseurs />} />
      <Route path="/fournisseurs" element={<Fournisseurs />} />
      <Route path="/fournisseurs/:id" element={<FournisseurDetail />} />

      {/* Produits */}
      <Route path="/produits" element={<Produits />} />
      <Route path="/produits/new" element={<AddProduits />} />

      {/* Factures */}
      <Route path="/factures" element={<ListeFacture />} />
      <Route path="/factures/new" element={<CreateFacture />} />
      <Route path="/factures/:id" element={<FactureDetail />} />
    </Routes>
  );
}
