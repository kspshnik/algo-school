/*   eslint-disable promise/catch-or-return */
/*   eslint-disable promise/always-return */
import {
  defaultColor,
  circleMainClass,
  circleContentClass,
  fibonnachiSeq,
} from '../fixtures/constants';
import { SHORT_DELAY_IN_MS } from '../../src/constants';

describe('Testing fibonacchi page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/fibonacci');
  });
  it('button should be disabled in the beginning', () => {
    cy.get('input').should('be.empty');
    cy.get('button')
      .find('p')
      .contains('Рассчитать')
      .parent()
      .should('be.disabled');
  });
  it('button should be enabled on typing and get disabled on clearing', () => {
    cy.get('input').type('12');
    cy.get('button')
      .find('p')
      .contains('Рассчитать')
      .parent()
      .should('not.be.disabled');
    cy.get('input').clear();
    cy.get('button')
      .find('p')
      .contains('Рассчитать')
      .parent()
      .should('be.disabled');
  });
  it('calculation should work correct', () => {
    cy.clock();
    cy.get('input').type('7');
    cy.get('button')
      .find('p')
      .contains('Рассчитать')
      .parent()
      .click();
    cy.tick(SHORT_DELAY_IN_MS);
    for (let i = 0; i < 8; i += 1) {
      cy.get(circleContentClass).then((containers) => {
        cy.wrap(containers).should('to.have.length', (i + 1));
      });
      cy.get(circleContentClass).each((container, index) => {
        cy.wrap(container).find('p').contains(String(index));
      });
      cy.get(circleMainClass).each((circle, index) => {
        cy.wrap(circle)
          .find('p')
          .contains(String(fibonnachiSeq[index]))
          .parent()
          .should('have.css', 'border-color', defaultColor);
      });
      cy.tick(SHORT_DELAY_IN_MS);
    }
    cy.tick(SHORT_DELAY_IN_MS);
    cy.clock().then((clock) => {
      clock.restore();
    });
  });
});

export {};
