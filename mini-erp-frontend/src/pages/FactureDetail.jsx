import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function FactureDetail() {
	const { id } = useParams();
	const [facture, setFacture] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get(`http://localhost:3001/api/factures/${id}`)
			.then((res) => {
				setFacture(res.data);
				setLoading(false);
				console.log(res);
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	}, [id]);

	if (loading) return <div className="p-4">Chargement...</div>;
	if (!facture)
		return <div className="p-4 text-red-500">Facture introuvable.</div>;

	return (
		<div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
			<h2 className="text-3xl font-bold mb-6">
				Détail de la facture #{facture.id}
			</h2>

			<div className="mb-4">
				<span className="font-semibold">Client :</span> {facture.clientNom}
			</div>

			<div className="mb-4">
				<span className="font-semibold">Date :</span> {facture.date}
			</div>

			<div className="mb-4">
				<span className="font-semibold">Statut :</span> {facture.statut}
			</div>

			<h3 className="text-xl font-semibold mt-6 mb-2">Lignes de facture</h3>

			<table className="w-full border border-gray-300 text-sm">
				<thead>
					<tr className="bg-gray-100">
						<th className="border px-4 py-2 text-left">Produit</th>
						<th className="border px-4 py-2 text-right">Quantité</th>
						<th className="border px-4 py-2 text-right">Prix unitaire (€)</th>
						<th className="border px-4 py-2 text-right">Total (€)</th>
					</tr>
				</thead>
				<tbody>
					{facture.lignes.map((ligne, index) => (
						<tr
							key={index}
							className="hover:bg-gray-50"
						>
							<td className="border px-4 py-2">{ligne.produit.nom}</td>
							<td className="border px-4 py-2 text-right">{ligne.quantite}</td>
							<td className="border px-4 py-2 text-right">
								{ligne.prixUnitaire.toFixed(2)}
							</td>
							<td className="border px-4 py-2 text-right">
								{(ligne.quantite * ligne.prixUnitaire).toFixed(2)}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="text-right text-xl font-bold mt-6">
				Total : {facture.total.toFixed(2)} €
			</div>
		</div>
	);
}

export default FactureDetail;
