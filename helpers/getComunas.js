var axios = require("axios");

const getComunas = async (idRegion, res) => {
	var FormData = require("form-data");
	var data = new FormData();
	data.append("func", "comunas");
	// Se filtra la comuna según la región requerida.
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

	// Se prepara la variable que alojará y retornará las comunas.
	const comunas = [];

	await axios(config)
		.then(function (response) {
			// Se recorré el arreglo devuelto por el servidor y se inserta en "comunas".
			response.data.respuesta.forEach((comuna) => comunas.push(comuna));
		})
		.catch(function (error) {
			console.log(error);
		});

	return comunas;
};

module.exports = { getComunas };
