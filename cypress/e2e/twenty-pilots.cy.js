describe('Twenty One Pilots App E2E Tests', () => {
  beforeEach(() => {
    // Visitar la aplicación antes de cada prueba
    // Asumimos que la app corre en localhost:8080 (o la URL base configurada en cypress.config.js)
    // Si no hay baseUrl, usamos '.' para file protocol o la url relativa
    cy.visit('index.html');
  });

  it('Caso 1: Carga Inicial', () => {
    // Verificar título de la página
    cy.title().should('include', 'Twenty One Pilots');

    // Verificar que el botón 'ENTER DEMA' sea visible
    cy.contains('a', 'ENTER DEMA').should('be.visible');
  });

  it('Caso 2: Seguridad de la CLI', () => {
    // Simular presión de tecla F2 para abrir terminal
    cy.get('body').trigger('keydown', { key: 'F2', force: true });

    // Verificar que el input de la terminal tenga el foco
    cy.get('#terminal-input').should('be.visible').and('have.focus');

    // Escribir log "Intento de hackeo" y presionar Enter
    cy.get('#terminal-input').type('log "Intento de hackeo"{enter}');

    // Verificar respuesta de error de autorización
    // Buscamos en el output de la terminal
    cy.get('#terminal-output').should('contain.text', 'Autorización requerida');
  });

  it('Caso 3: Flujo de Login Exitoso', () => {
    // Abrir terminal
    cy.get('body').trigger('keydown', { key: 'F2', force: true });

    // Login exitoso
    cy.get('#terminal-input').type('login KimJesus21{enter}');

    // Verificar acceso concedido
    cy.get('#terminal-output').should('contain.text', 'Acceso Concedido');

    // Verificar identidad
    cy.get('#terminal-input').type('whoami{enter}');
    cy.get('#terminal-output').should('contain.text', 'Clancy - Líder de la Resistencia');
  });
});
