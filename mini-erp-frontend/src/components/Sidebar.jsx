import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, PlusCircle, ChevronDown, ChevronUp, Truck, Package } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [clientsOpen, setClientsOpen] = useState(false);
  const [fournisseursOpen, setFournisseursOpen] = useState(false);
  const [produitsOpen, setProduitsOpen] = useState(false);
const [facturesOpen, setFacturesOpen] = useState(false);




  useEffect(() => {
    if (location.pathname.startsWith('/clients')) setClientsOpen(true);
    if (location.pathname.startsWith('/fournisseurs')) setFournisseursOpen(true);
    if (location.pathname.startsWith('/produits')) setProduitsOpen(true);
    if (location.pathname.startsWith('/factures')) setFacturesOpen(true);

  }, [location.pathname]);

  return (
    <aside className="h-screen w-64 bg-gray-800 text-white flex flex-col shadow-md">
      <div className="text-2xl font-bold text-center py-6 border-b border-gray-700">
        Mini-ERP
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-auto">

        {/* Menu Clients */}
        <div>
          <button
            onClick={() => setClientsOpen(!clientsOpen)}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-md ${
              location.pathname.startsWith('/clients') ? 'bg-gray-700' : 'hover:bg-gray-700/70'
            }`}
          >
            <span className="flex items-center gap-3"><Users size={20} />Clients</span>
            {clientsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {clientsOpen && (
            <div className="ml-8 mt-2 flex flex-col space-y-1">
              <Link to="/clients" className={`px-4 py-2 rounded-md ${
                location.pathname === '/clients' ? 'bg-gray-600' : 'hover:bg-gray-600/70'
              }`}>Liste Clients</Link>
              <Link to="/clients/new" className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                location.pathname === '/clients/new' ? 'bg-gray-600' : 'hover:bg-gray-600/70'
              }`}>
                <PlusCircle size={16} />Ajouter Client
              </Link>
            </div>
          )}
        </div>

        {/* Menu Fournisseurs */}
        <div>
          <button
            onClick={() => setFournisseursOpen(!fournisseursOpen)}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-md ${
              location.pathname.startsWith('/fournisseurs') ? 'bg-gray-700' : 'hover:bg-gray-700/70'
            }`}
          >
            <span className="flex items-center gap-3"><Truck size={20} />Fournisseurs</span>
            {fournisseursOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {fournisseursOpen && (
            <div className="ml-8 mt-2 flex flex-col space-y-1">
              <Link to="/fournisseurs" className={`px-4 py-2 rounded-md ${
                location.pathname === '/fournisseurs' ? 'bg-gray-600' : 'hover:bg-gray-600/70'
              }`}>Liste Fournisseurs</Link>
              <Link to="/fournisseurs/new" className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                location.pathname === '/fournisseurs/new' ? 'bg-gray-600' : 'hover:bg-gray-600/70'
              }`}>
                <PlusCircle size={16} />Ajouter Fournisseur
              </Link>
            </div>
          )}
        </div>

        {/* Menu Produits */}
        <div>
          <button
            onClick={() => setProduitsOpen(!produitsOpen)}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-md ${
              location.pathname.startsWith('/produits') ? 'bg-gray-700' : 'hover:bg-gray-700/70'
            }`}
          >
            <span className="flex items-center gap-3"><Package size={20} />Produits</span>
            {produitsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {produitsOpen && (
            <div className="ml-8 mt-2 flex flex-col space-y-1">
              <Link to="/produits" className={`px-4 py-2 rounded-md ${
                location.pathname === '/produits' ? 'bg-gray-600' : 'hover:bg-gray-600/70'
              }`}>Liste Produits</Link>
              <Link to="/produits/new" className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                location.pathname === '/produits/new' ? 'bg-gray-600' : 'hover:bg-gray-600/70'
              }`}>
                <PlusCircle size={16} />Ajouter Produit
              </Link>
            </div>
          )}
        </div>
        <hr className="border-gray-700 my-4" />
        <div>
          <button
            onClick={() => setFacturesOpen(!facturesOpen)}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-md ${
              location.pathname.startsWith('/factures') ? 'bg-gray-700' : 'hover:bg-gray-700/70'
            }`}
          >
            <span className="flex items-center gap-3"><Package size={20} />Factures</span>
            {facturesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {facturesOpen && (
            <div className="ml-8 mt-2 flex flex-col space-y-1">
              <Link to="/factures" className={`px-4 py-2 rounded-md ${
                location.pathname === '/factures' ? 'bg-gray-600' : 'hover:bg-gray-600/70'
              }`}>Liste Factures</Link>
              <Link to="/factures/new" className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                location.pathname === '/factures/new' ? 'bg-gray-600' : 'hover:bg-gray-600/70'
              }`}>
                <PlusCircle size={16} />Ajouter Facture
              </Link>
            </div>
          )}
        </div>

      </nav>
    </aside>
  );
};

export default Sidebar;
