var axios = require("axios");

const getRegiones = async (req, res) => {
	var FormData = require("form-data");
	var data = new FormData();
	data.append("func", "regiones");
	var config = {
		method: "post",
		url: "https://seremienlinea.minsal.cl/farmacias/mapa.php",
		headers: {
			"Content-Type": "multipart/form-data",
			...data.getHeaders(),
		},
		data: data,
	};

	const regiones = [];

	await axios(config)
		.then(function (response) {
			response.data.respuesta.forEach((region) => regiones.push(region));
		})
		.catch(function (error) {
			console.log(error);
		});
	return regiones;
};

module.exports = { getRegiones };
