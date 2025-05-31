const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const clientRoutes = require('./routes/clientRoutes');
const fournisseurRoutes = require('./routes/fournisseurRoutes');
const factureRoutes = require('./routes/factureRoutes');
const produitRoutes = require('./routes/produitRoutes');



const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/clients', clientRoutes);
app.use('/api/fournisseurs', fournisseurRoutes);
app.use('/api/factures', factureRoutes);
app.use('/api/produits', produitRoutes);



app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});
