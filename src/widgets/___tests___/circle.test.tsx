/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Circle } from '../index';
import { ElementStates } from '../../types/element-states';

describe('Circle widget renders in a right way', () => {
  it('should render', () => {
    render(<Circle letter='ква' state={ElementStates.Changing} />);
    //  screen.debug();
    const circle = screen.getByTestId('widget-circle-ква');
    // console.dir(circle);
    expect(circle).toBeInTheDocument();
  });
  it('div should have class "changing', () => {
    render(<Circle letter='ура' state={ElementStates.Changing} />);
    const circle = screen.getByTestId('widget-circle-ура');
    expect(circle).toHaveClass('changing');
  });
  it('div should have class "default"', () => {
    render(<Circle letter='сыр' state={ElementStates.Default} />);
    const circle = screen.getByTestId('widget-circle-сыр');
    expect(circle).toHaveClass('default');
  });
  it('div should have class "modified"', () => {
    render(<Circle letter='соль' state={ElementStates.Modified} />);
    const circle = screen.getByTestId('widget-circle-соль');
    expect(circle).toHaveClass('modified');
  });
  it('should render tail with text', () => {
    render(<Circle head='шапка' tail='хвост' letter='фыр' />);
    const circle = screen.getByTestId('widget-circle-фыр');
    const tail = screen.getByText('хвост');
    expect(circle).toBeInTheDocument();
    expect(tail).toBeInTheDocument();
  });
  it('should render head  with text', () => {
    render(<Circle head='шапка' tail='хвост' letter='фыр' />);
    const circle = screen.getByTestId('widget-circle-фыр');
    const head = screen.getByText('шапка');
    expect(circle).toBeInTheDocument();
    expect(head).toBeInTheDocument();
  });
  it('should render small circle in the head', () => {
    render(<Circle head={<Circle letter='куку' isSmall />} letter='быр' />);
    const circle = screen.getByTestId('widget-circle-быр');
    const head = screen.getByTestId('widget-circle-куку');
    expect(circle).toBeInTheDocument();
    expect(head).toBeInTheDocument();
  });
  it('should render small circle in the tail', () => {
    render(<Circle tail={<Circle letter='куку' isSmall />} letter='быр' />);
    const circle = screen.getByTestId('widget-circle-быр');
    const tail = screen.getByTestId('widget-circle-куку');
    expect(circle).toBeInTheDocument();
    expect(tail).toBeInTheDocument();
  });
});

describe('Circle widget should match snapshot in all renders', () => {
  it('should match snapshot', () => {
    const circleSnapshot = renderer.create(<Circle letter='ква' state={ElementStates.Default} />).toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
  it('changing state should match snapshot', () => {
    const circleSnapshot = renderer.create(<Circle letter='ква' state={ElementStates.Changing} />).toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
  it('done state should match snapshot', () => {
    const circleSnapshot = renderer.create(<Circle letter='ква' state={ElementStates.Modified} />).toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
  it('circle enriched by head & tail both with text should match snapshot', () => {
    const circleSnapshot = renderer.create(<Circle head='шапка' tail='хвост' letter='фыр' />).toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
  it('circle w/small Circle in head should match snapshot', () => {
    const circleSnapshot = renderer.create(<Circle head={<Circle letter='куку' isSmall />} letter='быр' />).toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
  it('circle w/small Circle in tail should match snapshot', () => {
    const circleSnapshot = renderer.create(<Circle tail={<Circle letter='куку' isSmall />} letter='быр' />).toJSON();
    expect(circleSnapshot).toMatchSnapshot();
  });
});
