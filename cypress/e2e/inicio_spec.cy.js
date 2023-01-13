describe("Testing Página Principal", () => {
	it("Página principal se abre y rutas para el form se cargan.", () => {
		cy.visit("http://localhost:5000");
		cy.contains("Buscador de Farmacias por Comuna");
	});
});


describe("Validación Respuesta Formulario", () => {
	it("Validación de un envío correcto.", () => {
		cy.visit("http://localhost:5000");
		cy.get('select#regionesSelect').select('Metropolitana').should('have.value', '7')
		cy.get('select#comunasSelect').select('Las Condes').should('have.value', '102')
		cy.get('select#farmaciasSelect').select('AHUMADA').should('have.value', 'AHUMADA')
		cy.contains('Buscar').click()
		cy.contains('Farmacia AHUMADA')
	});
});

