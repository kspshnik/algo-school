import React from 'react';
import { render } from '@testing-library/react';
import App from './app';

describe('App should not change main page during development', () => {
  const app = render(<App />);
  it('should match snapshot', () => {
    expect(app).toMatchSnapshot();
  });
});
