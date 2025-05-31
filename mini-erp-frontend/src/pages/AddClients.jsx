import { useState } from "react";
import axios from "axios";

function AddClients() {
	const [newClient, setNewClient] = useState({
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
		await axios.post("http://localhost:3001/api/clients", newClient);
		setNewClient({
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
		setSuccessMessage("Client ajouté avec succès !");
		setTimeout(() => setSuccessMessage(""), 3000);
	};

	return (
		<div className="max-w-3xl mx-auto p-4">
			{successMessage && (
				<div className="mb-4 text-green-700 bg-green-100 border border-green-300 px-4 py-2 rounded text-center">
					{successMessage}
				</div>
			)}

			<h1 className="text-2xl font-bold mb-4 text-center">Ajouter un client</h1>
			<div className="bg-white rounded-xl shadow p-6 mb-8">
				<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<input className="border px-3 py-2 rounded" placeholder="Nom"
						value={newClient.nom}
						onChange={e => setNewClient({ ...newClient, nom: e.target.value })}
					/>
					<input className="border px-3 py-2 rounded" placeholder="Email"
						value={newClient.email}
						onChange={e => setNewClient({ ...newClient, email: e.target.value })}
					/>
					<input className="border px-3 py-2 rounded" placeholder="Téléphone"
						value={newClient.telephone}
						onChange={e => setNewClient({ ...newClient, telephone: e.target.value })}
					/>
					<input className="border px-3 py-2 rounded" placeholder="Adresse"
						value={newClient.adresse}
						onChange={e => setNewClient({ ...newClient, adresse: e.target.value })}
					/>
					<input className="border px-3 py-2 rounded" placeholder="Ville"
						value={newClient.ville}
						onChange={e => setNewClient({ ...newClient, ville: e.target.value })}
					/>
					<input className="border px-3 py-2 rounded" placeholder="Code Postal"
						value={newClient.codePostal}
						onChange={e => setNewClient({ ...newClient, codePostal: e.target.value })}
					/>

					<select
					className="border px-3 py-2 rounded"
					value={newClient.type}
					onChange={e => setNewClient({ ...newClient, type: e.target.value })}
					>
					<option value="">Type de client</option>
					<option value="particulier">Particulier</option>
					<option value="entreprise">Entreprise</option>
					</select>

					{/* Affichage conditionnel */}
					{newClient.type === "entreprise" && (
					<input
						className="border px-3 py-2 rounded"
						placeholder="Entreprise"
						value={newClient.entreprise}
						onChange={e => setNewClient({ ...newClient, entreprise: e.target.value })}
					/>
					)}
					
					<input
						type="date"
						className="border px-3 py-2 rounded"
						value={newClient.dateCreation}
						onChange={e => setNewClient({ ...newClient, dateCreation: e.target.value })}
					/>
	
					<div className="col-span-1 md:col-span-2">
						<button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Ajouter</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddClients;
