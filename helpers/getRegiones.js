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

	// Se prepara la variable que alojará y devolverá las regiones.
	const regiones = [];

	await axios(config)
		.then(function (response) {
			// Se recorre el arrglo devuelto por el servidor y se inserta la region en "regiones".
			response.data.respuesta.forEach((region) => regiones.push(region));
		})
		.catch(function (error) {
			console.log(error);
		});
	return regiones;
};

module.exports = { getRegiones };
