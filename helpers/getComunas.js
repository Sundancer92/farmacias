var axios = require("axios");

const getComunas = async (idRegion, res) => {
	var FormData = require("form-data");
	var data = new FormData();
	data.append("func", "comunas");
	data.append("region", idRegion);

	var config = {
		method: "post",
		url: "https://seremienlinea.minsal.cl/farmacias/mapa.php",
		headers: {
			"Content-Type": "multipart/form-data",
			...data.getHeaders(),
		},
		data: data,
	};

	const comunas = [];

	await axios(config)
		.then(function (response) {
			//console.log(response.data.respuesta)
			response.data.respuesta.forEach((comuna) => comunas.push(comuna));
		})
		.catch(function (error) {
			console.log(error);
		});

	return comunas;
};

module.exports = { getComunas };
