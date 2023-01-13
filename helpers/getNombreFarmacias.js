var axios = require("axios");

const getNombreFarmacias = async (req, res) => {
	var FormData = require("form-data");
	var data = new FormData();
	data.append("func", "sector");
	data.append("filtro", "todos");
	data.append("fecha", "2023-09-01");
	data.append("region", "");
	data.append("comuna", "");
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

	const nombreFarmacias = [];

	await axios(config)
		.then(function (response) {
			response.data.respuesta.locales.forEach((local) => {
				if (!nombreFarmacias.includes(local.nm)) {
					nombreFarmacias.push(local.nm);
				}
			});
		})
		.catch(function (error) {
			console.log(error);
		});

	return nombreFarmacias;
};

module.exports = { getNombreFarmacias };
