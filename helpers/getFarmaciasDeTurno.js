var axios = require("axios");

const getFarmaciasDeTurno = async (idRegion, idComuna, nombreFarmacia, res) => {
	var FormData = require("form-data");
	var data = new FormData();
	data.append("func", "sector");
	data.append("filtro", "todos");
	data.append("fecha", "2023-09-01");
	data.append("region", idRegion);
	data.append("comuna", idComuna);
	data.append("la", "");
	data.append("lng", "");
	data.append("latMin", "-33.42434971266427");
	data.append("latMax", "-33.38895457380163");
	data.append("lngMin", "-70.64174652099611");
	data.append("lngMax", "-70.47789573669435");

	var config = {
		method: "post",
		url: "https://seremienlinea.minsal.cl/farmacias/mapa.php",
		headers: {
			"Content-Type": "multipart/form-data",
			...data.getHeaders(),
		},
		data: data,
	};

	// Se prepara el array vacio que guardará las farmacias de turno.
	const farmaciasDeTurno = [];

	await axios(config)
		.then(function (response) {
			// Se recorre el arreglo devuelto por el servidor
			response.data.respuesta.locales.forEach((local) => {
				// y si la farmacia búscada coincide con la del arreglo
				if (local.nm == nombreFarmacia) {
					// Se guarda en "farmaciasDeTurno".
					farmaciasDeTurno.push(local);
				}
			});
		})
		.catch(function (error) {
			console.log(error);
		});

	return farmaciasDeTurno;
};

module.exports = { getFarmaciasDeTurno };
