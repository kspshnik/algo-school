/*   eslint-disable promise/catch-or-return */
/*   eslint-disable promise/always-return */
import {
  circleMainClass,
  circleContentClass,
  changingColor,
  modifiedColor,
} from '../fixtures/constants';
import { SHORT_DELAY_IN_MS } from '../../src/constants';

describe('Testing stack page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/stack');
  });
  it('buttons should be disabled in the beginning', () => {
    cy.get('input').each((input) => {
      cy.wrap(input).should('be.empty');
    });
    cy.get('button')
      .find('p')
      .contains('Добавить')
      .parent()
      .should('be.disabled');
    cy.get('button')
      .find('p')
      .contains('Удалить')
      .parent()
      .should('be.disabled');
    cy.get('button')
      .find('p')
      .contains('Очистить')
      .parent()
      .should('be.disabled');
  });
  it('add button should be enabled on typing and get disabled on clearing', () => {
    cy.get('input').type('ква');
    cy.get('button')
      .find('p')
      .contains('Добавить')
      .parent()
      .should('not.be.disabled');
    cy.get('input').clear();
    cy.get('button')
      .find('p')
      .contains('Добавить')
      .parent()
      .should('be.disabled');
  });
  it('delete button should be disabled while no item is pushed to stack and properly pop item', () => {
    cy.get('button')
      .find('p')
      .contains('Добавить')
      .parent()
      .should('be.disabled');
    cy.get('button')
      .find('p')
      .contains('Удалить')
      .parent()
      .should('be.disabled');
    cy.get('button')
      .find('p')
      .contains('Очистить')
      .parent()
      .should('be.disabled');
    cy.get('div[class^="stack-page_dashboard"]').children().should('to.have.length', 0);
    cy.get('input').type('фыр');
    cy.clock();
    cy.get('button')
      .find('p')
      .contains('Добавить')
      .parent()
      .click();
    cy.get('button')
      .find('p')
      .contains('Удалить')
      .parent()
      .should('not.be.disabled');
    cy.get('div[class^="stack-page_dashboard"]').children().should('to.have.length', 1);
    cy.tick(SHORT_DELAY_IN_MS * 5);
    cy.get('button')
      .find('p')
      .contains('Удалить')
      .parent()
      .click();
    cy.tick(SHORT_DELAY_IN_MS * 5);
    cy.get('div[class^="stack-page_dashboard"]').children().should('to.have.length', 0);
  });
  it('items should have index, top should have head of "top" and purge button should clean the whole stack', () => {
    cy.get('button')
      .find('p')
      .contains('Добавить')
      .parent()
      .should('be.disabled');
    cy.get('button')
      .find('p')
      .contains('Удалить')
      .parent()
      .should('be.disabled');
    cy.get('button')
      .find('p')
      .contains('Очистить')
      .parent()
      .should('be.disabled');
    cy.get('div[class^="stack-page_dashboard"]').children().should('to.have.length', 0);
    cy.clock();
    for (let i = 0; i < 5; i += 1) {
      cy.get('input').type(String(i));
      cy.get('button')
        .find('p')
        .contains('Добавить')
        .parent()
        .click();
      cy.tick(SHORT_DELAY_IN_MS * 4);
      cy.get(circleContentClass).each((container, index) => {
        cy.wrap(container).find('p').contains(String(index));
        if (index < i) {
          cy.wrap(container)
            .find('div[class*="circle_head"]')
            .invoke('text')
            .should('be.empty');
        } else {
          cy.wrap(container)
            .find('div[class*="circle_head"]')
            .contains('top');
        }
      });
    }
    cy.tick(SHORT_DELAY_IN_MS * 4);
    cy.get('div[class^="stack-page_dashboard"]').children().should('to.have.length', 5);
    cy.get('button')
      .find('p')
      .contains('Очистить')
      .parent()
      .click();
    cy.tick(SHORT_DELAY_IN_MS * 4);
    cy.get('button')
      .find('p')
      .contains('Добавить')
      .parent()
      .should('be.disabled');
    cy.get('button')
      .find('p')
      .contains('Удалить')
      .parent()
      .should('be.disabled');
    cy.get('button')
      .find('p')
      .contains('Очистить')
      .parent()
      .should('be.disabled');
    cy.get('div[class^="stack-page_dashboard"]').children().should('to.have.length', 0);
  });
  it('animation should work both on push and pop', () => {
    cy.get('input').type('быр');
    cy.clock();
    cy.get('button')
      .find('p')
      .contains('Добавить')
      .parent()
      .click();
    cy.get(circleMainClass)
      .find('p')
      .contains('быр')
      .parent()
      .should('have.css', 'border-color', changingColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleMainClass)
      .find('p')
      .contains('быр')
      .parent()
      .should('have.css', 'border-color', modifiedColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('button')
      .find('p')
      .contains('Удалить')
      .parent()
      .click();
    cy.get(circleMainClass)
      .find('p')
      .contains('быр')
      .parent()
      .should('have.css', 'border-color', changingColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('div[class^="stack-page_dashboard"]').children().should('to.have.length', 0);
  });
});

export {};
