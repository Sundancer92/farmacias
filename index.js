const express = require("express");
const app = express();

// Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// helpers
const { getComunas } = require("./helpers/getComunas");
const { getRegiones } = require("./helpers/getRegiones");
const { getNombreFarmacias } = require("./helpers/getNombreFarmacias");
const { getFarmaciasDeTurno } = require("./helpers/getFarmaciasDeTurno");
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/client/index.html");
});

app.get("/regiones", async (req, res) => {
	const regiones = await getRegiones();
	res.send(regiones);
});

app.get("/comunas/:idRegion", async (req, res) => {
	const { idRegion } = req.params;
	const comunas = await getComunas(idRegion);
	res.send(comunas);
});

app.get("/nombreFarmacias", async (req, res) => {
	const nombreFarmacias = await getNombreFarmacias();
	res.send(nombreFarmacias);
});

app.post("/farmacias/:idRegion&:idComuna&:nombreFarmacia", async (req, res) => {
	const {idRegion, idComuna, nombreFarmacia} = req.params;
	const farmacias = await getFarmaciasDeTurno(idRegion, idComuna, nombreFarmacia)
	res.send(farmacias)
})

app.listen(PORT, () => {
	console.log(`Servidor disponible en http://localhost:${PORT}`);
});
