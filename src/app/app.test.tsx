import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';

describe('App should not change main page during development', () => {
  it('should match snapshot', () => {
    const app = renderer.create(<App />);
    expect(app).toMatchSnapshot();
  });
});
