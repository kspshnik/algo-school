/*   eslint-disable promise/catch-or-return */
/*   eslint-disable promise/always-return */
import {
  circleMainClass,
  circleContentClass,
  changingColor,
  modifiedColor,
} from '../fixtures/constants';
import { SHORT_DELAY_IN_MS } from '../../src/constants';

describe('Testing queue page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/queue');
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
  it('queue should be empty on beginning', () => {
    cy.get(circleMainClass).each((circle) => {
      cy.wrap(circle).find('p').invoke('text').should('be.empty');
    });
  });
  it('queue should have indexes', () => {
    cy.get(circleContentClass).each((container, index) => {
      cy.wrap(container).find('p').contains(String(index));
    });
  });
  it('queue should be filled and purged correctly', () => {
    cy.clock();
    for (let i = 0; i < 7; i += 1) {
      cy.get('input').type(String(i));
      cy.get(circleMainClass)
        .eq(i)
        .should('have.css', 'border-color', modifiedColor);
      cy.get('button')
        .find('p')
        .contains('Добавить')
        .parent()
        .click();
      cy.tick(SHORT_DELAY_IN_MS);
      cy.get(circleMainClass)
        .eq(i)
        .should('have.css', 'border-color', changingColor);
      cy.get(circleContentClass)
        .eq(i)
        .find('div[class*="circle_tail"]')
        .contains('tail');
      cy.get(circleContentClass)
        .eq(0)
        .find('div[class*="circle_head"]')
        .contains('head');
      cy.tick(SHORT_DELAY_IN_MS);
      cy.get(circleMainClass)
        .eq(i)
        .should('have.css', 'border-color', modifiedColor);
    }
    cy.get(circleMainClass).each((circle, index) => {
      cy.wrap(circle).find('p').contains(String(index));
    });
    cy.tick(SHORT_DELAY_IN_MS);
    for (let i = 0; i < 3; i += 1) {
      cy.get(circleMainClass)
        .eq(i)
        .should('have.css', 'border-color', modifiedColor);
      cy.get('button')
        .find('p')
        .contains('Удалить')
        .parent()
        .click();
      cy.get(circleMainClass)
        .eq(i)
        .should('have.css', 'border-color', changingColor);
      cy.get(circleContentClass)
        .eq(6)
        .find('div[class*="circle_tail"]')
        .contains('tail');
      cy.get(circleContentClass)
        .eq(i)
        .find('div[class*="circle_head"]')
        .contains('head');
      cy.tick(SHORT_DELAY_IN_MS);
      cy.get(circleMainClass)
        .eq(i)
        .should('have.css', 'border-color', modifiedColor)
        .find('p')
        .should('be.empty');
      cy.get(circleContentClass)
        .eq(i)
        .find('div[class*="circle_head"]')
        .invoke('text')
        .should('be.empty');
      cy.get(circleContentClass)
        .eq(i + 1)
        .find('div[class*="circle_head"]')
        .contains('head');
      cy.tick(SHORT_DELAY_IN_MS);
    }
    cy.get('button')
      .find('p')
      .contains('Очистить')
      .parent()
      .click();
    cy.tick(SHORT_DELAY_IN_MS * 3);
    cy.get(circleMainClass).each((circle) => {
      cy.wrap(circle).find('p').invoke('text').should('be.empty');
    });
  });
});

export {};
