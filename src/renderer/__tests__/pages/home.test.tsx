import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import Home from '../../pages/home';

describe('Home page', () => {
  it('should render', () => {
    expect(render(<Home />)).toBeTruthy();
  });
});
