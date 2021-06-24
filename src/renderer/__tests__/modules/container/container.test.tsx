import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import Container from '../../../modules/container/container';

describe('Home page', () => {
  it('should render', () => {
    expect(render(<Container />)).toBeTruthy();
  });
});
