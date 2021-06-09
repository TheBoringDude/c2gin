import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

import WelcomeMessage from '../components/welcome';

describe('Welcome Message', () => {
  it('should render', () => {
    const wrapper = renderer.create(<WelcomeMessage />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
