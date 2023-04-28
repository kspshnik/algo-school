describe('App', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });
  it('should up & open main page', () => {
    cy.contains('МБОУ АЛГОСОШ');
  });
});
describe('Routing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('should visit string page and get back', () => {
    cy.get('a[href*="/recursion"]').click({ force: true });
    cy.get('h3').contains('Строка');
    cy.get('button').contains('К оглавлению').click();
    cy.contains('МБОУ АЛГОСОШ');
  });
  it('should visit fibonacchi page get back', () => {
    cy.get('a[href*="/fibonacci"]').click();
    cy.get('h3').contains('Последовательность Фибоначчи');
    cy.get('button').contains('К оглавлению').click();
    cy.contains('МБОУ АЛГОСОШ');
  });
  it('should visit sorting page and get back', () => {
    cy.get('a[href*="/sorting"]').click({ force: true });
    cy.get('h3').contains('Сортировка массива');
    cy.get('button').contains('К оглавлению').click();
    cy.contains('МБОУ АЛГОСОШ');
  });
  it('should visit stack page and get back', () => {
    cy.get('a[href*="/stack"]').click();
    cy.get('h3').contains('Стек');
    cy.get('button').contains('К оглавлению').click();
    cy.contains('МБОУ АЛГОСОШ');
  });
  it('should visit queue page and get back', () => {
    cy.get('a[href*="/queue"]').click({ force: true });
    cy.get('h3').contains('Очередь');
    cy.get('button').contains('К оглавлению').click();
    cy.contains('МБОУ АЛГОСОШ');
  });
  it('should visit fibonacchi page and get back', () => {
    cy.get('a[href*="/list"]').click();
    cy.get('h3').contains('Связный список');
    cy.get('button').contains('К оглавлению').click();
    cy.contains('МБОУ АЛГОСОШ');
  });
});

export {};
