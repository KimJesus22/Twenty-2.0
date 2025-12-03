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

  it('Caso 4: Real-Time Subscription', () => {
    // Abrir terminal
    cy.get('body').trigger('keydown', { key: 'F2', force: true });

    // 1. Insertar registro vía REST API (Simulando otro usuario)
    const SUPABASE_URL = 'https://zcnwqpgiwbtmtvpbwomi.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjbndxcGdpd2J0bXR2cGJ3b21pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MzU1ODQsImV4cCI6MjA4MDIxMTU4NH0.7DfcnnYeqqjvu5zP74koP1NrWm6muL1Xo0JfNrBxX4Q';

    cy.request({
      method: 'POST',
      url: `${SUPABASE_URL}/rest/v1/guestbook`,
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: {
        username: 'CypressBot',
        message: 'Testing Real-Time Feed'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
    });

    // 2. Verificar que aparece en la terminal (Esperar a que llegue el evento WebSocket)
    // Damos un timeout largo por si la red es lenta
    cy.get('#terminal-output', { timeout: 10000 })
      .should('contain.text', '[📡 INCOMING TRANSMISSION]')
      .and('contain.text', 'CypressBot: Testing Real-Time Feed');
  });
});
