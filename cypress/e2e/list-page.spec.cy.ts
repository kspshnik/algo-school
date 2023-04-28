/*   eslint-disable promise/catch-or-return */
/*   eslint-disable promise/always-return */
import {
  circleMainClass,
  circleContentClass,
  changingColor,
  modifiedColor, defaultColor,
} from '../fixtures/constants';
import { SHORT_DELAY_IN_MS } from '../../src/constants';

describe('Testing list page', () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit('localhost:3000/list');
  });
  it('pre-filled list should be on the page', () => {
    cy.get(circleMainClass).each((circle) => {
      cy.wrap(circle)
        .should('have.css', 'border-color', defaultColor)
        .find('p')
        .invoke('text')
        .should('not.be.empty');
    });
  });
  it('add buttons should be disabled in the beginning', () => {
    cy.get('button')
      .filter(':has(p:contains("Добавить"))')
      .find('p')
      .contains('Добавить')
      .parent()
      .should('be.disabled');
  });
  it('should correctly add and delete at head', () => {
    cy.get('fieldset')
      .find('button')
      .find('p')
      .contains('Добавить в head')
      .parent()
      .parent()
      .find('div')
      .find('input')
      .type('ква');
    cy.clock();
    cy.get('button')
      .find('p')
      .contains('Добавить в head')
      .parent()
      .click();
    cy.get('div[class*="small"]')
      .contains('ква')
      .parent()
      .should('have.css', 'border-color', changingColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('div[class*="small"]').should('not.exist');
    cy.get(circleMainClass)
      .eq(0)
      .find('p')
      .contains('ква');
    cy.get(circleMainClass)
      .eq(0)
      .should('have.css', 'border-color', modifiedColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleMainClass)
      .eq(0)
      .should('have.css', 'border-color', defaultColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('button')
      .find('p')
      .contains('Удалить из head')
      .parent()
      .click();
    cy.get(circleMainClass)
      .eq(0)
      .find('p')
      .invoke('text')
      .should('be.empty');
    cy.get(circleContentClass)
      .eq(0)
      .find('div[class*="small"]')
      .contains('ква')
      .parent()
      .should('have.css', 'border-color', changingColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleMainClass)
      .eq(0)
      .should('have.css', 'border-color', defaultColor);
    cy.get('div[class*="small"]').should('not.exist');
  });
  it('should correctly add and delete at tail', () => {
    cy.get('fieldset')
      .find('button')
      .find('p')
      .contains('Добавить в tail')
      .parent()
      .parent()
      .find('div')
      .find('input')
      .type('пыр');
    cy.clock();
    cy.get('button')
      .find('p')
      .contains('Добавить в tail')
      .parent()
      .click();
    cy.get('div[class*="small"]')
      .contains('пыр')
      .parent()
      .should('have.css', 'border-color', changingColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('div[class*="small"]').should('not.exist');
    cy.get(circleMainClass)
      .not('div[class*="small"]')
      .last()
      .should('have.css', 'border-color', modifiedColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleMainClass)
      .not('div[class*="small"]')
      .last()
      .should('have.css', 'border-color', defaultColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('button')
      .find('p')
      .contains('Удалить из tail')
      .parent()
      .click();
    cy.get(circleMainClass)
      .not('div[class*="small"]')
      .last()
      .find('p')
      .invoke('text')
      .should('be.empty');
    cy.get(circleMainClass)
      .filter('div[class*="small"]')
      .contains('пыр')
      .parent()
      .should('have.css', 'border-color', changingColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleMainClass)
      .filter('div[class*="small"]')
      .should('not.exist');
    cy.get(circleMainClass).each((circle) => {
      cy.wrap(circle).should('have.css', 'border-color', defaultColor);
    });
    cy.get('div[class*="small"]').should('not.exist');
  });
  it('should correctly add and remove by index', () => {
    cy.get('fieldset')
      .find('button')
      .find('p')
      .contains('Добавить в tail')
      .parent()
      .parent()
      .find('div')
      .find('input')
      .type('кря');
    cy.get('fieldset')
      .find('button')
      .find('p')
      .contains('Добавить по индексу')
      .parent()
      .parent()
      .find('div')
      .find('input')
      .type('1');
    cy.clock();
    cy.get('button')
      .find('p')
      .contains('Добавить по индексу')
      .parent()
      .click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass)
      .eq(0)
      .find('div[class*="small"]')
      .contains('кря')
      .parent()
      .should('have.css', 'border-color', changingColor);
    cy.get(circleMainClass)
      .eq(0)
      .should('have.css', 'border-color', changingColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass)
      .eq(1)
      .find('div[class*="small"]')
      .contains('кря')
      .parent()
      .should('have.css', 'border-color', changingColor);
    cy.get(circleMainClass)
      .eq(0)
      .should('have.css', 'border-color', changingColor);
    cy.get(circleMainClass)
      .eq(1)
      .should('have.css', 'border-color', changingColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleMainClass)
      .eq(1)
      .should('have.css', 'border-color', modifiedColor);
    cy.tick(SHORT_DELAY_IN_MS * 5); // Вне Cypress не происходит добавления лишнего элемента
    cy.get(circleMainClass)
      .not('div[class*="small"]')
      .eq(0)
      .should('have.css', 'border-color', defaultColor);
    cy.get(circleMainClass)
      .eq(1)
      .should('have.css', 'border-color', defaultColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('fieldset')
      .find('button')
      .find('p')
      .contains('Добавить по индексу')
      .parent()
      .parent()
      .find('div')
      .find('input')
      .type('1');
    cy.get('button')
      .find('p')
      .contains('Удалить по индексу')
      .parent()
      .click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleMainClass)
      .eq(0)
      .should('have.css', 'border-color', changingColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleMainClass)
      .eq(1)
      .should('have.css', 'border-color', changingColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleMainClass)
      .eq(1)
      .find('p')
      .should('be.empty');
    cy.get(circleContentClass)
      .eq(1)
      .find('div[class*="small"]')
      .contains('кря')
      .parent()
      .should('have.css', 'border-color', changingColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass).find('div[class*="small"]').should('not.exist');
    cy.get(circleMainClass)
      .not('div[class*="small"]')
      .eq(0)
      .should('have.css', 'border-color', defaultColor);
    cy.get(circleMainClass)
      .eq(1)
      .should('have.css', 'border-color', defaultColor);
  });
});

export {};
