import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import HeaderSaveButton from '../../../modules/projects/save-project';

describe('Home page', () => {
  it('should render', () => {
    expect(render(<HeaderSaveButton id="sample" />)).toBeTruthy();
  });
});
