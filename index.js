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
// PORT
const PORT = process.env.PORT || 5000;

// Disponibilizamos el home del sitio.
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/client/index.html");
});

// Ruta que devuelve todas las regiones.
app.get("/regiones", async (req, res) => {
	const regiones = await getRegiones();
	res.send(regiones);
});

// Ruta que devuelve todas las comunas por región.
app.get("/comunas/:idRegion", async (req, res) => {
	// Se toma la id de la región enviada desde el front.
	const { idRegion } = req.params;
	const comunas = await getComunas(idRegion);
	res.send(comunas);
});

// Ruta que devuelve el nombre de todas las farmacias.
app.get("/nombreFarmacias", async (req, res) => {
	const nombreFarmacias = await getNombreFarmacias();
	res.send(nombreFarmacias);
});

// Se consulta por la farmacia de la comuna y región que el front necesita saber.
app.post("/farmacias/:idRegion&:idComuna&:nombreFarmacia", async (req, res) => {
	const {idRegion, idComuna, nombreFarmacia} = req.params;
	console.log(req.params)
	const farmacias = await getFarmaciasDeTurno(idRegion, idComuna, nombreFarmacia)
	res.send(farmacias)
})

app.listen(PORT, () => {
	console.log(`Servidor disponible en http://localhost:${PORT}`);
});
