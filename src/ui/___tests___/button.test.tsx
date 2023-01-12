/* eslint-disable react/react-in-jsx-scope */
import { screen, fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Button } from '../index';

// Константы для каждого теста в обоих сьютах
const buttonText = 'Test text!';
const buttonTestId = 'ui-regular-button';
const imgTestId = 'ui-button-loader-img';

describe('button should render according to props & fire onClick on click', () => {
  const imgAlt = 'Загрузка.';
  it('should render normal button w/text', () => {
    render(<Button text={buttonText} />);
    const button = screen.getByTestId(buttonTestId);
    expect(button).toHaveTextContent(buttonText);
  });
  it('should render normal button w/out text', () => {
    render(<Button />);
    const button = screen.getByTestId(buttonTestId);
    expect(button).toHaveTextContent('');
  });
  it('should render disabled', () => {
    render(<Button text='Test text!' disabled />);
    const button = screen.getByTestId(buttonTestId);
    expect(button).toBeDisabled();
  });
  it('should render loader', () => {
    render(<Button text='Test text!' isLoader />);
    const img = screen.getByTestId(imgTestId);
    expect(img).toHaveAttribute('alt', imgAlt);
  });
  it('should fire onClick on click', () => {
    const mockOnClick = jest.fn();
    render(<Button text='Test text!' onClick={mockOnClick} />);
    const button = screen.getByTestId(buttonTestId);
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});

describe('it should match snapshot', () => {
  it('should match normal button w/text', () => {
    const buttonSnapshot = renderer.create(<Button text={buttonText} />).toJSON();
    expect(buttonSnapshot).toMatchSnapshot();
  });
  it('should match normal button w/out text', () => {
    const buttonSnapshot = renderer.create(<Button />).toJSON();
    expect(buttonSnapshot).toMatchSnapshot();
  });
  it('should match disabled button', () => {
    const buttonSnapshot = renderer.create(<Button text={buttonText} disabled />).toJSON();
    expect(buttonSnapshot).toMatchSnapshot();
  });
  it('should match loader', () => {
    const buttonSnapshot = renderer.create(<Button text='Test text!' isLoader />);
    expect(buttonSnapshot).toMatchSnapshot();
  });
});
