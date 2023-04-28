/*   eslint-disable promise/catch-or-return */
/*   eslint-disable promise/always-return */
import {
  defaultColor,
  changingColor,
  modifiedColor,
  circleMainClass,
  circleContentClass,
} from '../fixtures/constants';
import { DELAY_IN_MS } from '../../src/constants/delays';

describe('Testing string page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/recursion');
  });
  it('button should be disabled in the beginning', () => {
    cy.get('input[placeholder*="Введите текст"]').should('be.empty');
    cy.get('button')
      .find('p')
      .contains('Развернуть')
      .parent()
      .should('be.disabled');
  });
  it('button should be enabled on typing and get disabled on clearing', () => {
    cy.get('input').type('123');
    cy.get('button')
      .find('p')
      .contains('Развернуть')
      .parent()
      .should('not.be.disabled');
    cy.get('input').clear();
    cy.get('button')
      .find('p')
      .contains('Развернуть')
      .parent()
      .should('be.disabled');
  });
  it('animation should work correct', () => {
    cy.clock();
    cy.get('input').type('123');
    cy.get('button')
      .find('p')
      .contains('Развернуть')
      .parent()
      .click();
    cy.get(circleContentClass).each((container, index) => {
      cy.wrap(container).find('p').contains(String(index));
    });
    cy.get(circleMainClass).each((circle, index) => {
      cy.wrap(circle).should('have.css', 'border-color', defaultColor);
      cy.wrap(circle).contains(String(index + 1));
    });
    cy.tick(DELAY_IN_MS);
    cy.get(circleContentClass).each((container, index) => {
      cy.wrap(container).find('p').contains(String(index));
    });
    cy.get(circleMainClass).then((circle) => {
      cy.wrap(circle.eq(0))
        .should('have.css', 'border-color', changingColor)
        .find('p')
        .contains('1');
      cy.wrap(circle.eq(1))
        .should('have.css', 'border-color', defaultColor)
        .find('p')
        .contains('2');
      cy.wrap(circle.eq(2))
        .should('have.css', 'border-color', changingColor)
        .find('p')
        .contains('3');
    });
    cy.tick(DELAY_IN_MS);
    cy.get(circleContentClass).each((container, index) => {
      cy.wrap(container).find('p').contains(String(index));
    });
    cy.get(circleMainClass).then((circle) => {
      cy.wrap(circle.eq(0))
        .should('have.css', 'border-color', modifiedColor)
        .find('p')
        .contains('3');
      cy.wrap(circle.eq(1))
        .should('have.css', 'border-color', defaultColor)
        .find('p')
        .contains('2');
      cy.wrap(circle.eq(2))
        .should('have.css', 'border-color', modifiedColor)
        .find('p')
        .contains('1');
      // eslint-disable-next-line promise/always-return
    });
    cy.tick(DELAY_IN_MS);
    cy.get(circleContentClass).each((container, index) => {
      cy.wrap(container).find('p').contains(String(index));
    });
    cy.get(circleMainClass).then((circle) => {
      cy.wrap(circle.eq(0))
        .should('have.css', 'border-color', modifiedColor)
        .find('p')
        .contains('3');
      cy.wrap(circle.eq(1))
        .should('have.css', 'border-color', changingColor)
        .find('p')
        .contains('2');
      cy.wrap(circle.eq(2))
        .should('have.css', 'border-color', modifiedColor)
        .find('p')
        .contains('1');
    });
    cy.tick(DELAY_IN_MS);
    cy.get(circleContentClass).each((container, index) => {
      cy.wrap(container).find('p').contains(String(index));
    });
    cy.get(circleMainClass).each((circle, index) => {
      cy.wrap(circle).should('have.css', 'border-color', modifiedColor);
      cy.wrap(circle).contains(String(3 - index));
    });
    cy.tick(DELAY_IN_MS);
    cy.clock().then((clock) => {
      clock.restore();
    });
  });
});

export {};
